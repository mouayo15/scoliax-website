import React from "react";
import { FadeIn, SectionLabel } from "./common";

const items = [
  {
    name: "Camille Roux",
    role: "Directrice marketing — Maison Lumière",
    quote:
      "Scoliax a réduit notre temps de production de campagnes de 80%. Les visuels restent fidèles à notre charte, même sans designer.",
    initials: "CR",
  },
  {
    name: "Adrien Vasseur",
    role: "Fondateur — Atelier Nord",
    quote:
      "On publie six fois plus sur LinkedIn et Instagram, avec un engagement multiplié par trois. C'est tout ce qu'on attendait d'un outil IA.",
    initials: "AV",
  },
  {
    name: "Léa Mercier",
    role: "Head of growth — Olives & Sel",
    quote:
      "Le générateur de campagnes est bluffant. Une URL, trois concepts, prêts à programmer. Notre rituel hebdo a complètement changé.",
    initials: "LM",
  },
];

const logos = ["MAISON LUMIÈRE", "ATELIER NORD", "OLIVES & SEL", "STUDIO ARGON", "NORTHWIND", "OBLIQUE"];

export default function Testimonials() {
  return (
    <section className="relative py-20 lg:py-28 px-5 lg:px-8" data-testid="testimonials-section">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <SectionLabel>Ils parlent de nous</SectionLabel>
            <h2 className="section-title mt-3">Des marques qui publient mieux, plus souvent.</h2>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-5">
          {items.map((t, i) => (
            <FadeIn key={t.name} delay={i * 100}>
              <div
                className="h-full p-6 lg:p-7"
                style={{
                  background: "var(--bg-card)",
                  borderRadius: 16,
                  borderLeft: "3px solid var(--orange)",
                  border: "1px solid rgba(250,250,248,0.06)",
                  borderLeftWidth: 3,
                  borderLeftColor: "var(--orange)",
                }}
                data-testid={`testimonial-card-${i}`}
              >
                <div
                  className="text-3xl mb-4 leading-none"
                  style={{ color: "var(--orange)", fontFamily: "Georgia, serif" }}
                  aria-hidden
                >
                  "
                </div>
                <p className="text-[15px] leading-relaxed" style={{ color: "rgba(250,250,248,0.88)" }}>
                  {t.quote}
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div
                    className="rounded-full flex items-center justify-center text-sm font-semibold"
                    style={{
                      width: 40,
                      height: 40,
                      background: "linear-gradient(135deg, #D4720A, #B35F08)",
                      color: "white",
                    }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold" style={{ color: "var(--text)" }}>{t.name}</div>
                    <div className="text-xs muted">{t.role}</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
            {logos.map((l) => (
              <span
                key={l}
                className="text-[12px] tracking-[0.18em] font-semibold"
                style={{ color: "rgba(250,250,248,0.35)" }}
              >
                {l}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
