import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Mail, Phone, MapPin, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import { submitContact } from "@/api/contact";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact GlowAI" },
      { name: "description", content: "Get in touch with the GlowAI team in Bengaluru." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await submitContact({ data: { name: name.trim(), email: email.trim(), message: message.trim() } });
      setSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SiteLayout>
      <section className="px-6 pt-16 pb-20">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-rose-deep">Get in touch</span>
            <h1 className="font-serif text-5xl mt-3 mb-6">We'd love to hear from you.</h1>
            <p className="text-text-main/60 mb-8">Whether you run a salon, want to partner, or have feedback on your last booking — we're listening.</p>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3"><Mail className="size-4 text-brand-rose-deep" /> hello@glowai.in</li>
              <li className="flex items-center gap-3"><Phone className="size-4 text-brand-rose-deep" /> +91 80 4567 8901</li>
              <li className="flex items-center gap-3"><MapPin className="size-4 text-brand-rose-deep" /> 1st Floor, Indiranagar, Bengaluru 560038</li>
            </ul>
          </div>

          <form className="glass-panel rounded-3xl p-8 space-y-4" onSubmit={handleSubmit}>
            {success && (
              <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-xl text-sm text-green-700">
                <CheckCircle className="size-4 shrink-0" />
                Message sent! We'll get back to you soon.
              </div>
            )}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                <AlertCircle className="size-4 shrink-0" />
                {error}
              </div>
            )}

            <Field
              label="Name"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="contact-name"
            />
            <Field
              label="Email"
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="contact-email"
            />
            <label className="block">
              <span className="text-[10px] uppercase tracking-widest font-semibold text-text-main/50">Message</span>
              <textarea
                rows={5}
                placeholder="Tell us what's on your mind…"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                id="contact-message"
                className="mt-1.5 w-full bg-white/70 border border-text-main/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-rose focus:bg-white"
              />
            </label>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-text-main text-white rounded-full py-3.5 text-sm font-semibold hover:bg-brand-rose-deep transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? <><Loader2 className="size-4 animate-spin" /> Sending…</> : "Send message"}
            </button>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({ label, ...rest }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-widest font-semibold text-text-main/50">{label}</span>
      <input
        {...rest}
        className="mt-1.5 w-full bg-white/70 border border-text-main/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-rose focus:bg-white transition-colors"
      />
    </label>
  );
}
