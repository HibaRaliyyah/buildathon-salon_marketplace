import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, ArrowLeft, Check, Loader2, AlertCircle } from "lucide-react";
import { registerUser } from "@/api/auth";
import { saveBeautyProfile } from "@/api/profile";
import { useAuth } from "@/lib/auth-context";

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

interface FormData {
  // Step 1
  fullName: string;
  username: string;
  phone: string;
  password: string;
  // Step 2
  skinTone: string;
  hairType: string;
  faceShape: string;
  preferredServices: string[];
  // Step 3
  locality: string;
  // Step 4
  budget: string;
}

function SignupPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [step, setStep] = useState(1);
  const total = 4;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<FormData>({
    fullName: "",
    username: "",
    phone: "",
    password: "",
    skinTone: "",
    hairType: "",
    faceShape: "",
    preferredServices: [],
    locality: "",
    budget: "",
  });

  const update = (patch: Partial<FormData>) => setForm((f) => ({ ...f, ...patch }));

  const handleCreate = async () => {
    if (!form.fullName || !form.username || !form.phone || !form.password) {
      setError("Please fill in all fields in Step 1.");
      setStep(1);
      return;
    }
    setLoading(true);
    setError("");
    try {
      const result = await registerUser({
        data: {
          username: form.username.trim(),
          fullName: form.fullName.trim(),
          phone: form.phone.trim(),
          password: form.password,
        },
      });
      // Save beauty profile
      await saveBeautyProfile({
        data: {
          userId: result.user.id,
          skinTone: form.skinTone,
          hairType: form.hairType,
          faceShape: form.faceShape,
          preferredServices: form.preferredServices,
          locality: form.locality,
          budget: form.budget,
        },
      });
      login(result.token, result.user);
      await navigate({ to: "/dashboard" });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-12 grid place-items-center">
      <div className="w-full max-w-2xl">
        <Link to="/" className="block text-center font-serif text-2xl font-bold text-brand-rose-deep mb-6">
          GlowAI
        </Link>
        <div className="glass-panel rounded-3xl p-8 sm:p-10">
          <Progress step={step} total={total} />

          {error && (
            <div className="mb-4 flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
              <AlertCircle className="size-4 shrink-0" />
              {error}
            </div>
          )}

          {step === 1 && <Step1 form={form} update={update} />}
          {step === 2 && <Step2 form={form} update={update} />}
          {step === 3 && <Step3 form={form} update={update} />}
          {step === 4 && <Step4 form={form} update={update} />}

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
              <button
                onClick={handleCreate}
                disabled={loading}
                className="bg-brand-rose-deep text-white rounded-full px-6 py-3 text-sm font-semibold flex items-center gap-2 hover:bg-text-main transition-colors disabled:opacity-60"
              >
                {loading ? <><Loader2 className="size-4 animate-spin" /> Creating…</> : <>Create account <Check className="size-4" /></>}
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

function Step1({ form, update }: { form: FormData; update: (p: Partial<FormData>) => void }) {
  return (
    <div className="space-y-4">
      <h2 className="font-serif text-3xl">Create your account</h2>
      <ControlledField
        label="Full name"
        placeholder="Riya Sharma"
        value={form.fullName}
        onChange={(v) => update({ fullName: v })}
        id="signup-fullname"
      />
      <ControlledField
        label="Username"
        type="text"
        placeholder="riya_sharma"
        value={form.username}
        onChange={(v) => update({ username: v })}
        id="signup-username"
        autoComplete="username"
      />
      <ControlledField
        label="Phone number"
        type="tel"
        placeholder="+91 98XXX XXXXX"
        value={form.phone}
        onChange={(v) => update({ phone: v })}
        id="signup-phone"
      />
      <ControlledField
        label="Password"
        type="password"
        placeholder="••••••••"
        value={form.password}
        onChange={(v) => update({ password: v })}
        id="signup-password"
        autoComplete="new-password"
      />
    </div>
  );
}

function Step2({ form, update }: { form: FormData; update: (p: Partial<FormData>) => void }) {
  return (
    <div className="space-y-5">
      <h2 className="font-serif text-3xl">Your beauty profile</h2>
      <ChipGroup label="Skin tone" options={skinTones} selected={[form.skinTone]} onToggle={(o) => update({ skinTone: o })} />
      <ChipGroup label="Hair type" options={hairTypes} selected={[form.hairType]} onToggle={(o) => update({ hairType: o })} />
      <ChipGroup label="Face shape" options={faceShapes} selected={[form.faceShape]} onToggle={(o) => update({ faceShape: o })} />
      <ChipGroup
        label="Preferred services"
        options={services}
        multi
        selected={form.preferredServices}
        onToggle={(o) => {
          const cur = form.preferredServices;
          update({ preferredServices: cur.includes(o) ? cur.filter((x) => x !== o) : [...cur, o] });
        }}
      />
    </div>
  );
}

function Step3({ form, update }: { form: FormData; update: (p: Partial<FormData>) => void }) {
  return (
    <div className="space-y-5">
      <h2 className="font-serif text-3xl">Where are you in Bengaluru?</h2>
      <p className="text-sm text-text-main/60">We'll prioritize salons near your preferred locality.</p>
      <ChipGroup label="Locality" options={areas} selected={[form.locality]} onToggle={(o) => update({ locality: o })} />
    </div>
  );
}

function Step4({ form, update }: { form: FormData; update: (p: Partial<FormData>) => void }) {
  return (
    <div className="space-y-5">
      <h2 className="font-serif text-3xl">Your beauty budget</h2>
      <div className="grid sm:grid-cols-2 gap-3">
        {budgets.map((b) => (
          <button
            key={b}
            type="button"
            onClick={() => update({ budget: b })}
            className={`p-5 rounded-2xl border text-left transition-colors ${
              form.budget === b
                ? "border-brand-rose-deep bg-brand-rose/10"
                : "border-text-main/10 bg-white/70 hover:border-brand-rose"
            }`}
          >
            <div className="font-mono text-xs text-brand-rose-deep mb-2">BUDGET</div>
            <div className="font-serif text-xl">{b}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function ControlledField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  id,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  id?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-widest font-semibold text-text-main/50">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full bg-white/70 border border-text-main/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-rose focus:bg-white transition-colors"
      />
    </label>
  );
}

function ChipGroup({
  label,
  options,
  multi,
  selected,
  onToggle,
}: {
  label: string;
  options: string[];
  multi?: boolean;
  selected: string[];
  onToggle: (o: string) => void;
}) {
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
              onClick={() => onToggle(o)}
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
