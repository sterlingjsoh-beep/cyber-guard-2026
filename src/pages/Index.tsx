import { Shield, Zap, BookOpen, Users, ArrowRight, AlertTriangle, Lock, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const stats = [
  { icon: Users, label: "Personnes formées", value: "12 847" },
  { icon: AlertTriangle, label: "Arnaques simulées", value: "10" },
  { icon: Lock, label: "Techniques couvertes", value: "2026" },
];

const tips = [
  { icon: Eye, title: "Vérifiez l'expéditeur", desc: "Un domaine suspect = danger immédiat" },
  { icon: AlertTriangle, title: "Méfiez-vous de l'urgence", desc: "Les escrocs veulent vous faire agir vite" },
  { icon: Lock, title: "Ne partagez jamais vos mots de passe", desc: "Aucun service légitime ne les demande" },
  { icon: Zap, title: "Activez le MFA partout", desc: "Double protection = double sécurité" },
];

const Index = () => {
  return (
    <div className="min-h-screen matrix-grid">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-[90vh] px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8">
            <Shield className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Édition 2026</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-6">
            <span className="text-glow">PhishQuiz</span>
            <br />
            <span className="text-muted-foreground text-2xl sm:text-3xl lg:text-4xl font-medium">
              Testez vos réflexes anti-arnaque
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Apprenez à repérer le phishing, le smishing, le vishing et les 
            <span className="text-primary font-semibold"> arnaques par IA</span> en vous amusant.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/quiz">
              <Button size="lg" className="text-lg px-8 py-6 glow-cyber rounded-xl font-bold gap-2 w-full sm:w-auto">
                Lancer le Quiz <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <a href="#tips">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 rounded-xl font-medium gap-2 w-full sm:w-auto">
                <BookOpen className="h-5 w-5" /> Conseils rapides
              </Button>
            </a>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16 w-full max-w-2xl"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="glass rounded-xl p-4 text-center">
              <stat.icon className="h-5 w-5 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Tips */}
      <section id="tips" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            ⚡ Conseils rapides anti-phishing
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tips.map((tip) => (
              <motion.div
                key={tip.title}
                whileHover={{ scale: 1.02 }}
                className="glass rounded-xl p-6 flex gap-4 items-start"
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

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border/50">
        <p>PhishQuiz 2026 — Projet éducatif de sensibilisation à la cybersécurité</p>
      </footer>
    </div>
  );
};

export default Index;
