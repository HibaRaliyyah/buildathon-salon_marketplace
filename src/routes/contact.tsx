import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Mail, Phone, MapPin } from "lucide-react";

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
          <form className="glass-panel rounded-3xl p-8 space-y-4">
            <Field label="Name" placeholder="Your name" />
            <Field label="Email" type="email" placeholder="you@email.com" />
            <label className="block">
              <span className="text-[10px] uppercase tracking-widest font-semibold text-text-main/50">Message</span>
              <textarea
                rows={5}
                placeholder="Tell us what's on your mind…"
                className="mt-1.5 w-full bg-white/70 border border-text-main/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-rose focus:bg-white"
              />
            </label>
            <button className="w-full bg-text-main text-white rounded-full py-3.5 text-sm font-semibold hover:bg-brand-rose-deep transition-colors">
              Send message
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
