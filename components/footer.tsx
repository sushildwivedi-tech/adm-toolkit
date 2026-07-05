export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="flex flex-col items-center gap-1 px-6 py-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="text-xs text-muted-foreground">
          Built for{" "}
          <span className="font-medium text-foreground">OAIC Guidance</span>{" "}
          &amp;{" "}
          <span className="font-medium text-foreground">Privacy Act 2024 Compliance</span>
        </p>
        <p className="text-xs text-muted-foreground">
          Australian ADM Transparency Toolkit &middot; Not legal advice
        </p>
      </div>
    </footer>
  );
}
