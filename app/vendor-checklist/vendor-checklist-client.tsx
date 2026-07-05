"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Printer, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const CHECKLIST_ITEMS = [
  {
    id: "documentation",
    label:
      "Vendor provides technical documentation detailing categories of personal information processed.",
  },
  {
    id: "decision-types",
    label:
      "Vendor documents the types of decisions the system makes (solely automated vs. human-assisted).",
  },
  {
    id: "override",
    label:
      "Platform UI allows staff to meaningfully override the AI's recommendation.",
  },
  {
    id: "notification",
    label:
      "Contract requires vendor to notify us of significant algorithm updates.",
  },
] as const;

const TOTAL = CHECKLIST_ITEMS.length;

export function VendorChecklistClient() {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const completed = checked.size;
  const allDone = completed === TOTAL;
  const pct = Math.round((completed / TOTAL) * 100);

  return (
    <div className="space-y-5">
      {/* ── Legal liability notice ──────────────────────────── */}
      <Alert className="border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950">
        <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
        <AlertTitle className="text-amber-800 dark:text-amber-300">Notice: Liability remains with your organisation</AlertTitle>
        <AlertDescription className="text-amber-700 dark:text-amber-400">
          Under the Privacy Act reforms, the entity that arranges for the
          computer program holds the transparency obligation.{" "}
          <strong>Buying third-party AI does not outsource your legal liability.</strong>
        </AlertDescription>
      </Alert>

      {/* ── Checklist card ──────────────────────────────────── */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between gap-4">
            <CardTitle className="text-base">Procurement Due Diligence</CardTitle>
            <span
              className={cn(
                "shrink-0 text-sm font-semibold tabular-nums",
                allDone ? "text-green-600 dark:text-green-400" : "text-muted-foreground"
              )}
            >
              {completed}/{TOTAL} Completed
            </span>
          </div>

          {/* Progress bar */}
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-300",
                allDone ? "bg-green-500" : "bg-primary"
              )}
              style={{ width: `${pct}%` }}
            />
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {CHECKLIST_ITEMS.map(({ id, label }) => {
            const isChecked = checked.has(id);
            return (
              <div
                key={id}
                className={cn(
                  "flex items-start gap-3 rounded-md border p-3 transition-colors",
                  isChecked
                    ? "border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/40"
                    : "border-border bg-card"
                )}
              >
                <Checkbox
                  id={id}
                  checked={isChecked}
                  onCheckedChange={() => toggle(id)}
                  className="mt-0.5 shrink-0"
                />
                <Label
                  htmlFor={id}
                  className={cn(
                    "cursor-pointer text-sm leading-snug",
                    isChecked
                      ? "text-green-800 line-through decoration-green-400 dark:text-green-300"
                      : "font-normal text-foreground"
                  )}
                >
                  {label}
                </Label>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* ── Completion state ────────────────────────────────── */}
      {allDone && (
        <div className="space-y-4">
          <Alert className="border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950">
            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
            <AlertTitle className="text-green-800 dark:text-green-300">
              All requirements met
            </AlertTitle>
            <AlertDescription className="text-green-700 dark:text-green-400">
              This vendor meets the due diligence requirements for ADM system
              procurement under the Privacy Act 2024. Generate a procurement
              report for your records.
            </AlertDescription>
          </Alert>

          <div className="flex justify-end">
            <Button onClick={() => window.print()}>
              <Printer className="mr-2 h-4 w-4" />
              Generate Procurement Report
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
