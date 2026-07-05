"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertTriangle, RotateCcw } from "lucide-react";

type YesNo = "yes" | "no" | null;

const MATERIALITY_DOMAINS = [
  { id: "housing", label: "Housing" },
  { id: "employment", label: "Employment" },
  { id: "credit", label: "Financial Credit / Insurance" },
  { id: "services", label: "Access to significant services" },
  { id: "contractual", label: "Contractual rights" },
  { id: "other", label: "Other" },
];

function StepBadge({ n }: { n: number }) {
  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
      {n}
    </span>
  );
}

function YesNoRadio({
  name,
  value,
  onChange,
}: {
  name: string;
  value: YesNo;
  onChange: (v: YesNo) => void;
}) {
  return (
    <RadioGroup
      value={value ?? ""}
      onValueChange={(v) => onChange(v as YesNo)}
      className="flex gap-6"
    >
      <div className="flex items-center gap-2">
        <RadioGroupItem value="yes" id={`${name}-yes`} />
        <Label htmlFor={`${name}-yes`}>Yes</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="no" id={`${name}-no`} />
        <Label htmlFor={`${name}-no`}>No</Label>
      </div>
    </RadioGroup>
  );
}

export function TriageForm() {
  const [processesPI, setProcessesPI] = useState<YesNo>(null);
  const [soleDecision, setSoleDecision] = useState<YesNo>(null);
  const [substantiallyRelated, setSubstantiallyRelated] = useState<YesNo>(null);
  const [selectedDomains, setSelectedDomains] = useState<Set<string>>(new Set());

  const step1Stop = processesPI === "no";
  const showStep2 = processesPI === "yes";
  const step2Stop = showStep2 && soleDecision === "no" && substantiallyRelated === "no";
  const showStep3 = showStep2 && (soleDecision === "yes" || substantiallyRelated === "yes");
  const isInScope = showStep3 && selectedDomains.size > 0;

  function toggleDomain(id: string) {
    setSelectedDomains((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function reset() {
    setProcessesPI(null);
    setSoleDecision(null);
    setSubstantiallyRelated(null);
    setSelectedDomains(new Set());
  }

  return (
    <div className="space-y-5">
      {/* ── Step 1 ────────────────────────────────────────────── */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <StepBadge n={1} />
            <CardTitle className="text-base">Data Processing</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm font-medium">
            Does this system process Personal Information?
          </p>
          <YesNoRadio
            name="pi"
            value={processesPI}
            onChange={(v) => {
              setProcessesPI(v);
              setSoleDecision(null);
              setSubstantiallyRelated(null);
              setSelectedDomains(new Set());
            }}
          />
          {step1Stop && (
            <Alert className="border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950">
              <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
              <AlertTitle className="text-green-800 dark:text-green-300">Stop</AlertTitle>
              <AlertDescription className="text-green-700 dark:text-green-400">
                ADM transparency obligations do not apply.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* ── Step 2 ────────────────────────────────────────────── */}
      {showStep2 && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <StepBadge n={2} />
              <CardTitle className="text-base">Decision Making (APP 1.7)</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <p className="text-sm font-medium">
                A. Does the system make a decision solely on its own?
              </p>
              <YesNoRadio
                name="sd"
                value={soleDecision}
                onChange={(v) => {
                  setSoleDecision(v);
                  setSelectedDomains(new Set());
                }}
              />
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium">
                B. Does the system perform a task substantially and directly
                related to making a decision?
              </p>
              <YesNoRadio
                name="sr"
                value={substantiallyRelated}
                onChange={(v) => {
                  setSubstantiallyRelated(v);
                  setSelectedDomains(new Set());
                }}
              />
            </div>

            {step2Stop && (
              <Alert className="border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950">
                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                <AlertTitle className="text-green-800 dark:text-green-300">Stop</AlertTitle>
                <AlertDescription className="text-green-700 dark:text-green-400">
                  Not an ADM system under APP 1.7.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      {/* ── Step 3 ────────────────────────────────────────────── */}
      {showStep3 && (
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <StepBadge n={3} />
              <CardTitle className="text-base">Materiality Test (APP 1.9)</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm font-medium">
              Could this decision reasonably be expected to significantly affect
              the rights or interests of an individual?
            </p>
            <p className="text-xs text-muted-foreground">
              Select all categories that apply.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {MATERIALITY_DOMAINS.map(({ id, label }) => (
                <div key={id} className="flex items-center gap-2">
                  <Checkbox
                    id={id}
                    checked={selectedDomains.has(id)}
                    onCheckedChange={() => toggleDomain(id)}
                  />
                  <Label htmlFor={id} className="cursor-pointer text-sm font-normal">
                    {label}
                  </Label>
                </div>
              ))}
            </div>

            {isInScope && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Status: IN-SCOPE</AlertTitle>
                <AlertDescription>
                  This system triggers ADM transparency obligations under the
                  Privacy Act 2024.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      {/* ── Reset ─────────────────────────────────────────────── */}
      {processesPI !== null && (
        <div className="flex justify-end">
          <Button variant="outline" size="sm" onClick={reset}>
            <RotateCcw className="mr-2 h-3.5 w-3.5" />
            Start over
          </Button>
        </div>
      )}
    </div>
  );
}
