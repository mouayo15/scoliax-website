import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { LOGO_URL } from "./common";

const links = [
  { href: "#features", label: "Fonctionnalités" },
  { href: "#process", label: "Comment ça marche" },
  { href: "#pricing", label: "Tarifs" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="navbar"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(15,13,11,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(250,250,248,0.06)" : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8 h-20 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3" data-testid="navbar-logo-link">
          <img
            src={LOGO_URL}
            alt="Scoliax"
            style={{ height: 40, width: 40, objectFit: "contain" }}
          />
          <span className="text-[20px] font-semibold tracking-tight" style={{ color: "var(--text)" }}>
            Scoliax
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-9">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm transition-colors"
              style={{ color: "rgba(250,250,248,0.7)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(250,250,248,0.7)")}
              data-testid={`nav-link-${l.href.slice(1)}`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a href="#contact" className="text-sm muted" data-testid="nav-login">
            Connexion
          </a>
          <a
            href="#pricing"
            className="btn-orange rounded-full px-5 py-2.5 text-sm font-medium"
            data-testid="nav-cta-primary"
          >
            Démarrer
          </a>
        </div>

        <button
          className="md:hidden p-2 rounded-md"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          data-testid="navbar-mobile-toggle"
          style={{ color: "var(--text)" }}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div
          className="md:hidden border-t"
          style={{ background: "rgba(15,13,11,0.95)", borderColor: "rgba(250,250,248,0.06)" }}
          data-testid="navbar-mobile-panel"
        >
          <div className="px-5 py-4 flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-base"
                style={{ color: "var(--text)" }}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#pricing"
              onClick={() => setOpen(false)}
              className="btn-orange rounded-full px-5 py-2.5 text-sm text-center"
            >
              Démarrer
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
