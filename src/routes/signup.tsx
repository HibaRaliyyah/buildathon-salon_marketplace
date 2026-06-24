import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Sign up — GlowAI" },
      { name: "description", content: "Create your GlowAI account and build your AI beauty profile in minutes." },
    ],
  }),
  component: SignupPage,
});

const skinTones = ["Fair", "Light", "Medium", "Wheatish", "Dusky", "Deep"];
const hairTypes = ["Straight", "Wavy", "Curly", "Coily"];
const faceShapes = ["Oval", "Round", "Heart", "Square", "Long"];
const services = ["Hair", "Makeup", "Skin", "Nails", "Spa", "Men's Grooming"];
const areas = [
  "Indiranagar", "Koramangala", "Whitefield", "Electronic City", "HSR Layout",
  "JP Nagar", "Jayanagar", "Yelahanka", "Hebbal", "Malleshwaram",
  "Banashankari", "Marathahalli",
];
const budgets = ["Under ₹1,000", "₹1,000 – ₹3,000", "₹3,000 – ₹6,000", "Premium"];

function SignupPage() {
  const [step, setStep] = useState(1);
  const total = 4;

  return (
    <div className="min-h-screen px-4 py-12 grid place-items-center">
      <div className="w-full max-w-2xl">
        <Link to="/" className="block text-center font-serif text-2xl font-bold text-brand-rose-deep mb-6">
          GlowAI
        </Link>
        <div className="glass-panel rounded-3xl p-8 sm:p-10">
          <Progress step={step} total={total} />

          {step === 1 && <Step1 />}
          {step === 2 && <Step2 />}
          {step === 3 && <Step3 />}
          {step === 4 && <Step4 />}

          <div className="mt-8 flex items-center justify-between">
            <button
              disabled={step === 1}
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              className="text-sm font-medium text-text-main/60 disabled:opacity-30 flex items-center gap-1"
            >
              <ArrowLeft className="size-4" /> Back
            </button>
            {step < total ? (
              <button
                onClick={() => setStep((s) => Math.min(total, s + 1))}
                className="bg-text-main text-white rounded-full px-6 py-3 text-sm font-semibold flex items-center gap-2 hover:bg-brand-rose-deep transition-colors"
              >
                Continue <ArrowRight className="size-4" />
              </button>
            ) : (
              <button className="bg-brand-rose-deep text-white rounded-full px-6 py-3 text-sm font-semibold flex items-center gap-2 hover:bg-text-main transition-colors">
                Create account <Check className="size-4" />
              </button>
            )}
          </div>

          <p className="mt-6 text-center text-sm text-text-main/60">
            Already have an account? <Link to="/login" className="text-brand-rose-deep font-semibold">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function Progress({ step, total }: { step: number; total: number }) {
  return (
    <div className="mb-8">
      <div className="flex justify-between text-[10px] uppercase tracking-widest font-semibold text-text-main/50 mb-2">
        <span>Step {step} of {total}</span>
        <span>{["Account", "Beauty Profile", "Location", "Budget"][step - 1]}</span>
      </div>
      <div className="h-1 w-full bg-white/60 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-brand-rose to-brand-lavender transition-all"
          style={{ width: `${(step / total) * 100}%` }}
        />
      </div>
    </div>
  );
}

function Step1() {
  return (
    <div className="space-y-4">
      <h2 className="font-serif text-3xl">Create your account</h2>
      <Field label="Full name" placeholder="Riya Sharma" />
      <Field label="Email" type="email" placeholder="riya@bengaluru.in" />
      <Field label="Phone number" type="tel" placeholder="+91 98XXX XXXXX" />
      <Field label="Password" type="password" placeholder="••••••••" />
    </div>
  );
}

function Step2() {
  return (
    <div className="space-y-5">
      <h2 className="font-serif text-3xl">Your beauty profile</h2>
      <ChipGroup label="Skin tone" options={skinTones} />
      <ChipGroup label="Hair type" options={hairTypes} />
      <ChipGroup label="Face shape" options={faceShapes} />
      <ChipGroup label="Preferred services" options={services} multi />
    </div>
  );
}

function Step3() {
  return (
    <div className="space-y-5">
      <h2 className="font-serif text-3xl">Where are you in Bengaluru?</h2>
      <p className="text-sm text-text-main/60">We'll prioritize salons near your preferred locality.</p>
      <ChipGroup label="Locality" options={areas} />
    </div>
  );
}

function Step4() {
  return (
    <div className="space-y-5">
      <h2 className="font-serif text-3xl">Your beauty budget</h2>
      <div className="grid sm:grid-cols-2 gap-3">
        {budgets.map((b) => (
          <label key={b} className="cursor-pointer">
            <input type="radio" name="budget" className="peer sr-only" />
            <div className="p-5 rounded-2xl border border-text-main/10 bg-white/70 peer-checked:border-brand-rose-deep peer-checked:bg-brand-rose/10 transition-colors">
              <div className="font-mono text-xs text-brand-rose-deep mb-2">BUDGET</div>
              <div className="font-serif text-xl">{b}</div>
            </div>
          </label>
        ))}
      </div>
    </div>
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

function ChipGroup({ label, options, multi }: { label: string; options: string[]; multi?: boolean }) {
  const [selected, setSelected] = useState<string[]>([]);
  const toggle = (o: string) => {
    setSelected((cur) => {
      if (multi) return cur.includes(o) ? cur.filter((x) => x !== o) : [...cur, o];
      return [o];
    });
  };
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest font-semibold text-text-main/50 mb-2">{label}</div>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const on = selected.includes(o);
          return (
            <button
              type="button"
              key={o}
              onClick={() => toggle(o)}
              className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                on
                  ? "bg-brand-rose-deep text-white border-brand-rose-deep"
                  : "bg-white/70 border-text-main/10 hover:border-brand-rose"
              }`}
            >
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}
