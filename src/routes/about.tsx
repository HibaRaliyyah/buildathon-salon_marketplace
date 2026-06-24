import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Sparkles, MapPin, ShieldCheck, Heart } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About GlowAI — AI Beauty for Bengaluru" },
      { name: "description", content: "GlowAI is a Bengaluru-born beauty marketplace combining AI personalization with verified salons across the city." },
    ],
  }),
  component: AboutPage,
});

const values = [
  { icon: Sparkles, title: "AI-personalized", body: "128-point facial analysis, calibrated for Indian skin tones and Bengaluru's humidity." },
  { icon: MapPin, title: "Hyper-local", body: "Every neighborhood from Indiranagar to Yelahanka — vetted studios, real distances." },
  { icon: ShieldCheck, title: "Verified", body: "Every salon manually onboarded with hygiene, licensing and stylist credentials checked." },
  { icon: Heart, title: "For everyone", body: "Bridal parties, students, professionals and tourists — at every budget." },
];

function AboutPage() {
  return (
    <SiteLayout>
      <section className="px-6 pt-16 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-rose-deep">About GlowAI</span>
          <h1 className="font-serif text-5xl sm:text-6xl mt-3 mb-6 leading-tight">
            Beauty intelligence, <span className="italic text-brand-rose-deep">made in Bengaluru.</span>
          </h1>
          <p className="text-lg text-text-main/60">
            We're a small team of stylists, engineers and AI researchers reimagining how the city
            discovers and books beauty. Less guesswork, more glow.
          </p>
        </div>
        <div className="max-w-6xl mx-auto mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v) => (
            <div key={v.title} className="glass-card rounded-2xl p-6">
              <v.icon className="size-6 text-brand-rose-deep mb-4" />
              <h3 className="font-serif text-xl mb-1">{v.title}</h3>
              <p className="text-sm text-text-main/60">{v.body}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
