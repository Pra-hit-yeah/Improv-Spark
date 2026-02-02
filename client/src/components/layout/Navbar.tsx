import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { Brand } from "@/components/layout/Brand";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const { isAuthenticated } = useStore();

  const isAuthPage = location === "/login" || location === "/signup";
  const isPMPage = location === "/product" || location === "/prd" || location === "/roadmap";
  if (isAuthPage || isPMPage) return null;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Brand href="/" variant="app" />

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/#how-it-works"><a className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" data-testid="link-nav-how-it-works">How it works</a></Link>
          <Link href="/tracks"><a className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" data-testid="link-nav-tracks">Tracks</a></Link>
          <Link href="/#pricing"><a className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" data-testid="link-nav-pricing">Pricing</a></Link>
          
          <div className="flex items-center gap-4 ml-4">
            {isAuthenticated ? (
               <Link href="/app">
                <Button asChild>
                  <a data-testid="link-dashboard">Dashboard</a>
                </Button>
               </Link>
            ) : (
              <>
                <Link href="/login">
                  <a className="text-sm font-medium text-foreground hover:text-primary transition-colors" data-testid="link-login">
                    Log in
                  </a>
                </Link>
                <Link href="/signup">
                  <Button asChild>
                    <a data-testid="link-start-free">Start Free</a>
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background p-4 flex flex-col gap-4 animate-in slide-in-from-top-5">
          <Link href="/#how-it-works"><a className="text-sm font-medium p-2" onClick={() => setIsOpen(false)} data-testid="link-mobile-how-it-works">How it works</a></Link>
          <Link href="/tracks"><a className="text-sm font-medium p-2" onClick={() => setIsOpen(false)} data-testid="link-mobile-tracks">Tracks</a></Link>
          <div className="h-px bg-border my-2" />
          <Link href="/login">
            <Button asChild variant="outline" className="w-full justify-start" onClick={() => setIsOpen(false)}>
              <a data-testid="link-mobile-login">Log in</a>
            </Button>
          </Link>
          <Link href="/signup">
            <Button asChild className="w-full justify-start" onClick={() => setIsOpen(false)}>
              <a data-testid="link-mobile-start-free">Start Free</a>
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
