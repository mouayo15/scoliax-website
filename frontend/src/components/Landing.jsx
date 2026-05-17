import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Features from "./Features";
import HowItWorks from "./HowItWorks";
import Testimonials from "./Testimonials";
import Pricing from "./Pricing";
import Contact from "./Contact";
import Footer from "./Footer";

export default function Landing() {
  return (
    <div className="relative" style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
