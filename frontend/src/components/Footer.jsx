import React from "react";
import { Twitter, Instagram, Linkedin } from "lucide-react";
import { LOGO_URL } from "./common";

const navLinks = [
  { href: "#features", label: "Fonctionnalités" },
  { href: "#pricing", label: "Tarifs" },
  { href: "#contact", label: "Contact" },
  { href: "#", label: "Confidentialité" },
  { href: "#", label: "Conditions" },
];

export default function Footer() {
  return (
    <footer className="relative pt-16 pb-8 px-5 lg:px-8" data-testid="footer">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-10">
          <div className="flex items-center gap-3">
            <img src={LOGO_URL} alt="Scoliax" style={{ height: 36, width: 36, objectFit: "contain" }} />
            <span className="text-lg font-semibold" style={{ color: "var(--text)" }}>Scoliax</span>
          </div>
          <p
            className="text-sm italic"
            style={{ color: "var(--text-muted)", fontFamily: "'Inter', serif" }}
          >
            L'IA qui travaille pour votre marque.
          </p>
        </div>

        <div
          className="h-px w-full mb-8"
          style={{ background: "linear-gradient(90deg, transparent, rgba(212,114,10,0.35), transparent)" }}
        />

        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-6">
          <div className="text-xs muted">
            © {new Date().getFullYear()} Scoliax. Tous droits réservés.
          </div>

          <nav className="flex flex-wrap items-center gap-x-7 gap-y-2 justify-center">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-xs transition-colors"
                style={{ color: "rgba(250,250,248,0.55)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--orange)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(250,250,248,0.55)")}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {[
              { icon: <Twitter size={14} />, label: "X", href: "#" },
              { icon: <Instagram size={14} />, label: "Instagram", href: "#" },
              { icon: <Linkedin size={14} />, label: "LinkedIn", href: "#" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="rounded-full flex items-center justify-center transition-all"
                style={{
                  width: 34,
                  height: 34,
                  background: "rgba(250,250,248,0.04)",
                  color: "rgba(250,250,248,0.65)",
                  border: "1px solid rgba(250,250,248,0.06)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(212,114,10,0.15)";
                  e.currentTarget.style.color = "var(--orange)";
                  e.currentTarget.style.borderColor = "rgba(212,114,10,0.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(250,250,248,0.04)";
                  e.currentTarget.style.color = "rgba(250,250,248,0.65)";
                  e.currentTarget.style.borderColor = "rgba(250,250,248,0.06)";
                }}
                data-testid={`footer-social-${s.label.toLowerCase()}`}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
