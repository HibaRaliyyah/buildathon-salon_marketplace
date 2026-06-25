import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, Loader2, AlertCircle } from "lucide-react";
import { loginUser } from "@/api/auth";
import { useAuth } from "@/lib/auth-context";

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
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const result = await loginUser({ data: { username: username.trim(), password } });
      login(result.token, result.user);
      await navigate({ to: "/dashboard" });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
              <AlertCircle className="size-4 shrink-0" />
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <Field
              label="Username"
              type="text"
              placeholder="your_username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              id="login-username"
            />
            <Field
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              id="login-password"
            />
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-text-main/70 cursor-pointer">
                <input
                  type="checkbox"
                  className="accent-brand-rose-deep"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                Remember me
              </label>
              <a href="#" className="text-brand-rose-deep font-medium hover:underline">Forgot password?</a>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-text-main text-white rounded-full py-3.5 text-sm font-semibold hover:bg-brand-rose-deep transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? <><Loader2 className="size-4 animate-spin" /> Signing in…</> : "Login"}
            </button>
          </form>

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
