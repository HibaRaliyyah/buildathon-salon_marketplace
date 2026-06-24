import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — GlowAI" },
      { name: "description", content: "Sign in to your GlowAI account to access your AI beauty profile and bookings." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="relative hidden md:flex flex-col justify-between p-12 bg-gradient-to-br from-brand-rose via-brand-rose-deep to-brand-lavender text-white overflow-hidden">
        <Link to="/" className="font-serif text-2xl font-bold relative z-10">GlowAI</Link>
        <div className="relative z-10 space-y-4 max-w-md">
          <Sparkles className="size-8" />
          <h2 className="font-serif text-4xl leading-tight">Welcome back to your beauty journey across Bengaluru.</h2>
          <p className="text-white/80">Your personalized recommendations, salon history and exclusive offers — all in one place.</p>
        </div>
        <p className="relative z-10 text-xs uppercase tracking-widest text-white/60">Bengaluru · India</p>
        <div className="absolute -top-20 -right-20 size-96 bg-white/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-20 size-96 bg-brand-gold/40 rounded-full blur-3xl" />
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md glass-panel rounded-3xl p-8 sm:p-10 space-y-6">
          <div>
            <h1 className="font-serif text-3xl">Sign in</h1>
            <p className="text-sm text-text-main/60 mt-1">Welcome back. Let's find your glow.</p>
          </div>

          <form className="space-y-4">
            <Field label="Email" type="email" placeholder="you@bengaluru.in" />
            <Field label="Password" type="password" placeholder="••••••••" />
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-text-main/70">
                <input type="checkbox" className="accent-brand-rose-deep" /> Remember me
              </label>
              <a href="#" className="text-brand-rose-deep font-medium hover:underline">Forgot password?</a>
            </div>
            <button className="w-full bg-text-main text-white rounded-full py-3.5 text-sm font-semibold hover:bg-brand-rose-deep transition-colors">
              Login
            </button>
          </form>

          <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-text-main/40">
            <div className="flex-1 h-px bg-text-main/10" /> Or continue with <div className="flex-1 h-px bg-text-main/10" />
          </div>

          <div className="grid grid-cols-3 gap-2">
            {["Google", "Apple", "Facebook"].map((p) => (
              <button key={p} className="py-2.5 bg-white/70 border border-text-main/10 rounded-full text-xs font-medium hover:bg-white transition-colors">
                {p}
              </button>
            ))}
          </div>

          <p className="text-center text-sm text-text-main/60">
            New to GlowAI? <Link to="/signup" className="text-brand-rose-deep font-semibold">Create account</Link>
          </p>
        </div>
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
