import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { QrCode, LayoutDashboard, Camera, Plus } from "lucide-react";

export default function Header() {
  const [location] = useLocation();

  const navItems = [
    { path: "/", label: "New Asset", icon: Plus },
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  ];

  return (
    <header className="border-b border-border bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary text-primary-foreground">
              <QrCode className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">IT Asset Buyback Manager</h1>
            </div>
          </div>

          <nav className="hidden md:flex gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.path;
              return (
                <Link key={item.path} href={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={isActive ? "toggle-elevate toggle-elevated" : ""}
                    data-testid={`link-${item.label.toLowerCase().replace(" ", "-")}`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </nav>

          <nav className="md:hidden flex gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.path;
              return (
                <Link key={item.path} href={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="icon"
                    className={isActive ? "toggle-elevate toggle-elevated" : ""}
                    data-testid={`link-mobile-${item.label.toLowerCase().replace(" ", "-")}`}
                  >
                    <Icon className="h-5 w-5" />
                  </Button>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
