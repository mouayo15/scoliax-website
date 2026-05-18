import React, { useState, useEffect, useRef } from "react";
import {
  Globe,
  Brain,
  Sparkles,
  Image as ImageIcon,
  PenLine,
  TrendingUp,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Facebook,
  ArrowRight,
} from "lucide-react";
import { FadeIn, SectionLabel, AD_IMAGES, CONCEPT_IMAGES, GENERATED_AD_HERO } from "./common";

/* ------------- Feature: AI Campaign Generator ------------- */
const CampaignGenerator = () => (
  <FadeIn>
    <div className="card-surface p-7 lg:p-10" style={{ borderRadius: 20 }} data-testid="feature-campaign">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <SectionLabel testId="feature-campaign-label">Générateur de campagnes IA</SectionLabel>
          <h3 className="section-title mt-3">Une URL. Trois concepts. Une campagne.</h3>
          <p className="mt-3 muted max-w-xl">
            Collez l'URL de votre site. L'IA analyse votre marque et propose trois concepts
            visuels prêts à l'emploi en quelques secondes.
          </p>
        </div>
      </div>

      <div className="mt-9 grid lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-3">
          <div className="rounded-xl p-4" style={{ background: "rgba(15,13,11,0.6)", border: "1px solid rgba(212,114,10,0.25)" }}>
            <div className="text-[10px] tag mb-2">01 · ENTRÉE</div>
            <div className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm" style={{ background: "#0F0D0B", border: "1px solid rgba(250,250,248,0.08)" }}>
              <Globe size={14} style={{ color: "var(--orange)" }} />
              <span style={{ color: "var(--text)" }}>scoliax.com</span>
              <span className="caret" style={{ color: "var(--orange)" }}>|</span>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex lg:col-span-1 items-center justify-center">
          <ArrowRight size={20} style={{ color: "var(--orange)" }} />
        </div>

        <div className="lg:col-span-3">
          <div className="rounded-xl p-4 flex flex-col items-center" style={{ background: "rgba(15,13,11,0.6)", border: "1px solid rgba(212,114,10,0.25)" }}>
            <div className="text-[10px] tag mb-2 self-start">02 · IA</div>
            <div className="relative my-2">
              <div className="absolute inset-0 rounded-full pulse-ring" style={{ background: "transparent" }} />
              <div className="rounded-full flex items-center justify-center spin-slow" style={{ width: 60, height: 60, background: "linear-gradient(135deg, #D4720A, #B35F08)" }}>
                <Brain size={28} color="white" />
              </div>
            </div>
            <div className="text-[11px] muted mt-2">Analyse & génération</div>
          </div>
        </div>

        <div className="hidden lg:flex lg:col-span-1 items-center justify-center">
          <ArrowRight size={20} style={{ color: "var(--orange)" }} />
        </div>

        <div className="lg:col-span-4">
          <div className="text-[10px] tag mb-3">03 · CONCEPTS</div>
          <div className="flex gap-2">
            {[
              { title: "Lancement", img: CONCEPT_IMAGES.launch },
              { title: "Offre flash", img: CONCEPT_IMAGES.flash },
              { title: "Témoignage", img: CONCEPT_IMAGES.testimonial },
            ].map((c, i) => (
              <div key={i} className="flex-1 rounded-xl overflow-hidden" style={{ transform: `rotate(${i === 1 ? 0 : i === 0 ? -3 : 3}deg)`, background: "#0F0D0B", border: "1px solid rgba(212,114,10,0.25)" }}>
                <div style={{ height: 90, backgroundImage: `url(${c.img})`, backgroundSize: "cover", backgroundPosition: "center" }} />
                <div className="p-2.5">
                  <div className="text-[11px] font-semibold" style={{ color: "var(--text)" }}>{c.title}</div>
                  <div className="text-[10px] muted mt-0.5">3 visuels · 5 copies</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </FadeIn>
);

/* ------------- Feature: Brand Template Library ------------- */
const TemplateLibrary = () => {
  const [activeIdx, setActiveIdx] = useState(3);

  useEffect(() => {
    const id = setInterval(() => setActiveIdx(p => (p + 1) % 8), 1600);
    return () => clearInterval(id);
  }, []);

  const base = [
    { img: AD_IMAGES[0], label: "AI" },
    { img: AD_IMAGES[1], label: "" },
    { img: AD_IMAGES[2], label: "Default" },
    { img: null,         label: "" },
    { img: AD_IMAGES[4], label: "AI" },
    { img: AD_IMAGES[5], label: "" },
    { img: null,         label: "" },
    { img: AD_IMAGES[7], label: "" },
  ];

  return (
    <FadeIn className="h-full">
      <div className="card-surface p-7 lg:p-10 h-full" style={{ borderRadius: 20 }} data-testid="feature-templates">
        <SectionLabel>Bibliothèque de templates</SectionLabel>
        <h3 className="section-title mt-3">Votre identité, multipliée par l'IA.</h3>
        <p className="mt-3 muted max-w-xl">
          Importez vos visuels ou laissez l'IA générer des templates dans votre charte.
          Chaque post reste 100% fidèle à votre marque.
        </p>

        <div className="mt-8 grid grid-cols-4 grid-rows-2 gap-3">
          {base.map((c, i) => {
            const isActive = i === activeIdx;
            return (
              <div
                key={i}
                className="relative rounded-xl overflow-hidden"
                style={{
                  aspectRatio: "1 / 1",
                  background: "#0F0D0B",
                  border: isActive ? "1px solid var(--orange)" : "1px solid rgba(250,250,248,0.06)",
                  boxShadow: isActive ? "0 0 0 3px rgba(212,114,10,0.25), 0 0 20px rgba(212,114,10,0.2)" : "none",
                  transition: "border 0.4s ease, box-shadow 0.4s ease",
                  transform: isActive ? "scale(1.04)" : "scale(1)",
                }}
              >
                {c.img && (
                  <img src={c.img} alt="" loading="lazy"
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
                      filter: isActive ? "brightness(1.1)" : "brightness(0.85)",
                      transition: "filter 0.4s ease" }} />
                )}
                {c.label && (
                  <span className="absolute top-2 left-2 text-[9px] px-2 py-0.5 rounded-full font-semibold z-10"
                    style={{ background: c.label === "Default" ? "rgba(15,13,11,0.7)" : "linear-gradient(135deg, #D4720A, #B35F08)", color: c.label === "Default" ? "rgba(255,255,255,0.85)" : "white", letterSpacing: "0.1em", backdropFilter: c.label === "Default" ? "blur(8px)" : "none" }}>
                    {c.label}
                  </span>
                )}
                {!c.img && (
                  <div className="absolute inset-0 flex items-center justify-center muted text-2xl font-light">+</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </FadeIn>
  );
};

/* ------------- Feature: Multi-Channel Scheduling ------------- */
const MultiChannel = () => {
  const platforms = [
    { name: "IG", color: "#E4405F", icon: <Instagram size={12} color="white" /> },
    { name: "X",  color: "#1da1f2", icon: <Twitter size={12} color="white" /> },
    { name: "IN", color: "#0a66c2", icon: <Linkedin size={12} color="white" /> },
    { name: "TT", color: "#000",    icon: <span className="text-[10px] font-bold text-white">TT</span> },
    { name: "FB", color: "#1877F2", icon: <Facebook size={12} color="white" /> },
    { name: "PI", color: "#E60023", icon: <span className="text-[10px] font-bold text-white">P</span> },
    { name: "YT", color: "#FF0000", icon: <Youtube size={12} color="white" /> },
  ];
  const times = ["09:00", "10:30", "12:00", "Aujourd'hui", "15:00", "17:30", "19:00"];

  return (
    <FadeIn className="h-full">
      <div className="card-surface p-7 lg:p-10 h-full" style={{ borderRadius: 20 }} data-testid="feature-channels">
        <SectionLabel>Planification multi-canal</SectionLabel>
        <h3 className="section-title mt-3">Un seul tableau. Sept plateformes.</h3>
        <p className="mt-3 muted max-w-xl">
          Programmez vos publications sur tous vos réseaux depuis un seul calendrier.
          Adapté automatiquement aux formats de chaque plateforme.
        </p>

        <div className="relative mt-10 pb-3 overflow-x-auto">
          <div className="absolute top-0 bottom-0 scan-pulse" style={{ left: "calc(50% + 18px)", width: 2, background: "var(--orange)" }} />
          <div className="flex items-center justify-between min-w-[600px] relative">
            {platforms.map((p, i) => (
              <div key={p.name} className="flex flex-col items-center gap-3 slide-in-card" style={{ width: 70, animationDelay: `${i * 80}ms` }}>
                <div className="rounded-full flex items-center justify-center" style={{ width: 36, height: 36, background: p.color, transition: "transform 0.2s", boxShadow: i === 3 ? "0 0 12px rgba(212,114,10,0.5)" : "none" }}>
                  {p.icon}
                </div>
                <div className="rounded-md px-2 py-2 w-full text-center"
                  style={{ background: "rgba(15,13,11,0.6)", border: i === 3 ? "1px solid var(--orange)" : "1px solid rgba(250,250,248,0.06)" }}>
                  <div className="text-[10px] muted">{times[i]}</div>
                  <div className="mt-2 rounded overflow-hidden relative" style={{ height: 36 }}>
                    <img src={AD_IMAGES[i % AD_IMAGES.length]} alt="" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(15,13,11,0) 40%, rgba(15,13,11,0.6) 100%)" }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </FadeIn>
  );
};

/* ------------- Feature: AI Image Generation ------------- */
const ImageGen = () => (
  <FadeIn>
    <div className="card-surface p-7 lg:p-10" style={{ borderRadius: 20 }} data-testid="feature-image">
      <SectionLabel>Génération d'images IA</SectionLabel>
      <h3 className="section-title mt-3">Du wireframe au visuel final, instantanément.</h3>
      <p className="mt-3 muted max-w-xl">
        Vos templates de marque deviennent des visuels prêts à publier grâce à Gemini AI.
        Chaque image respecte vos couleurs, votre typo et votre ton.
      </p>

      <div className="mt-9 grid lg:grid-cols-12 gap-4 items-center">
        <div className="lg:col-span-5">
          <div className="text-[10px] tag mb-2">VOTRE TEMPLATE</div>
          <div className="rounded-xl p-5" style={{ background: "#0F0D0B", border: "1px solid rgba(250,250,248,0.06)", aspectRatio: "4 / 3" }}>
            <div className="rounded h-6 mb-3" style={{ background: "rgba(250,250,248,0.08)", width: "70%" }} />
            <div className="rounded h-4 mb-2" style={{ background: "rgba(250,250,248,0.06)", width: "85%" }} />
            <div className="rounded h-4 mb-4" style={{ background: "rgba(250,250,248,0.06)", width: "60%" }} />
            <div className="rounded" style={{ background: "rgba(250,250,248,0.04)", height: 80 }} />
            <div className="mt-3 flex gap-2">
              <div className="rounded-full" style={{ width: 18, height: 18, background: "rgba(212,114,10,0.4)" }} />
              <div className="rounded h-4 flex-1" style={{ background: "rgba(250,250,248,0.06)" }} />
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col items-center justify-center gap-2 py-4">
          <div className="hidden lg:flex items-center justify-center" style={{ width: "100%", height: 2, background: "var(--orange)" }} />
          <div className="text-[10px] px-3 py-1 rounded-full whitespace-nowrap pulse-ring"
            style={{ background: "linear-gradient(135deg, #D4720A, #B35F08)", color: "white", fontWeight: 600 }}>
            Gemini AI →
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="text-[10px] tag mb-2">VISUEL GÉNÉRÉ</div>
          <div className="rounded-xl relative overflow-hidden" style={{ aspectRatio: "4 / 3", border: "1px solid rgba(212,114,10,0.35)" }}>
            <img src={GENERATED_AD_HERO} alt="Visuel généré par l'IA" loading="lazy"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(15,13,11,0) 30%, rgba(15,13,11,0.92) 100%)" }} />
            <div className="absolute bottom-5 left-5 right-5 z-10">
              <div className="text-[10px] tag mb-1">Campagne Hiver 2026</div>
              <div className="text-white font-bold text-lg leading-tight">Reprenez le contrôle de votre contenu.</div>
              <div className="muted text-xs mt-1">scoliax.com</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </FadeIn>
);

/* ------------- Feature: Post Studio ------------- */
const FULL_TEXT = "Aujourd'hui, on lance une nouvelle façon de faire vivre votre marque sur les réseaux sociaux";

const PostStudio = () => {
  const [displayed, setDisplayed] = useState("");
  const [charCount, setCharCount] = useState(0);
  const idxRef = useRef(0);

  useEffect(() => {
    const tick = () => {
      if (idxRef.current <= FULL_TEXT.length) {
        setDisplayed(FULL_TEXT.slice(0, idxRef.current));
        setCharCount(idxRef.current);
        idxRef.current++;
      } else {
        setTimeout(() => { idxRef.current = 0; }, 2000);
      }
    };
    const id = setInterval(tick, 38);
    return () => clearInterval(id);
  }, []);

  return (
    <FadeIn className="h-full">
      <div className="card-surface p-7 lg:p-10 h-full" style={{ borderRadius: 20 }} data-testid="feature-studio">
        <SectionLabel>Studio de publication</SectionLabel>
        <h3 className="section-title mt-3">Écrivez moins. Publiez plus.</h3>
        <p className="mt-3 muted max-w-xl">
          Choisissez un format — fil, post long ou court — et laissez l'IA structurer votre
          message. Aperçu en temps réel.
        </p>

        <div className="mt-9 grid lg:grid-cols-2 gap-5">
          <div className="rounded-xl p-5" style={{ background: "#0F0D0B", border: "1px solid rgba(250,250,248,0.06)" }}>
            <div className="flex items-center justify-between mb-4">
              <div className="text-[11px] muted">Éditeur</div>
              <select className="text-[11px] rounded-md px-2 py-1"
                style={{ background: "#1C1611", border: "1px solid rgba(212,114,10,0.25)", color: "var(--text)" }}
                defaultValue="long" data-testid="post-format-select">
                <option value="thread">Fil</option>
                <option value="long">Post long</option>
                <option value="short">Court</option>
              </select>
            </div>
            <div className="text-sm leading-relaxed" style={{ color: "var(--text)", minHeight: 60 }}>
              {displayed}
              <span className="caret" style={{ color: "var(--orange)" }}>|</span>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <div className="muted text-[11px]">{charCount} / 280</div>
              <button className="btn-orange rounded-full px-4 py-2 text-xs font-medium inline-flex items-center gap-2" data-testid="generate-post-button">
                <Sparkles size={12} /> Générer
              </button>
            </div>
          </div>

          <div className="rounded-xl p-5 relative" style={{ background: "linear-gradient(180deg, rgba(24,20,16,0.95), rgba(15,13,11,0.7))", border: "1px solid rgba(212,114,10,0.18)" }}>
            <div className="text-[11px] tag mb-3">APERÇU</div>
            <div className="flex items-center gap-3 mb-3">
              <div className="rounded-full" style={{ width: 34, height: 34, background: "linear-gradient(135deg, #D4720A, #B35F08)" }} />
              <div>
                <div className="text-sm font-semibold" style={{ color: "var(--text)" }}>Scoliax</div>
                <div className="text-[11px] muted">@scoliax · maintenant</div>
              </div>
            </div>
            <div className="text-sm leading-relaxed" style={{ color: "rgba(250,250,248,0.85)" }}>
              🎯 Lancez une campagne complète en moins de 60 secondes. Briefez Scoliax,
              recevez 3 concepts visuels + copy, planifiez sur tous vos réseaux. ↘
            </div>
            <div className="mt-4 flex items-center gap-5 text-[11px] muted">
              <span>♡ 248</span><span>↻ 42</span><span>↳ 18</span>
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  );
};

/* ------------- Feature: Analytics ------------- */
const STATS = [
  { target: 28,  suffix: "+",   label: "canaux connectés",  icon: <Globe size={16} /> },
  { target: 10,  suffix: " K+", label: "posts générés",     icon: <PenLine size={16} /> },
  { target: 4.2, suffix: "×",   label: "engagement moyen",  icon: <TrendingUp size={16} /> },
];

const Analytics = () => {
  const pts = [10, 22, 18, 30, 26, 42, 38, 52, 60, 56, 72, 80];
  const w = 560, h = 140, pad = 8;
  const max = Math.max(...pts), min = Math.min(...pts);
  const stepX = (w - pad * 2) / (pts.length - 1);
  const ys = pts.map(p => h - pad - ((p - min) / (max - min)) * (h - pad * 2));
  const path = ys.map((y, i) => `${i === 0 ? "M" : "L"}${pad + i * stepX},${y}`).join(" ");
  const area = `${path} L${pad + (pts.length - 1) * stepX},${h - pad} L${pad},${h - pad} Z`;

  const [shown, setShown] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0]);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShown(true);
        STATS.forEach(({ target }, i) => {
          const duration = 1400;
          const steps = 60;
          let step = 0;
          const id = setInterval(() => {
            step++;
            const progress = step / steps;
            const eased = 1 - Math.pow(1 - progress, 3);
            setCounts(prev => { const n = [...prev]; n[i] = target * eased; return n; });
            if (step >= steps) clearInterval(id);
          }, duration / steps);
        });
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const fmt = (val, i) => {
    if (i === 2) return val.toFixed(1) + "×";
    if (i === 1) return Math.round(val) + " K+";
    return Math.round(val) + "+";
  };

  return (
    <FadeIn className="h-full">
      <div ref={ref} className="card-surface p-7 lg:p-10 h-full" style={{ borderRadius: 20 }} data-testid="feature-analytics">
        <SectionLabel>Analytics</SectionLabel>
        <h3 className="section-title mt-3">Mesurez ce qui compte vraiment.</h3>
        <p className="mt-3 muted max-w-xl">
          Performance par canal, par campagne, par format. Des insights actionnables, pas
          des graphiques pour faire joli.
        </p>

        <div className="mt-9 grid lg:grid-cols-12 gap-5">
          <div className="lg:col-span-7 rounded-xl p-5" style={{ background: "#0F0D0B", border: "1px solid rgba(250,250,248,0.06)" }}>
            <div className="flex items-center justify-between mb-4">
              <div className="text-[11px] muted">Engagement — 30 derniers jours</div>
              <div className="text-[11px]" style={{ color: "var(--orange)" }}>+42%</div>
            </div>
            <svg viewBox={`0 0 ${w} ${h}`} className="w-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#D4720A" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#D4720A" stopOpacity="0" />
                </linearGradient>
              </defs>
              {shown && <path d={area} fill="url(#g1)" style={{ animation: "drawChart 1.6s ease forwards" }} />}
              {shown && (
                <path d={path} fill="none" stroke="#D4720A" strokeWidth="2.5" strokeLinecap="round"
                  strokeDasharray="1600" strokeDashoffset="0"
                  className="draw-chart" />
              )}
              {shown && ys.map((y, i) => (
                <circle key={i} cx={pad + i * stepX} cy={y} r="3" fill="#D4720A"
                  style={{ animation: `slideInCard 0.3s ${i * 100}ms both` }} />
              ))}
            </svg>
          </div>

          <div className="lg:col-span-5 grid grid-rows-3 gap-3">
            {STATS.map((s, i) => (
              <div key={i} className="rounded-xl p-4 flex items-center gap-4"
                style={{ background: "#0F0D0B", border: "1px solid rgba(250,250,248,0.06)" }}>
                <div className="rounded-lg flex items-center justify-center"
                  style={{ width: 38, height: 38, background: "rgba(212,114,10,0.15)", color: "var(--orange)" }}>
                  {s.icon}
                </div>
                <div>
                  <div className="text-2xl font-bold" style={{ color: "var(--text)" }}>{fmt(counts[i], i)}</div>
                  <div className="text-[11px] muted">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </FadeIn>
  );
};

export default function Features() {
  return (
    <section id="features" className="relative py-20 lg:py-28 px-5 lg:px-8" data-testid="features-section">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <SectionLabel>Fonctionnalités</SectionLabel>
            <h2 className="section-title mt-3">Tout ce qu'il faut pour publier vite, bien, partout.</h2>
            <p className="mt-4 muted">
              Six modules, pensés pour fonctionner ensemble. Pas de plug-ins, pas de copier-coller.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-6">
          <CampaignGenerator />
          <div className="grid lg:grid-cols-2 gap-6">
            <TemplateLibrary />
            <MultiChannel />
          </div>
          <ImageGen />
          <div className="grid lg:grid-cols-2 gap-6">
            <PostStudio />
            <Analytics />
          </div>
        </div>
      </div>
    </section>
  );
}
