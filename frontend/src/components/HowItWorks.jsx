import React from "react";
import { Settings, Sparkles, Rocket } from "lucide-react";
import { FadeIn, SectionLabel } from "./common";

const steps = [
  {
    n: "01",
    icon: <Settings size={22} color="white" />,
    title: "Configurez votre marque",
    desc: "Importez votre logo, vos couleurs et votre ton. L'IA apprend votre identité en moins d'une minute.",
  },
  {
    n: "02",
    icon: <Sparkles size={22} color="white" />,
    title: "Générez vos campagnes",
    desc: "Décrivez votre objectif. Scoliax produit visuels, copy et calendrier — adaptés à chaque plateforme.",
  },
  {
    n: "03",
    icon: <Rocket size={22} color="white" />,
    title: "Publiez et mesurez",
    desc: "Validez en un clic. Tout est programmé, publié et analysé automatiquement.",
  },
];

export default function HowItWorks() {
  return (
    <section id="process" className="relative py-24 lg:py-32 px-5 lg:px-8" data-testid="how-it-works-section">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <SectionLabel>Comment ça marche</SectionLabel>
            <h2 className="section-title mt-3">Trois étapes, zéro friction.</h2>
          </div>
        </FadeIn>

        <div className="relative grid lg:grid-cols-3 gap-10 lg:gap-6">
          {/* dashed connectors */}
          <div className="hidden lg:block absolute top-[64px] left-[18%] right-[18%]">
            <div className="dashed-connector" />
          </div>

          {steps.map((s, i) => (
            <FadeIn key={s.n} delay={i * 120}>
              <div className="relative text-center px-2">
                <div
                  className="huge-num absolute"
                  style={{ top: -40, left: "50%", transform: "translateX(-50%)", zIndex: 0 }}
                  aria-hidden
                >
                  {s.n}
                </div>
                <div className="relative z-10 flex flex-col items-center">
                  <div
                    className="rounded-full flex items-center justify-center mb-6"
                    style={{
                      width: 64, height: 64,
                      background: "linear-gradient(135deg, #D4720A, #B35F08)",
                      boxShadow: "0 12px 30px -10px rgba(212,114,10,0.55)",
                    }}
                  >
                    {s.icon}
                  </div>
                  <h3 className="text-xl font-semibold" style={{ color: "var(--text)" }}>
                    {s.title}
                  </h3>
                  <p className="mt-3 muted text-sm max-w-xs">{s.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
