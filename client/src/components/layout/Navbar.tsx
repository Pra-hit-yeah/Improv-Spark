import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sparkles, Menu, X } from "lucide-react";
import { useState } from "react";
import { useStore } from "@/lib/store";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const { isAuthenticated } = useStore();

  const isAuthPage = location === "/login" || location === "/signup";
  if (isAuthPage) return null;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <a className="flex items-center gap-2 group">
            <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <span className="font-heading font-bold text-xl tracking-tight text-foreground">
              Quick-Wit
            </span>
          </a>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/#how-it-works"><a className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">How it works</a></Link>
          <Link href="/tracks"><a className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Tracks</a></Link>
          <Link href="/#pricing"><a className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Pricing</a></Link>
          
          <div className="flex items-center gap-4 ml-4">
            {isAuthenticated ? (
               <Link href="/app">
                <Button>Dashboard</Button>
               </Link>
            ) : (
              <>
                <Link href="/login">
                  <a className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                    Log in
                  </a>
                </Link>
                <Link href="/signup">
                  <Button>Start Free</Button>
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
          <Link href="/#how-it-works"><a className="text-sm font-medium p-2" onClick={() => setIsOpen(false)}>How it works</a></Link>
          <Link href="/tracks"><a className="text-sm font-medium p-2" onClick={() => setIsOpen(false)}>Tracks</a></Link>
          <div className="h-px bg-border my-2" />
          <Link href="/login"><Button variant="outline" className="w-full justify-start" onClick={() => setIsOpen(false)}>Log in</Button></Link>
          <Link href="/signup"><Button className="w-full justify-start" onClick={() => setIsOpen(false)}>Start Free</Button></Link>
        </div>
      )}
    </nav>
  );
}
