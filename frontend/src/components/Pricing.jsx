import React from "react";
import { Check } from "lucide-react";
import { FadeIn, SectionLabel } from "./common";

const tiers = [
  {
    name: "Starter",
    price: "Gratuit",
    period: "",
    desc: "Pour tester Scoliax sans engagement.",
    features: [
      "1 marque · 1 utilisateur",
      "10 posts générés / mois",
      "2 canaux connectés",
      "Templates de base",
    ],
    cta: "Commencer",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "29 €",
    period: "/ mois",
    desc: "Pour les marques qui publient sérieusement.",
    features: [
      "3 marques · 3 utilisateurs",
      "500 posts générés / mois",
      "Tous les canaux",
      "Génération d'images IA (Gemini)",
      "Analytics complets",
      "Support prioritaire",
    ],
    cta: "Choisir Pro",
    highlighted: true,
    badge: "Le plus populaire",
  },
  {
    name: "Agency",
    price: "99 €",
    period: "/ mois",
    desc: "Pour les agences et équipes marketing.",
    features: [
      "Marques illimitées · 10 utilisateurs",
      "Posts illimités",
      "API & intégrations",
      "Workspaces clients",
      "White-label",
      "Account manager dédié",
    ],
    cta: "Contacter les ventes",
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-20 lg:py-28 px-5 lg:px-8" data-testid="pricing-section">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <SectionLabel>Tarifs</SectionLabel>
            <h2 className="section-title mt-3">Simple. Sans surprise.</h2>
            <p className="mt-4 muted">
              Annulez à tout moment. Pas de carte requise pour le plan Starter.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-5 items-stretch">
          {tiers.map((t, i) => (
            <FadeIn key={t.name} delay={i * 100}>
              <div
                className="relative h-full flex flex-col p-7 lg:p-8"
                style={{
                  background: t.highlighted
                    ? "linear-gradient(180deg, rgba(212,114,10,0.08), rgba(24,20,16,0.95))"
                    : "var(--bg-card)",
                  border: t.highlighted ? "1px solid var(--orange)" : "1px solid rgba(250,250,248,0.06)",
                  borderRadius: 20,
                  boxShadow: t.highlighted
                    ? "0 0 0 4px rgba(212,114,10,0.18), 0 30px 80px -30px rgba(212,114,10,0.45)"
                    : "none",
                }}
                data-testid={`pricing-tier-${t.name.toLowerCase()}`}
              >
                {t.highlighted && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-semibold tracking-[0.14em]"
                    style={{ background: "linear-gradient(135deg, #D4720A, #B35F08)", color: "white" }}
                  >
                    {t.badge}
                  </div>
                )}

                <div className="flex items-baseline justify-between">
                  <h3 className="text-lg font-semibold" style={{ color: "var(--text)" }}>{t.name}</h3>
                </div>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-bold" style={{ color: "var(--text)" }}>{t.price}</span>
                  {t.period && <span className="text-sm muted">{t.period}</span>}
                </div>
                <p className="mt-2 text-sm muted">{t.desc}</p>

                <div className="my-6 h-px" style={{ background: "rgba(250,250,248,0.06)" }} />

                <ul className="space-y-3 flex-1">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm" style={{ color: "rgba(250,250,248,0.85)" }}>
                      <span
                        className="rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ width: 18, height: 18, background: "rgba(212,114,10,0.18)" }}
                      >
                        <Check size={11} color="#D4720A" strokeWidth={3} />
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`mt-8 rounded-full px-6 py-3 text-sm font-medium text-center ${t.highlighted ? "btn-orange" : "btn-ghost"}`}
                  data-testid={`pricing-cta-${t.name.toLowerCase()}`}
                >
                  {t.cta}
                </a>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
