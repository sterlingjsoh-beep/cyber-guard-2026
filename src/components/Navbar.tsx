import { Shield, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";

const Navbar = () => {
  const { isDark, toggle } = useTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <Shield className="h-6 w-6 text-primary" />
          <span className="text-glow">PhishQuiz</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Accueil
          </Link>
          <Button variant="ghost" size="icon" onClick={toggle} className="rounded-full">
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
