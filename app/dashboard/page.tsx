import { LayoutDashboard } from "lucide-react";
import { DashboardClient } from "./dashboard-client";

export const metadata = {
  title: "Data Dashboard · ADM Transparency Toolkit",
};

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
          <LayoutDashboard className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            Data Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            ADM systems register — overview of automated decision-making practices and Privacy Act 2024 exposure
          </p>
        </div>
      </div>

      <DashboardClient />
    </div>
  );
}
