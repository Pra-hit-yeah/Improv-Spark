import { Badge } from "@/components/ui/badge";

export function PMPage({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-10" data-testid="pm-page">
      <header className="space-y-4" data-testid="pm-header">
        {eyebrow ? (
          <Badge
            variant="outline"
            className="border-border text-muted-foreground bg-background"
            data-testid="pm-eyebrow"
          >
            {eyebrow}
          </Badge>
        ) : null}
        <h1 className="pm-h1" data-testid="pm-title">
          {title}
        </h1>
        {subtitle ? (
          <p className="pm-lede" data-testid="pm-subtitle">
            {subtitle}
          </p>
        ) : null}
      </header>
      <div className="pm-prose" data-testid="pm-body">
        {children}
      </div>
    </div>
  );
}
