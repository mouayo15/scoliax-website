# Scoliax — Landing Page PRD

## Original problem statement
Build a complete, modern SaaS landing page for Scoliax — an AI-powered social media content platform. Site must be entirely in French. Warm dark theme (#0F0D0B) with burnt orange accents (#D4720A → #B35F08). User-provided logo (tilted white card with "S" on orange) used in navbar and footer. Contact form sends emails via Resend to contact@scoliax.com.

## Architecture
- **Backend**: FastAPI + MongoDB (motor). Resend SDK for transactional email (non-blocking via asyncio.to_thread).
- **Frontend**: React 19 + Tailwind + Inter (Google Fonts) + lucide-react + sonner toasts.
- **Single landing page** broken into composable section components.

## User personas
- Marketing managers / brand owners evaluating an AI social media tool.
- Marketing agencies looking at white-label/multi-brand offering.

## Core requirements
- French copy throughout.
- Navbar (sticky + scrolled state), Hero with dashboard mockup + floating tilted orange squares, six feature sections, "How it works" 3 steps with huge faded numerals, Testimonials with orange left-border, Pricing (3 tiers, Pro highlighted), Contact form with Resend email + MongoDB persistence, Footer.
- Mobile responsive (mobile menu, single-column stacking).
- All interactive/value elements carry `data-testid`.

## What's implemented (2025-12)
- Backend `/api/health`, `/api/contact` (validates payload, stores in MongoDB `contact_submissions`, sends email via Resend with French subject + HTML body, reply-to set to sender).
- Frontend: Navbar, Hero (with dashboard calendar mockup, shimmer headline, floating squares), Features (Campaign Generator, Brand Templates 4×2 grid, Multi-Channel Timeline, AI Image Generation comparison, Post Studio editor, Analytics with SVG chart + stat tiles), HowItWorks (3 steps with huge faded numerals + dashed connector + gradient icon circles), Testimonials (3 cards + logo strip), Pricing (Starter free / Pro 29 € most-popular glowing / Agency 99 €), Contact (form + 3 contact info rows + Resend wiring + sonner toasts), Footer (logo, tagline, nav links, social icons, copyright).
- Animations: fade-up on scroll (IntersectionObserver), floaty hero mockup, drifting orange squares, shimmer headline, pulse-ring on AI brain icon, slow spin.
- Resend integration verified working (status 200) via testing agent.

## Backlog (P1/P2)
- **P1**: Return 200 with `status: 'stored_email_failed'` (and include submission id) when Mongo persists but Resend fails, instead of 502 — better UX.
- **P1**: Hard-fail (re-raise) if MongoDB insert fails; currently swallowed.
- **P2**: Rate-limit `/api/contact` (e.g., slowapi) — public endpoint susceptible to spam.
- **P2**: Migrate `@app.on_event("shutdown")` to FastAPI lifespan handler.
- **P2**: Add reCAPTCHA / honeypot to contact form.
- **P2**: i18n (English version) when needed.
- **P2**: Real domain verification on Resend (currently using `onboarding@resend.dev` as sender). Once `scoliax.com` is verified, change `SENDER_EMAIL` env var.
- **P3**: Replace placeholder testimonial logos with real partner logos.
- **P3**: Build out actual app dashboard behind CTAs (currently anchors to #pricing/#contact).

## Test credentials
N/A — no auth on this app.
