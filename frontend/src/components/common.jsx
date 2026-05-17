import React, { useEffect, useRef, useState } from "react";

// FadeIn wrapper: applies .fade-up and toggles .in when in viewport
export const FadeIn = ({ children, delay = 0, className = "", as: Tag = "div", ...rest }) => {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setShown(true), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return (
    <Tag
      ref={ref}
      className={`fade-up ${shown ? "in" : ""} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export const SectionLabel = ({ children, testId }) => (
  <div className="tag" data-testid={testId}>{children}</div>
);

// Logo image hosted asset
export const LOGO_URL =
  "https://customer-assets.emergentagent.com/job_scoliax-launch/artifacts/hpjrcog9_scoliax-marketing-logo%20%281%29.png";

// Brand SVG icons (platform icons used in mockup) — using lucide where possible
export const PlatformDot = ({ label, color, children }) => (
  <div
    className="flex items-center justify-center rounded-full"
    style={{
      width: 28,
      height: 28,
      background: color,
      color: "white",
      fontSize: 12,
      fontWeight: 700,
    }}
    aria-label={label}
    title={label}
  >
    {children || label.charAt(0)}
  </div>
);
