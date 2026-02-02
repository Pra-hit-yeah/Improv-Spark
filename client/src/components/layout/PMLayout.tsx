import { Link, useLocation } from "wouter";
import { Brand } from "@/components/layout/Brand";

const nav = [
  { href: "/product", label: "Product" },
  { href: "/prd", label: "PRD" },
  { href: "/roadmap", label: "Roadmap" },
];

export function PMLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto max-w-[1000px] px-5 sm:px-6 h-16 flex items-center justify-between">
          <Brand href="/product" variant="pm" />

          <nav className="hidden md:flex items-center gap-6">
            {nav.map((item) => {
              const active = location === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <a
                    className={`text-sm font-medium transition-colors ${
                      active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                    data-testid={`link-pm-${item.label.toLowerCase()}`}
                  >
                    {item.label}
                  </a>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/app">
              <a
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-pm-back-to-app"
              >
                Back to App
              </a>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1000px] px-5 sm:px-6 py-12 sm:py-16">
        {children}
      </main>

      <footer className="border-t border-border py-10">
        <div className="mx-auto max-w-[1000px] px-5 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground" data-testid="text-pm-footer">
            Quick-Wit PM portfolio
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link href="/product"><a className="text-muted-foreground hover:text-foreground" data-testid="link-pm-footer-product">Product</a></Link>
            <Link href="/prd"><a className="text-muted-foreground hover:text-foreground" data-testid="link-pm-footer-prd">PRD</a></Link>
            <Link href="/roadmap"><a className="text-muted-foreground hover:text-foreground" data-testid="link-pm-footer-roadmap">Roadmap</a></Link>
            <Link href="/app"><a className="text-muted-foreground hover:text-foreground" data-testid="link-pm-footer-app">Back to App</a></Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
