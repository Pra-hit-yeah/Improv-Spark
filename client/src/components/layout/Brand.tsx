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
        <span className="inline-flex items-center gap-2 cursor-pointer" data-testid="link-brand-pm">
          <img src="/logo.png" alt="Quick-Wit" className="h-20 w-auto object-contain" />
        </span>
      </Link>
    );
  }

  return (
    <Link href={href}>
      <span className="inline-flex items-center gap-2 cursor-pointer" data-testid="link-brand-app">
        <img src="/logo.png" alt="Quick-Wit" className="h-24 w-auto object-contain" />
      </span>
    </Link>
  );
}
