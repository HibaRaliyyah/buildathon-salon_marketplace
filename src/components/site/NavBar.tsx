import { Link } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { LogOut, User } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/explore", label: "Explore" },
  { to: "/ai-consultant", label: "AI Consultant" },
  { to: "/offers", label: "Offers" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function NavBar() {
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full px-4 sm:px-6 pt-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass-panel rounded-2xl px-5 py-3">
        <Link to="/" className="font-serif text-2xl font-bold tracking-tight text-brand-rose-deep">
          Glow<span className="text-text-main">AI</span>
        </Link>
        <div className="hidden lg:flex items-center gap-7 text-sm font-medium text-text-main/70">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="hover:text-brand-rose-deep transition-colors"
              activeProps={{ className: "text-brand-rose-deep" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          {isLoggedIn && user ? (
            <>
              <Link
                to="/dashboard"
                className="hidden sm:flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-full hover:bg-brand-rose/10 transition-colors"
              >
                <User className="size-4 text-brand-rose-deep" />
                <span className="text-brand-rose-deep font-semibold">{user.username}</span>
              </Link>
              <button
                onClick={logout}
                className="flex items-center gap-1.5 text-sm font-medium px-4 py-2.5 rounded-full border border-text-main/10 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
                title="Logout"
              >
                <LogOut className="size-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium px-3 py-2 hover:opacity-70 transition-opacity"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-sm font-medium bg-text-main text-white px-4 sm:px-5 py-2.5 rounded-full hover:scale-[1.02] transition-transform"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
