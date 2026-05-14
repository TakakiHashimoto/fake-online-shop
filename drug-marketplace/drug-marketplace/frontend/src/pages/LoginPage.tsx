import { useState } from "react";
import useAuth from "../features/auth/useAuth";
import { useNavigate } from "react-router";
import { KeyRound, Mail } from "lucide-react";

function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await login({ email, password });
      navigate("/home");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to log you in");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-background p-margin text-on-background">
      <div className="fixed inset-0 z-[-2] opacity-20">
        <img
          alt=""
          className="h-full w-full object-cover grayscale"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8yQxyA4dXR-xzxkgxM2obzgxg5PcrilMMNaV1dH3ZrJspvf2sDViQ88i0JNfUBrMKSIxHUiu3nePKJa_9kfXnnchpO-xfFyTUrJ2RgEN7KbpuXjWLMXqMG0R3m3QihRt_JX1KI1O5PG9wMENDvi3GT17wDKI-xSiOohZpL_D_cgLkkAafym9n9MhWlXsOt1pEnEmVDhI20gKDqyD4ojtyoJAobIHRonZtHOC4hCmnlTDn_pRIZrVyUrDCrOgcEk471OroC0ZgHXo"
        />
      </div>
      <div className="fixed inset-0 z-[-1] bg-[radial-gradient(circle_at_center,rgba(42,229,0,0.12),transparent_45%),linear-gradient(180deg,rgba(19,19,20,0.55),#131314_85%)]" />

      <div className="scanline" />

      <header className="mb-xl text-center">
        <p className="font-label-mono text-label-mono tracking-[0.35em] text-on-surface-variant">
          BreakingBad
        </p>
        <h1 className="glitch-subtle mt-xs font-headline-lg-mobile text-headline-lg-mobile text-primary-fixed-dim drop-shadow-[0_0_8px_rgba(42,229,0,0.6)] sm:font-headline-lg sm:text-headline-lg">
          ACCESS PORTAL
        </h1>
        <p className="mt-xs font-label-mono text-[10px] uppercase tracking-[0.2em] text-on-surface-variant sm:text-label-mono">
          Authorized entities only - initiate handshake
        </p>
      </header>

      <form
        className="cyber-glass group relative w-full max-w-120 overflow-hidden rounded-xl"
        onSubmit={handleSubmit}
      >
        <div className="border-b border-outline-variant/30 px-lg py-md">
          <h2 className="font-label-mono text-label-mono tracking-widest text-primary-fixed-dim">
            ACCESS_PORTAL // LOGIN
          </h2>
        </div>

        <div className="space-y-lg p-lg">
          <div className="space-y-md">
            <div className="space-y-xs">
              <label
                className="font-label-mono text-[10px] uppercase tracking-widest text-on-surface-variant"
                htmlFor="email"
              >
                Network Handle / Email
              </label>
              <div className="relative">
                <input
                  className="w-full rounded-lg border border-outline-variant/40 bg-surface-container-lowest px-md py-sm font-code-sm text-on-surface outline-none transition-all placeholder:text-on-surface-variant/30 focus:border-primary-fixed-dim focus:ring-1 focus:ring-primary-fixed-dim"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="DREAD_PIRATE_7..."
                  type="email"
                  value={email}
                />
                <span className="absolute right-md top-1/2 -translate-y-1/2 text-[18px] text-on-surface-variant/40">
                  <Mail />
                </span>
              </div>
            </div>

            <div className="space-y-xs">
              <label
                className="font-label-mono text-[10px] uppercase tracking-widest text-on-surface-variant"
                htmlFor="password"
              >
                Encrypted Pass-key
              </label>
              <div className="relative">
                <input
                  className="w-full rounded-lg border border-outline-variant/40 bg-surface-container-lowest px-md py-sm font-code-sm text-on-surface outline-none transition-all placeholder:text-on-surface-variant/30 focus:border-primary-fixed-dim focus:ring-1 focus:ring-primary-fixed-dim"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="************"
                  type="password"
                  value={password}
                />
                <span className="absolute right-md top-1/2 -translate-y-1/2 text-[18px] text-on-surface-variant/40">
                  <KeyRound />
                </span>
              </div>
            </div>
          </div>

          {error && (
            <p className="rounded-lg border border-error/30 bg-error-container/30 px-md py-sm font-code-sm text-error">
              {error}
            </p>
          )}

          <button
            className="neon-glow flex w-full items-center justify-center gap-sm rounded-lg bg-primary-fixed-dim py-md font-headline-md text-[18px] font-black tracking-tight text-on-primary transition-all hover:brightness-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? "CONNECTING..." : "ESTABLISH CONNECTION"}
            <span aria-hidden="true">KEY</span>
          </button>
        </div>
      </form>
    </main>
  );
}

export default LoginPage;
