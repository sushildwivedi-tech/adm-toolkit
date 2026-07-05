import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Scale, LayoutDashboard, ClipboardCheck, AlertTriangle } from "lucide-react";

const tools = [
  {
    href: "/triage",
    icon: Scale,
    title: "Triage (APP 1.7)",
    description:
      "Answer guided questions to determine whether your organisation's automated decision-making falls within the Privacy Act 2024 ADM obligations.",
  },
  {
    href: "/dashboard",
    icon: LayoutDashboard,
    title: "Data Dashboard",
    description:
      "Visualise and manage your organisation's ADM data practices, transparency statements, and compliance status at a glance.",
  },
  {
    href: "/vendor-checklist",
    icon: ClipboardCheck,
    title: "Vendor Checklist",
    description:
      "Evaluate third-party and contracted ADM systems against OAIC guidance requirements before procurement or renewal.",
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Welcome to the ADM Transparency Toolkit
        </h1>
        <p className="text-muted-foreground">
          A practical compliance toolkit for Australian organisations preparing
          for the{" "}
          <span className="font-medium text-foreground">
            Privacy Act 2024
          </span>{" "}
          automated decision-making (ADM) amendments, taking effect{" "}
          <span className="font-medium text-foreground">10 December 2026</span>.
        </p>
      </div>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Compliance deadline approaching</AlertTitle>
        <AlertDescription>
          ADM transparency obligations under APP 1.7 take effect on{" "}
          <strong>10 December 2026</strong>. Organisations should begin
          assessing and documenting their ADM practices now.
        </AlertDescription>
      </Alert>

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3">
        {tools.map(({ href, icon: Icon, title, description }) => (
          <Card key={href} className="flex flex-col">
            <CardHeader className="pb-3">
              <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-md bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-base">{title}</CardTitle>
              <CardDescription className="text-sm">{description}</CardDescription>
            </CardHeader>
            <CardContent className="mt-auto pt-0">
              <Button asChild size="sm" className="w-full">
                <Link href={href}>Open tool</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="rounded-lg border border-border bg-muted/40 p-4 text-xs text-muted-foreground">
        <strong className="text-foreground">Disclaimer:</strong> This toolkit
        is built for guidance purposes in accordance with OAIC guidance and the
        Privacy Act 2024. It does not constitute legal advice. Consult a
        qualified privacy professional for advice specific to your organisation.
      </div>
    </div>
  );
}
