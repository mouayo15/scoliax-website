"""
One-off image generation script for Scoliax landing page.
Generates ad thumbnails, concept cards, hero "generated ad", and testimonial avatars
using Gemini Nano Banana via emergentintegrations, then saves them to
/app/frontend/public/images/.

Run: python /app/scripts/generate_images.py
"""

import asyncio
import base64
import os
import sys
import uuid
from pathlib import Path

from dotenv import load_dotenv

# Load env from backend/.env
load_dotenv(dotenv_path=Path("/app/backend/.env"))

from emergentintegrations.llm.chat import LlmChat, UserMessage  # noqa: E402

API_KEY = os.getenv("EMERGENT_LLM_KEY")
if not API_KEY:
    print("EMERGENT_LLM_KEY missing", file=sys.stderr)
    sys.exit(1)

OUT_DIR = Path("/app/frontend/public/images")
OUT_DIR.mkdir(parents=True, exist_ok=True)

BRAND_STYLE = (
    "Warm dark editorial aesthetic, deep warm black background (#0F0D0B) with bold burnt-orange (#D4720A) accents, "
    "high-end magazine ad style, premium product photography lighting, soft warm shadows, subtle film grain, "
    "minimal modern typography optional but no readable English text, cinematic moody lighting, "
    "shallow depth of field, professional commercial photography, no watermark, no logo placeholders."
)

# ---- Prompt set ----
# 8 square ad thumbnails for various brand sectors
ADS = [
    ("ad_fashion.jpg",
     "Square 1:1 fashion brand social media ad: a model wearing an elegant cream cashmere coat "
     "against a warm dark backdrop, side profile, soft golden rim light, burnt-orange accent in scarf. "
     "Minimal composition, lots of negative space top right for copy."),
    ("ad_restaurant.jpg",
     "Square 1:1 restaurant social media ad: an overhead flat-lay of a plated artisan pasta dish "
     "on a dark wooden table, warm candlelight, glass of orange-amber natural wine, sprigs of herbs, "
     "rustic linen napkin, moody chiaroscuro."),
    ("ad_saas.jpg",
     "Square 1:1 abstract tech product ad: floating glass-morphism UI cards in dark space, "
     "burnt-orange gradient glow behind them, particles of light, geometric grid, isometric perspective, "
     "ultra modern SaaS aesthetic."),
    ("ad_fitness.jpg",
     "Square 1:1 fitness brand ad: silhouette of a runner at sunrise on an empty road, "
     "warm orange sun haze, dramatic backlight, dark warm tones, sweat detail, athletic dynamic pose, "
     "cinematic Nike-style commercial."),
    ("ad_beauty.jpg",
     "Square 1:1 beauty brand ad: amber-glass skincare bottle on a textured dark warm stone surface, "
     "single soft warm light from upper left, droplets, hint of burnt-orange velvet ribbon, "
     "luxury cosmetic photography."),
    ("ad_travel.jpg",
     "Square 1:1 travel brand ad: aerial drone shot of warm sand dunes at golden hour, "
     "tiny silhouette of a 4x4 vehicle leaving tracks, deep orange shadows, painterly desert tones, "
     "wanderlust mood."),
    ("ad_realestate.jpg",
     "Square 1:1 luxury real estate ad: warm-lit modern villa interior at night, large arch window with "
     "city glow, terracotta plaster walls, mid-century furniture, brass details, fireplace burning, "
     "architectural digest style."),
    ("ad_coffee.jpg",
     "Square 1:1 specialty coffee brand ad: top-down close-up of a pour-over cup with rich crema swirl, "
     "scattered coffee beans, warm orange-amber light pool on dark wood, hands cradling cup softly visible "
     "at edge, artisan craft mood."),
]

# 3 concept cards (Campaign Generator) - square
CONCEPTS = [
    ("concept_launch.jpg",
     "Square 1:1 product launch teaser ad: a single object draped under a warm orange silk cloth, "
     "spotlit dramatically against deep warm black, anticipation mood, minimal."),
    ("concept_flash.jpg",
     "Square 1:1 flash-sale countdown ad: stylized orange digital countdown clock numbers reflecting "
     "on a dark glossy surface, warm streaks of motion light, urgency mood, no readable digits."),
    ("concept_testimonial.jpg",
     "Square 1:1 customer testimonial ad: warm portrait of a smiling thirty-something professional "
     "with subtle orange-tinted background, soft Rembrandt lighting, friendly approachable mood."),
]

# 1 big Generated Ad (the hero of the AI Image Generation feature) - 4:3
GENERATED_AD = (
    "generated_ad_hero.jpg",
    "Wide 4:3 magazine-style poster ad for a fictional brand 'Scoliax — Campagne Hiver 2026': "
    "abstract editorial composition, a warm orange luminous orb glowing against a deep warm dark "
    "textured background, soft volumetric light rays, hint of geometric tilted card shapes echoing "
    "a brand logo, premium cinematic lighting, sophisticated, suitable as a hero marketing visual. "
    "Negative space on the left bottom for headline copy overlay."
)

# 3 testimonial avatars - square portrait
AVATARS = [
    ("avatar_camille.jpg",
     "Square 1:1 professional portrait headshot of a stylish woman in her late thirties, "
     "warm friendly smile, short bob hair, beige turtleneck sweater, blurred warm dark backdrop "
     "with subtle orange glow, soft cinematic studio lighting, looking off-camera, premium editorial."),
    ("avatar_adrien.jpg",
     "Square 1:1 professional portrait of a confident man in his early forties, short dark beard, "
     "navy crewneck, soft side light, blurred warm dark backdrop, slight orange rim light, "
     "magazine editorial style, neutral confident expression."),
    ("avatar_lea.jpg",
     "Square 1:1 professional portrait of a creative woman in her early thirties with long wavy "
     "auburn hair, gentle smile, warm earth-tone blazer, blurred dark warm orange backdrop, "
     "soft natural window light, premium editorial portrait."),
]


def build_prompt(specific: str) -> str:
    return f"{specific}\n\nGlobal style: {BRAND_STYLE}"


async def generate_one(filename: str, prompt: str) -> bool:
    """Generate a single image and write to OUT_DIR/filename."""
    out_path = OUT_DIR / filename
    if out_path.exists():
        print(f"  [skip] {filename} already exists")
        return True
    try:
        chat = (
            LlmChat(
                api_key=API_KEY,
                session_id=f"scoliax-img-{uuid.uuid4()}",
                system_message="You generate premium marketing images.",
            )
            .with_model("gemini", "gemini-3.1-flash-image-preview")
            .with_params(modalities=["image", "text"])
        )
        msg = UserMessage(text=build_prompt(prompt))
        _, images = await chat.send_message_multimodal_response(msg)
        if not images:
            print(f"  [FAIL] {filename}: no image returned")
            return False
        img = images[0]
        data = base64.b64decode(img["data"])
        out_path.write_bytes(data)
        print(f"  [ok]   {filename} ({len(data) // 1024} KB, {img.get('mime_type')})")
        return True
    except Exception as e:
        print(f"  [ERR]  {filename}: {e}")
        return False


async def main():
    tasks = []
    for fname, prompt in ADS + CONCEPTS + AVATARS + [GENERATED_AD]:
        tasks.append(generate_one(fname, prompt))

    print(f"Generating {len(tasks)} images in parallel...")
    results = await asyncio.gather(*tasks)
    ok = sum(1 for r in results if r)
    print(f"\nDone: {ok}/{len(tasks)} succeeded.")
    print(f"Output dir: {OUT_DIR}")


if __name__ == "__main__":
    asyncio.run(main())
