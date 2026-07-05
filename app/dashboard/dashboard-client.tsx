"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";

type AdmSystem = {
  name: string;
  department: string;
  piCategories: string[];
  solelyAutomated: boolean;
  substantiallyAssisted: boolean;
  materialImpact: boolean;
};

const ADM_SYSTEMS: AdmSystem[] = [
  {
    name: "AI Resume Screener",
    department: "HR & Talent Acquisition",
    piCategories: ["Name", "Employment history", "Education records", "Contact details"],
    solelyAutomated: true,
    substantiallyAssisted: true,
    materialImpact: true,
  },
  {
    name: "Dynamic Pricing Engine",
    department: "Revenue & Pricing",
    piCategories: ["Purchase history", "Location data", "Device identifiers", "Behavioural data"],
    solelyAutomated: true,
    substantiallyAssisted: false,
    materialImpact: true,
  },
  {
    name: "Credit-Scoring Algorithm",
    department: "Credit Risk & Finance",
    piCategories: ["Financial records", "Credit history", "Income data", "Identity documents"],
    solelyAutomated: false,
    substantiallyAssisted: true,
    materialImpact: true,
  },
];

function csvEscape(value: string): string {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function downloadCSV(data: AdmSystem[]) {
  const headers = [
    "System Name",
    "Department",
    "Categories of Personal Info",
    "Solely Automated Decisions",
    "Substantially Assisted Decisions",
    "Material Impact",
  ];

  const rows = data.map((s) => [
    s.name,
    s.department,
    s.piCategories.join("; "),
    s.solelyAutomated ? "Yes" : "No",
    s.substantiallyAssisted ? "Yes" : "No",
    s.materialImpact ? "Yes" : "No",
  ]);

  const csv = [headers, ...rows]
    .map((row) => row.map(csvEscape).join(","))
    .join("\r\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "adm-systems-register.csv";
  anchor.click();
  URL.revokeObjectURL(url);
}

function YesNoBadge({ value, danger = false }: { value: boolean; danger?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        value && danger
          ? "bg-destructive/10 text-destructive"
          : value
          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
          : "bg-muted text-muted-foreground"
      )}
    >
      {value ? "Yes" : "No"}
    </span>
  );
}

function PiCategoryList({ categories }: { categories: string[] }) {
  return (
    <div className="flex flex-wrap gap-1">
      {categories.map((cat) => (
        <span
          key={cat}
          className="inline-flex items-center rounded-md bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
        >
          {cat}
        </span>
      ))}
    </div>
  );
}

export function DashboardClient() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {ADM_SYSTEMS.length} system{ADM_SYSTEMS.length !== 1 ? "s" : ""} registered &mdash; export for APP 1.8 privacy policy updates
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => downloadCSV(ADM_SYSTEMS)}
        >
          <Download className="mr-2 h-3.5 w-3.5" />
          Download CSV
        </Button>
      </div>

      <div className="rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[160px]">System Name</TableHead>
              <TableHead className="min-w-[160px]">Department</TableHead>
              <TableHead className="min-w-[240px]">Categories of Personal Info</TableHead>
              <TableHead className="min-w-[120px] text-center">
                Solely Automated
              </TableHead>
              <TableHead className="min-w-[140px] text-center">
                Substantially Assisted
              </TableHead>
              <TableHead className="min-w-[120px] text-center">
                Material Impact
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ADM_SYSTEMS.map((system) => (
              <TableRow key={system.name}>
                <TableCell className="font-medium">{system.name}</TableCell>
                <TableCell className="text-muted-foreground">{system.department}</TableCell>
                <TableCell>
                  <PiCategoryList categories={system.piCategories} />
                </TableCell>
                <TableCell className="text-center">
                  <YesNoBadge value={system.solelyAutomated} />
                </TableCell>
                <TableCell className="text-center">
                  <YesNoBadge value={system.substantiallyAssisted} />
                </TableCell>
                <TableCell className="text-center">
                  <YesNoBadge value={system.materialImpact} danger />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <p className="text-xs text-muted-foreground">
        Under APP 1.8, entities must update their privacy policies to disclose ADM practices before 10 December 2026.
        Use the CSV export to share this register with your legal and privacy teams.
      </p>
    </div>
  );
}
