from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import asyncio
import logging
import resend
from pathlib import Path
from pydantic import BaseModel, EmailStr, Field, ConfigDict
from typing import Optional, List
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend
resend.api_key = os.environ.get('RESEND_API_KEY', '')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
CONTACT_RECIPIENT = os.environ.get('CONTACT_RECIPIENT', 'contact@scoliax.com')

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str = Field(min_length=1, max_length=200)
    email: EmailStr
    company: Optional[str] = Field(default=None, max_length=200)
    message: str = Field(min_length=1, max_length=5000)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ContactSubmissionCreate(BaseModel):
    name: str = Field(min_length=1, max_length=200)
    email: EmailStr
    company: Optional[str] = Field(default=None, max_length=200)
    message: str = Field(min_length=1, max_length=5000)


def _build_email_html(submission: ContactSubmission) -> str:
    company_row = ""
    if submission.company:
        company_row = (
            f'<tr><td style="padding:6px 0;color:#888;width:120px;">Entreprise</td>'
            f'<td style="padding:6px 0;color:#111;">{submission.company}</td></tr>'
        )
    safe_message = submission.message.replace("\n", "<br/>")
    return f"""
    <table style="width:100%;max-width:560px;font-family:Inter,Arial,sans-serif;background:#ffffff;border:1px solid #eee;border-radius:12px;padding:24px;">
      <tr>
        <td style="border-bottom:2px solid #D4720A;padding-bottom:12px;">
          <h2 style="margin:0;color:#1C1611;font-size:20px;">Nouveau message — Scoliax</h2>
          <p style="margin:4px 0 0;color:#666;font-size:13px;">Formulaire de contact du site</p>
        </td>
      </tr>
      <tr><td style="padding-top:16px;">
        <table style="width:100%;font-size:14px;">
          <tr><td style="padding:6px 0;color:#888;width:120px;">Nom</td><td style="padding:6px 0;color:#111;">{submission.name}</td></tr>
          <tr><td style="padding:6px 0;color:#888;width:120px;">Email</td><td style="padding:6px 0;color:#111;">{submission.email}</td></tr>
          {company_row}
        </table>
      </td></tr>
      <tr><td style="padding-top:16px;">
        <div style="background:#FAFAF8;border-left:3px solid #D4720A;padding:14px 16px;border-radius:6px;color:#1C1611;font-size:14px;line-height:1.6;">
          {safe_message}
        </div>
      </td></tr>
      <tr><td style="padding-top:18px;color:#999;font-size:11px;">
        Reçu le {submission.created_at.strftime('%d/%m/%Y à %H:%M UTC')} — ID {submission.id}
      </td></tr>
    </table>
    """


@api_router.get("/")
async def root():
    return {"message": "Scoliax API"}


@api_router.get("/health")
async def health():
    return {"status": "ok"}


@api_router.post("/contact")
async def submit_contact(payload: ContactSubmissionCreate):
    submission = ContactSubmission(**payload.model_dump())

    # Persist to MongoDB (audit log)
    doc = submission.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    try:
        await db.contact_submissions.insert_one(doc)
    except Exception as e:
        logger.error(f"Mongo insert failed: {e}")

    # Send email via Resend
    if not resend.api_key:
        logger.warning("RESEND_API_KEY missing — skipping email send")
        return {"status": "stored", "id": submission.id}

    params = {
        "from": SENDER_EMAIL,
        "to": [CONTACT_RECIPIENT],
        "reply_to": submission.email,
        "subject": f"[Scoliax] Nouveau message de {submission.name}",
        "html": _build_email_html(submission),
    }

    try:
        result = await asyncio.to_thread(resend.Emails.send, params)
        return {
            "status": "success",
            "id": submission.id,
            "email_id": result.get("id") if isinstance(result, dict) else None,
        }
    except Exception as e:
        logger.error(f"Resend send failed: {e}")
        # Still return success because we stored it
        raise HTTPException(status_code=502, detail=f"Échec de l'envoi de l'email: {str(e)}")


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
