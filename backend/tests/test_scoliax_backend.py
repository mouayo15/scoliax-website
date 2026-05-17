"""Backend tests for Scoliax landing page API: health + contact endpoint."""
import os
import pytest
import requests
from pymongo import MongoClient

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://scoliax-launch.preview.emergentagent.com').rstrip('/')
MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
DB_NAME = os.environ.get('DB_NAME', 'test_database')


@pytest.fixture(scope="module")
def mongo_col():
    cli = MongoClient(MONGO_URL)
    yield cli[DB_NAME].contact_submissions
    cli.close()


# Health
class TestHealth:
    def test_health_ok(self):
        r = requests.get(f"{BASE_URL}/api/health", timeout=15)
        assert r.status_code == 200
        assert r.json() == {"status": "ok"}


# Contact - validation
class TestContactValidation:
    def test_missing_name(self):
        r = requests.post(f"{BASE_URL}/api/contact", json={"email": "a@b.com", "message": "hi"}, timeout=15)
        assert r.status_code == 422

    def test_missing_email(self):
        r = requests.post(f"{BASE_URL}/api/contact", json={"name": "X", "message": "hi"}, timeout=15)
        assert r.status_code == 422

    def test_missing_message(self):
        r = requests.post(f"{BASE_URL}/api/contact", json={"name": "X", "email": "a@b.com"}, timeout=15)
        assert r.status_code == 422

    def test_invalid_email(self):
        r = requests.post(f"{BASE_URL}/api/contact",
                          json={"name": "X", "email": "not-an-email", "message": "hi"}, timeout=15)
        assert r.status_code == 422


# Contact - persistence (allow 200 success OR 502 if Resend rejects; Mongo must still hold record)
class TestContactSubmission:
    def _submit(self, payload):
        return requests.post(f"{BASE_URL}/api/contact", json=payload, timeout=30)

    def test_with_company_persists(self, mongo_col):
        payload = {
            "name": "TEST_Alice",
            "email": "test_alice@example.com",
            "company": "TEST_Co",
            "message": "TEST_message_with_company",
        }
        r = self._submit(payload)
        assert r.status_code in (200, 502), f"Unexpected {r.status_code}: {r.text}"
        if r.status_code == 502:
            assert "email" in r.json().get("detail", "").lower() or "échec" in r.json().get("detail", "").lower()

        # Confirm persisted regardless of email outcome
        doc = mongo_col.find_one({"message": "TEST_message_with_company"}, {"_id": 0})
        assert doc is not None, "Submission not persisted in MongoDB"
        assert doc["name"] == "TEST_Alice"
        assert doc["email"] == "test_alice@example.com"
        assert doc["company"] == "TEST_Co"
        assert "id" in doc
        assert "created_at" in doc
        assert isinstance(doc["created_at"], str)  # ISO string

    def test_without_company_persists(self, mongo_col):
        payload = {
            "name": "TEST_Bob",
            "email": "test_bob@example.com",
            "company": None,
            "message": "TEST_message_no_company",
        }
        r = self._submit(payload)
        assert r.status_code in (200, 502)

        doc = mongo_col.find_one({"message": "TEST_message_no_company"}, {"_id": 0})
        assert doc is not None
        assert doc["company"] is None
        assert doc["name"] == "TEST_Bob"

    def test_company_omitted_persists(self, mongo_col):
        payload = {
            "name": "TEST_Carol",
            "email": "test_carol@example.com",
            "message": "TEST_message_omit_company",
        }
        r = self._submit(payload)
        assert r.status_code in (200, 502)

        doc = mongo_col.find_one({"message": "TEST_message_omit_company"}, {"_id": 0})
        assert doc is not None
        assert doc.get("company") is None


@pytest.fixture(scope="session", autouse=True)
def _cleanup_at_end():
    yield
    try:
        cli = MongoClient(MONGO_URL)
        cli[DB_NAME].contact_submissions.delete_many({"name": {"$regex": "^TEST_"}})
        cli.close()
    except Exception:
        pass
