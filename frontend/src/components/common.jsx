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

// Generated example marketing images (Gemini Nano Banana)
export const AD_IMAGES = [
  "/images/ad_fashion.jpg",
  "/images/ad_restaurant.jpg",
  "/images/ad_saas.jpg",
  "/images/ad_fitness.jpg",
  "/images/ad_beauty.jpg",
  "/images/ad_travel.jpg",
  "/images/ad_realestate.jpg",
  "/images/ad_coffee.jpg",
];
export const CONCEPT_IMAGES = {
  launch: "/images/concept_launch.jpg",
  flash: "/images/concept_flash.jpg",
  testimonial: "/images/concept_testimonial.jpg",
};
export const GENERATED_AD_HERO = "/images/generated_ad_hero.jpg";
export const AVATARS = {
  camille: "/images/avatar_camille.jpg",
  adrien: "/images/avatar_adrien.jpg",
  lea: "/images/avatar_lea.jpg",
};

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
