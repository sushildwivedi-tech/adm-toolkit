import { ClipboardCheck } from "lucide-react";
import { VendorChecklistClient } from "./vendor-checklist-client";

export const metadata = {
  title: "Vendor Checklist · ADM Transparency Toolkit",
};

export default function VendorChecklistPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
          <ClipboardCheck className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            Vendor Checklist
          </h1>
          <p className="text-sm text-muted-foreground">
            Assess third-party ADM systems against OAIC guidance requirements
          </p>
        </div>
      </div>

      <VendorChecklistClient />
    </div>
  );
}
