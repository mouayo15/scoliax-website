import React from "react";
import { ArrowRight, PlayCircle, Instagram, Twitter, Linkedin } from "lucide-react";
import { FadeIn, SectionLabel, AD_IMAGES } from "./common";

// Small tilted orange squares (logo echo) for the background
const FloatingSquares = () => (
  <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
    {[
      { top: "12%", left: "6%", size: 22, delay: "0s" },
      { top: "70%", left: "10%", size: 14, delay: "2s" },
      { top: "30%", left: "44%", size: 10, delay: "1s" },
      { top: "85%", left: "52%", size: 18, delay: "4s" },
      { top: "20%", left: "88%", size: 16, delay: "3s" },
      { top: "60%", left: "92%", size: 12, delay: "1.5s" },
      { top: "8%", left: "70%", size: 8, delay: "2.5s" },
    ].map((s, i) => (
      <span
        key={i}
        className="drift absolute block"
        style={{
          top: s.top,
          left: s.left,
          width: s.size,
          height: s.size,
          background: "linear-gradient(135deg, #D4720A, #B35F08)",
          borderRadius: 3,
          transform: "rotate(8deg)",
          opacity: 0.6,
          animationDelay: s.delay,
        }}
      />
    ))}
  </div>
);

// A mini calendar-style content scheduling mockup
const DashboardMockup = () => {
  const days = ["LUN", "MAR", "MER", "JEU", "VEN"];
  const slots = [
    { day: 0, time: "09:00", platform: "IG", color: "#E4405F", img: AD_IMAGES[0] },
    { day: 0, time: "14:00", platform: "X",  color: "#1da1f2", img: AD_IMAGES[2] },
    { day: 1, time: "10:30", platform: "IN", color: "#0a66c2", img: AD_IMAGES[4] },
    { day: 1, time: "17:00", platform: "TT", color: "#000",    img: AD_IMAGES[3] },
    { day: 2, time: "08:00", platform: "IG", color: "#E4405F", img: AD_IMAGES[1] },
    { day: 2, time: "13:00", platform: "X",  color: "#1da1f2", img: AD_IMAGES[7] },
    { day: 3, time: "11:00", platform: "IN", color: "#0a66c2", img: AD_IMAGES[6] },
    { day: 3, time: "19:00", platform: "TT", color: "#000",    img: AD_IMAGES[5] },
    { day: 4, time: "09:30", platform: "IG", color: "#E4405F", img: AD_IMAGES[0] },
    { day: 4, time: "16:00", platform: "X",  color: "#1da1f2", img: AD_IMAGES[2] },
  ];

  return (
    <div className="relative floaty">
      {/* Halo */}
      <div
        className="glow-orange"
        style={{ width: 460, height: 460, top: -40, left: -40, opacity: 0.55 }}
      />
      <div
        className="card-surface-orange relative"
        style={{
          padding: 20,
          borderRadius: 18,
          backdropFilter: "blur(20px)",
          background: "linear-gradient(180deg, rgba(24,20,16,0.95), rgba(24,20,16,0.85))",
          transform: "rotate(-1deg)",
          boxShadow: "0 60px 120px -40px rgba(212,114,10,0.35), 0 30px 60px -30px rgba(0,0,0,0.6)",
        }}
        data-testid="hero-mockup"
      >
        {/* Window chrome */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#3a2f25" }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#3a2f25" }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#3a2f25" }} />
          </div>
          <div className="text-[11px] muted">Calendrier — semaine 47</div>
          <div
            className="text-[11px] px-2 py-0.5 rounded-full"
            style={{ background: "rgba(212,114,10,0.15)", color: "var(--orange)" }}
          >
            Live
          </div>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-5 gap-2 mb-2">
          {days.map((d, idx) => (
            <div
              key={d}
              className="text-[10px] text-center py-1 rounded"
              style={{
                color: idx === 2 ? "white" : "rgba(250,250,248,0.55)",
                background: idx === 2 ? "linear-gradient(135deg, #D4720A, #B35F08)" : "transparent",
                fontWeight: 600,
                letterSpacing: "0.1em",
              }}
            >
              {d}
            </div>
          ))}
        </div>

        {/* Grid of post slots */}
        <div className="grid grid-cols-5 gap-2">
          {days.map((_, dayIdx) => {
            const daySlots = slots.filter((s) => s.day === dayIdx);
            return (
              <div key={dayIdx} className="flex flex-col gap-2">
                {daySlots.map((s, i) => (
                  <div
                    key={i}
                    className="relative rounded-md overflow-hidden"
                    style={{
                      height: 78,
                      background: "linear-gradient(135deg, rgba(212,114,10,0.18), rgba(28,22,17,0.6))",
                      border: "1px solid rgba(212,114,10,0.18)",
                    }}
                  >
                    {/* generated ad image */}
                    <img
                      src={s.img}
                      alt=""
                      loading="lazy"
                      style={{
                        position: "absolute",
                        inset: 4,
                        width: "calc(100% - 8px)",
                        height: "calc(100% - 8px)",
                        objectFit: "cover",
                        borderRadius: 6,
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 4,
                        borderRadius: 6,
                        background:
                          "linear-gradient(180deg, rgba(15,13,11,0) 35%, rgba(15,13,11,0.85) 100%)",
                      }}
                    />
                    <div
                      className="absolute top-1.5 right-1.5 rounded-full flex items-center justify-center"
                      style={{
                        background: s.color,
                        color: "white",
                        width: 18,
                        height: 18,
                        fontSize: 9,
                        fontWeight: 700,
                      }}
                    >
                      {s.platform}
                    </div>
                    <div
                      className="absolute bottom-1 left-1.5 text-[10px]"
                      style={{ color: "rgba(255,255,255,0.9)", fontWeight: 600 }}
                    >
                      {s.time}
                    </div>
                  </div>
                ))}
                {daySlots.length === 0 && (
                  <div
                    style={{
                      height: 78,
                      borderRadius: 6,
                      border: "1px dashed rgba(250,250,248,0.08)",
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Footer stats */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t" style={{ borderColor: "rgba(250,250,248,0.06)" }}>
          <div className="flex items-center gap-3 text-[11px] muted">
            <span className="flex items-center gap-1">
              <Instagram size={12} /> 12
            </span>
            <span className="flex items-center gap-1">
              <Twitter size={12} /> 8
            </span>
            <span className="flex items-center gap-1">
              <Linkedin size={12} /> 5
            </span>
          </div>
          <div className="text-[11px]" style={{ color: "var(--orange)" }}>
            +28% cette semaine ↗
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Hero() {
  return (
    <section
      id="top"
      className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 px-5 lg:px-8 overflow-hidden"
      data-testid="hero-section"
    >
      <FloatingSquares />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        <div className="lg:col-span-6">
          <FadeIn>
            <SectionLabel testId="hero-eyebrow">IA pour les réseaux sociaux</SectionLabel>
          </FadeIn>

          <FadeIn delay={120}>
            <h1
              className="mt-5 font-bold tracking-tight"
              style={{
                fontSize: "clamp(40px, 6.5vw, 64px)",
                lineHeight: 1.04,
                letterSpacing: "-0.025em",
                color: "var(--text)",
              }}
              data-testid="hero-headline"
            >
              Une marque cohérente.{" "}
              <span className="shimmer-text">Du contenu sans effort.</span>
            </h1>
          </FadeIn>

          <FadeIn delay={220}>
            <p
              className="mt-6 max-w-xl text-base lg:text-lg"
              style={{ color: "var(--text-muted)", lineHeight: 1.7 }}
              data-testid="hero-subtitle"
            >
              Scoliax génère, planifie et publie vos campagnes social media sur tous
              vos canaux. Décrivez votre marque, l'IA s'occupe du reste — visuels,
              copy et programmation.
            </p>
          </FadeIn>

          <FadeIn delay={320}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="https://post.scoliax.fr"
                className="btn-orange rounded-full px-7 py-3.5 text-sm font-medium inline-flex items-center gap-2"
                data-testid="hero-cta-primary"
              >
                Essayer gratuitement <ArrowRight size={16} />
              </a>
              <a
                href="#process"
                className="btn-ghost rounded-full px-6 py-3.5 text-sm font-medium inline-flex items-center gap-2"
                data-testid="hero-cta-secondary"
              >
                <PlayCircle size={16} /> Voir la démo
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={420}>
            <div className="mt-10 flex items-center gap-6 text-xs muted">
              <div className="flex -space-x-2">
                {["#D4720A", "#B35F08", "#7a3f06", "#3a2410"].map((c, i) => (
                  <span
                    key={i}
                    className="inline-block rounded-full border-2"
                    style={{ width: 28, height: 28, background: c, borderColor: "#0F0D0B" }}
                  />
                ))}
              </div>
              <span data-testid="hero-social-proof">
                Plus de 2 000 marques utilisent Scoliax au quotidien
              </span>
            </div>
          </FadeIn>
        </div>

        <div className="lg:col-span-6">
          <FadeIn delay={200}>
            <DashboardMockup />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
