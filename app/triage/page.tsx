import { Scale } from "lucide-react";
import { TriageForm } from "./triage-form";

export const metadata = {
  title: "Triage (APP 1.7) · ADM Transparency Toolkit",
};

export default function TriagePage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
          <Scale className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            Triage (APP 1.7)
          </h1>
          <p className="text-sm text-muted-foreground">
            Determine whether your ADM practices trigger Privacy Act 2024 obligations
          </p>
        </div>
      </div>

      <TriageForm />
    </div>
  );
}
