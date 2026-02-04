import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Map,
  Trophy,
  Settings,
  LogOut,
  FileText
} from "lucide-react";
import { useStore } from "@/lib/store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Sidebar() {
  const [location] = useLocation();
  const { user, logout } = useStore();

  const navItems = [
    { href: "/app", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/app/tracks", icon: Map, label: "Tracks" },
    { href: "/app/progress", icon: Trophy, label: "Progress" },
    { href: "/product", icon: FileText, label: "Case Study" },
    { href: "/app/settings", icon: Settings, label: "Settings" },
  ];

  const productLink = (
    <Link
      href="/product"
      className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
      data-testid="link-app-product-case-study"
    >
      Product Case Study
    </Link>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 border-r border-border bg-sidebar text-sidebar-foreground">
        <div className="p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Quick-Wit</p>
              <p className="font-heading font-bold text-xl tracking-tight">Dashboard</p>
            </div>
            <div className="pt-1 hidden lg:block">{productLink}</div>
          </div>
          <div className="mt-3 lg:hidden">{productLink}</div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                data-testid={`link-nav-${item.label.toLowerCase()}`}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 w-full hover:bg-sidebar-accent p-2 rounded-lg transition-colors text-left" data-testid="button-account-menu">
                <Avatar className="w-9 h-9 border border-border">
                  <AvatarImage src={user?.avatar_url ?? undefined} />
                  <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user?.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/app/settings" data-testid="link-account-settings">
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => logout()} data-testid="button-logout">
                <LogOut className="w-4 h-4 mr-2" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full h-16 bg-background border-t border-border flex items-center justify-around z-50 px-2 pb-safe" data-testid="nav-bottom-app">
        {navItems.map((item) => {
          const isActive = location === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              data-testid={`link-bottomnav-${item.label.toLowerCase()}`}
              className={`flex flex-col items-center justify-center p-2 rounded-lg gap-1 ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
