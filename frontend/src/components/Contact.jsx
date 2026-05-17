import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Mail, MessageCircle, Send, Twitter, Loader2 } from "lucide-react";
import { FadeIn, SectionLabel } from "./common";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [sending, setSending] = useState(false);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Merci de remplir les champs obligatoires.");
      return;
    }
    setSending(true);
    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        company: form.company.trim() || null,
        message: form.message.trim(),
      };
      const res = await axios.post(`${API}/contact`, payload);
      if (res.status === 200) {
        toast.success("Message envoyé. Nous revenons vers vous très vite.");
        setForm({ name: "", email: "", company: "", message: "" });
      } else {
        toast.error("Une erreur est survenue. Réessayez.");
      }
    } catch (err) {
      const detail = err?.response?.data?.detail;
      toast.error(detail || "Impossible d'envoyer le message. Réessayez plus tard.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative py-20 lg:py-28 px-5 lg:px-8" data-testid="contact-section">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Intro */}
          <div className="lg:col-span-5">
            <FadeIn>
              <SectionLabel>Contact</SectionLabel>
              <h2 className="section-title mt-3 inline-block">
                Prenons contact
                <span
                  className="block mt-3"
                  style={{
                    height: 4,
                    width: 64,
                    background: "linear-gradient(135deg, #D4720A, #B35F08)",
                    borderRadius: 999,
                  }}
                />
              </h2>
              <p className="mt-6 muted max-w-md">
                Une question, un projet, une démo ? Écrivez-nous. Notre équipe répond en moins de 24 heures.
              </p>

              <div className="mt-10 space-y-5">
                {[
                  { icon: <Mail size={16} />, label: "Email", value: "contact@scoliax.com" },
                  { icon: <Twitter size={16} />, label: "X (Twitter)", value: "@scoliax" },
                  { icon: <MessageCircle size={16} />, label: "Discord", value: "discord.gg/scoliax" },
                ].map((c) => (
                  <div key={c.label} className="flex items-center gap-4" data-testid={`contact-info-${c.label.toLowerCase()}`}>
                    <div
                      className="rounded-lg flex items-center justify-center"
                      style={{
                        width: 40,
                        height: 40,
                        background: "rgba(212,114,10,0.12)",
                        color: "var(--orange)",
                        border: "1px solid rgba(212,114,10,0.25)",
                      }}
                    >
                      {c.icon}
                    </div>
                    <div>
                      <div className="text-[11px] tag">{c.label}</div>
                      <div className="text-sm mt-0.5" style={{ color: "var(--text)" }}>
                        {c.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <FadeIn delay={120}>
              <form
                onSubmit={onSubmit}
                className="card-surface p-7 lg:p-9"
                style={{ borderRadius: 20 }}
                data-testid="contact-form"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] tag block mb-2">Nom complet *</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={onChange}
                      className="input-dark"
                      placeholder="Camille Roux"
                      required
                      data-testid="contact-input-name"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] tag block mb-2">Adresse email *</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={onChange}
                      className="input-dark"
                      placeholder="camille@maison-lumiere.fr"
                      required
                      data-testid="contact-input-email"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="text-[11px] tag block mb-2">Entreprise (optionnel)</label>
                  <input
                    type="text"
                    name="company"
                    value={form.company}
                    onChange={onChange}
                    className="input-dark"
                    placeholder="Maison Lumière"
                    data-testid="contact-input-company"
                  />
                </div>

                <div className="mt-4">
                  <label className="text-[11px] tag block mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={onChange}
                    rows={4}
                    className="input-dark resize-none"
                    placeholder="Parlez-nous de votre marque, de vos canaux actuels et de ce que vous aimeriez accomplir avec Scoliax…"
                    required
                    data-testid="contact-input-message"
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="btn-orange rounded-full w-full mt-6 py-3.5 text-sm font-semibold inline-flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  data-testid="contact-submit-button"
                >
                  {sending ? (
                    <>
                      <Loader2 size={16} className="spin-slow" /> Envoi…
                    </>
                  ) : (
                    <>
                      Envoyer le message <Send size={14} />
                    </>
                  )}
                </button>

                <p className="text-xs muted text-center mt-4">
                  Nous répondons habituellement sous 24 heures.
                </p>
              </form>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
