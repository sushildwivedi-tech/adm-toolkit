"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Scale, LayoutDashboard, ClipboardCheck } from "lucide-react";

const navItems = [
  {
    href: "/triage",
    label: "Triage (APP 1.7)",
    icon: Scale,
    description: "Determine if ADM obligations apply",
  },
  {
    href: "/dashboard",
    label: "Data Dashboard",
    icon: LayoutDashboard,
    description: "Overview of ADM data practices",
  },
  {
    href: "/vendor-checklist",
    label: "Vendor Checklist",
    icon: ClipboardCheck,
    description: "Assess third-party ADM systems",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 border-r border-border bg-card">
      <div className="flex flex-col gap-1 p-4 pt-6">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Tools
        </p>
        {navItems.map(({ href, label, icon: Icon, description }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "group flex items-start gap-3 rounded-md px-3 py-2.5 text-sm transition-colors",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon
                className={cn(
                  "mt-0.5 h-4 w-4 shrink-0",
                  active ? "text-primary-foreground" : "text-muted-foreground group-hover:text-accent-foreground"
                )}
              />
              <div className="flex flex-col gap-0.5">
                <span className="font-medium leading-none">{label}</span>
                <span
                  className={cn(
                    "text-xs leading-snug",
                    active ? "text-primary-foreground/70" : "text-muted-foreground"
                  )}
                >
                  {description}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
