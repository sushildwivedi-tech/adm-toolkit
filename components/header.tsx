import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card">
      <div className="flex h-16 items-center gap-3 px-6">
        <ShieldCheck className="h-6 w-6 text-primary" />
        <div className="flex flex-col">
          <Link href="/" className="text-base font-semibold leading-tight text-foreground hover:text-primary transition-colors">
            Australian ADM Transparency Toolkit
          </Link>
          <span className="text-xs text-muted-foreground">
            Privacy Act 2024 · ADM Compliance · Effective 10 Dec 2026
          </span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
            BETA
          </span>
        </div>
      </div>
    </header>
  );
}
