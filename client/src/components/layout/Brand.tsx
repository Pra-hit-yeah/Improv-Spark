import { Link } from "wouter";

export function Brand({
  href = "/",
  variant = "app",
}: {
  href?: string;
  variant?: "app" | "pm";
}) {
  if (variant === "pm") {
    return (
      <Link href={href}>
        <a className="inline-flex items-baseline gap-2" data-testid="link-brand-pm">
          <span className="font-heading text-lg tracking-tight text-foreground">
            Quick
            <span className="text-foreground/70">-</span>
            <span className="tracking-tight">Wit</span>
          </span>
          <span className="hidden sm:inline-flex font-mono text-[11px] text-muted-foreground">
            QW
          </span>
        </a>
      </Link>
    );
  }

  return (
    <Link href={href}>
      <a className="inline-flex items-center gap-2" data-testid="link-brand-app">
        <span className="font-heading font-bold text-xl tracking-tight">
          Quick
          <span className="text-foreground/60">-</span>
          <span className="text-primary">Wit</span>
        </span>
      </a>
    </Link>
  );
}
