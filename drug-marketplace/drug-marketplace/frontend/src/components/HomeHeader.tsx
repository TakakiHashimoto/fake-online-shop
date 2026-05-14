import { CircleUserRound, ShoppingCart } from "lucide-react";
import { Link } from "react-router";

function HomeHeader() {
  return (
    <header className="flex justify-between items-center w-full px-margin py-xs sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-secondary-container/30 shadow-[0_4_20px_rgba(208,91,255,0.15)]">
      <div className="flex items-center gap-md">
        <Link
          className="font-headline-md text-headline-md font-black tracking-tighter text-primary-fixed-dim drop-shadow-[0_0_8px_rgba(42,229,0,0.6)]"
          to="/home"
        >
          BreakingBad
        </Link>
        <nav className="hidden md:flex items-center gap-md font-label-mono text-label-mono">
          <Link
            className="text-primary-fixed-dim border-b-2 border-primary-fixed-dim pb-1 active:scale-95 duration-200"
            to="/login"
          >
            Login
          </Link>
          <Link
            className="text-on-surface-variant hover:text-primary-fixed hover:drop-shadow-[0_0_5px_rgba(42,229,0,0.5)] transition-all active:scale-95 duration-200"
            to="/register"
          >
            Register
          </Link>
          <Link
            className="text-on-surface-variant hover:text-primary-fixed hover:drop-shadow-[0_0_5px_rgba(42,229,0,0.5)] transition-all active:scale-95 duration-200"
            to="/home"
          >
            Auctions
          </Link>
          <Link
            className="text-on-surface-variant hover:text-primary-fixed hover:drop-shadow-[0_0_5px_rgba(42,229,0,0.5)] transition-all active:scale-95 duration-200"
            to="#"
          >
            Forum
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-sm">
        <div className="flex items-center gap-xs">
          <button className="p-xs text-on-surface-variant hover:text-primary-fixed-dim hover:drop-shadow-[0_0_5px_rgba(42,229,0,0.5)] transition-all active:scale-95">
            <ShoppingCart className="material-symbols-outlined" />
          </button>
          <button className="p-xs text-on-surface-variant hover:text-primary-fixed-dim hover:drop-shadow-[0_0_5px_rgba(42,229,0,0.5)] transition-all active:scale-95">
            <CircleUserRound className="material-symbols-outlined" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default HomeHeader;
