import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Search, Globe, Zap, Lock, ArrowRight, BookOpen, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { getHistory } from "@/lib/headerAnalyzer";

const examples = [
  { url: "google.com", label: "Google" },
  { url: "example.com", label: "Example.com" },
  { url: "http://httpforever.com", label: "httpforever.com (vulnérable)" },
];

const tips = [
  { icon: Lock, title: "HSTS + Preload", desc: "Forcez HTTPS partout avec max-age ≥ 1 an, includeSubDomains et preload." },
  { icon: Shield, title: "CSP strict-dynamic", desc: "Utilisez des nonces et strict-dynamic au lieu de 'unsafe-inline'." },
  { icon: Zap, title: "Permissions-Policy", desc: "Restreignez caméra, micro et géoloc aux contextes nécessaires." },
  { icon: Globe, title: "Masquez Server", desc: "Ne révélez jamais la version de votre serveur ou framework." },
];

const Home = () => {
  const [url, setUrl] = useState("");
  const navigate = useNavigate();
  const history = getHistory();

  const handleAnalyze = (targetUrl?: string) => {
    const u = targetUrl || url;
    if (!u.trim()) return;
    navigate(`/analyze?url=${encodeURIComponent(u.trim())}`);
  };

  return (
    <div className="min-h-screen matrix-grid">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-[85vh] px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-3xl w-full"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8">
            <Shield className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Édition 2026</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4">
            <span className="text-glow">HeaderCheck</span>
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground font-medium mb-2">
            Vérifiez la sécurité HTTP de n'importe quel site en 1 clic
          </p>
          <p className="text-sm text-muted-foreground mb-10 max-w-xl mx-auto">
            CSP, HSTS, X-Frame, Permissions-Policy, Referrer-Policy… — Score + Conseils 2026
          </p>

          {/* URL Input */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
                placeholder="example.com"
                className="pl-10 h-12 text-base rounded-xl font-mono"
              />
            </div>
            <Button
              size="lg"
              onClick={() => handleAnalyze()}
              className="h-12 px-8 rounded-xl font-bold gap-2 glow-cyber"
            >
              Analyser <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Examples */}
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            <span className="text-xs text-muted-foreground">Essayez :</span>
            {examples.map((ex) => (
              <button
                key={ex.url}
                onClick={() => handleAnalyze(ex.url)}
                className="text-xs font-mono text-primary hover:underline cursor-pointer bg-primary/5 px-2 py-1 rounded-md"
              >
                {ex.label}
              </button>
            ))}
          </div>

          {/* Stats */}
          <p className="text-xs text-muted-foreground mt-6">
            🔍 Déjà <span className="text-primary font-bold">8 429</span> sites analysés par la communauté
          </p>
        </motion.div>
      </section>

      {/* Tips section */}
      <section id="guide" className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-2 justify-center mb-8">
            <BookOpen className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold">Qu'est-ce qu'un bon header de sécurité ?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tips.map((tip) => (
              <motion.div
                key={tip.title}
                whileHover={{ scale: 1.02 }}
                className="glass rounded-xl p-5 flex gap-4 items-start"
              >
                <div className="p-2 rounded-lg bg-primary/10">
                  <tip.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{tip.title}</h3>
                  <p className="text-sm text-muted-foreground">{tip.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* History */}
      {history.length > 0 && (
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Info className="h-5 w-5 text-primary" /> Historique récent
            </h2>
            <div className="space-y-2">
              {history.slice(0, 5).map((r, i) => (
                <button
                  key={i}
                  onClick={() => handleAnalyze(r.url)}
                  className="w-full glass rounded-lg p-3 flex items-center justify-between hover:bg-secondary/50 transition-colors text-left"
                >
                  <span className="text-sm font-mono truncate">{r.url}</span>
                  <span className={`text-sm font-bold ${r.score >= 70 ? "text-success" : r.score >= 45 ? "text-warning" : "text-destructive"}`}>
                    {r.grade} ({r.score}/100)
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border/50">
        <p>HeaderCheck 2026 — Outil éducatif d'analyse de sécurité HTTP</p>
      </footer>
    </div>
  );
};

export default Home;
