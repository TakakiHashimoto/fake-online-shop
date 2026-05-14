import { useState } from "react";
import useAuth from "../features/auth/useAuth";
import { Link, useNavigate } from "react-router";
import { FingerprintPattern, KeyRound, Mail, UserRoundPen } from "lucide-react";

type RoleType = "customer" | "seller";

function SignupPage() {
  const { register } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [role, setRole] = useState<RoleType>("customer");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const navigate = useNavigate();

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    try {
      setIsSubmitting(true);
      await register({ role, email, password, username });
      navigate("/home");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to sign you up");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <div className="fixed inset-0 z-[-1] opacity-20">
        <img
          alt=""
          className="w-full h-full object-cover grayscale"
          data-alt="A cinematic, wide shot of a high-tech server room with glowing green status lights reflecting off polished dark floors. The atmosphere is dense with digital fog and intricate cable management. Cyberpunk aesthetic with deep charcoal shadows and vibrant toxic green highlights. Intricate architectural lines suggest a high-security encrypted facility. The mood is mysterious and advanced."
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8yQxyA4dXR-xzxkgxM2obzgxg5PcrilMMNaV1dH3ZrJspvf2sDViQ88i0JNfUBrMKSIxHUiu3nePKJa_9kfXnnchpO-xfFyTUrJ2RgEN7KbpuXjWLMXqMG0R3m3QihRt_JX1KI1O5PG9wMENDvi3GT17wDKI-xSiOohZpL_D_cgLkkAafym9n9MhWlXsOt1pEnEmVDhI20gKDqyD4ojtyoJAobIHRonZtHOC4hCmnlTDn_pRIZrVyUrDCrOgcEk471OroC0ZgHXo"
        />
      </div>
      <main className="grow flex flex-col items-center justify-center p-margin relative overflow-hidden">
        <div className="scanline"></div>
        <header className="mb-xl text-center">
          <h1 className="font-headline-md text-headline-md font-black tracking-tighter text-primary-fixed-dim drop-shadow-[0_0_8px_rgba(42,229,0,0.6)] glitch-subtle">
            SHADOWCART
          </h1>
          <p className="font-label-mono text-label-mono text-on-surface-variant mt-xs tracking-[0.2em]">
            IDENTITY_CREATION // REGISTER
          </p>
        </header>
        <form
          className="w-full max-w-120 cyber-glass rounded-xl overflow-hidden relative group"
          onSubmit={handleSubmit}
        >
          <div className="p-lg space-y-lg">
            <div className="space-y-sm">
              <label className="font-label-mono text-label-mono text-on-surface-variant uppercase text-[10px] tracking-widest">
                Select Operational Identity
              </label>
              <div className="grid grid-cols-2 gap-sm">
                <button
                  className={`flex items-center justify-center gap-xs p-sm border ${role === "customer" ? "border-primary-fixed-dim bg-primary-fixed-dim/10 text-primary-fixed-dim" : "border-outline-variant hover:border-secondary text-on-surface-variant hover:text-secondary"}  rounded-lg font-label-mono text-label-mono transition-all active:scale-95`}
                  type="button"
                  onClick={() => setRole("customer")}
                >
                  <span
                    className="material-symbols-outlined text-[18px]"
                    data-icon="person"
                  >
                    person
                  </span>
                  Customer
                </button>
                <button
                  className={`flex items-center justify-center gap-xs p-sm border ${role === "seller" ? "border-primary-fixed-dim bg-primary-fixed-dim/10 text-primary-fixed-dim" : "border-outline-variant hover:border-secondary text-on-surface-variant hover:text-secondary"} rounded-lg font-label-mono text-label-mono transition-all active:scale-95`}
                  type="button"
                  onClick={() => setRole("seller")}
                >
                  <span
                    className="material-symbols-outlined text-[18px]"
                    data-icon="storefront"
                  >
                    storefront
                  </span>
                  Seller
                </button>
              </div>
            </div>
            <div className="space-y-md">
              <div className="space-y-xs">
                <label
                  className="font-label-mono text-label-mono text-on-surface-variant uppercase text-[10px] tracking-widest"
                  htmlFor="email"
                >
                  Network Handle / Email
                </label>
                <div className="relative">
                  <input
                    id="email"
                    className="w-full bg-surface-container-lowest border border-outline-variant/40 focus:border-primary-fixed-dim focus:ring-1 focus:ring-primary-fixed-dim text-on-surface font-code-sm px-md py-sm rounded-lg placeholder:text-on-surface-variant/30 outline-none transition-all"
                    placeholder="example@gmail.com"
                    type="email"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setEmail(e.target.value)
                    }
                  />
                  <Mail className="absolute right-md top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant/40 text-[18px]" />
                </div>
              </div>
              <div className="space-y-xs">
                <label
                  className="font-label-mono text-label-mono text-on-surface-variant uppercase text-[10px] tracking-widest"
                  htmlFor="password"
                >
                  Encrypted Pass-key
                </label>
                <div className="relative">
                  <input
                    className="w-full bg-surface-container-lowest border border-outline-variant/40 focus:border-primary-fixed-dim focus:ring-1 focus:ring-primary-fixed-dim text-on-surface font-code-sm px-md py-sm rounded-lg placeholder:text-on-surface-variant/30 outline-none transition-all"
                    placeholder="••••••••••••"
                    type="password"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setPassword(e.target.value)
                    }
                    id="password"
                  />
                  <KeyRound className="absolute right-md top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant/40 text-[18px]" />
                </div>
              </div>
              <div className="space-y-xs">
                <label
                  className="font-label-mono text-label-mono text-on-surface-variant uppercase text-[10px] tracking-widest"
                  htmlFor="username"
                >
                  username
                </label>
                <div className="relative">
                  <input
                    id="username"
                    className="w-full bg-surface-container-lowest border border-outline-variant/40 focus:border-primary-fixed-dim focus:ring-1 focus:ring-primary-fixed-dim text-on-surface font-code-sm px-md py-sm rounded-lg placeholder:text-on-surface-variant/30 outline-none transition-all"
                    placeholder="your username"
                    type="text"
                    value={username}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setUsername(e.target.value)
                    }
                  />
                  <UserRoundPen className="absolute right-md top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant/40 text-[18px]" />
                </div>
              </div>
            </div>
            {error && (
              <p className="rounded-lg border border-error/30 bg-error-container/30 px-md py-sm font-code-sm text-error">
                {error}
              </p>
            )}
            <button
              type="submit"
              className="w-full bg-primary-fixed-dim text-on-primary font-headline-md text-[18px] py-md rounded-lg font-black tracking-tight neon-glow transition-all active:scale-95 hover:brightness-110 flex items-center justify-center gap-sm"
              disabled={isSubmitting}
            >
              CREATE IDENTITY
              <FingerprintPattern className="material-symbols-outlined" />
            </button>
          </div>
        </form>
        <p className="mt-lg font-code-sm text-code-sm text-on-surface-variant/60 max-w-sm text-center">
          ALREADY PART OF THE VOID?
          <Link
            to={"/login"}
            className="text-primary-fixed-dim hover:underline cursor-pointer ml-1"
          >
            INITIATE_LOGIN.
          </Link>
        </p>
      </main>
    </div>
  );
}

export default SignupPage;
