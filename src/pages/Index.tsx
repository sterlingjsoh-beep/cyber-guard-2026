import { Shield, Zap, BookOpen, Users, ArrowRight, AlertTriangle, Lock, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const stats = [
  { icon: Users, label: "People trained", value: "12,847" },
  { icon: AlertTriangle, label: "Scams simulated", value: "10" },
  { icon: Lock, label: "Techniques covered", value: "2026" },
];

const tips = [
  { icon: Eye, title: "Check the sender", desc: "A suspicious domain = immediate danger" },
  { icon: AlertTriangle, title: "Beware of urgency", desc: "Scammers want you to act fast" },
  { icon: Lock, title: "Never share your passwords", desc: "No legitimate service will ask for them" },
  { icon: Zap, title: "Enable MFA everywhere", desc: "Double protection = double security" },
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
            <span className="text-sm font-medium text-muted-foreground">2026 Edition</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-6">
            <span className="text-glow">PhishQuiz</span>
            <br />
            <span className="text-muted-foreground text-2xl sm:text-3xl lg:text-4xl font-medium">
              Test your anti-scam reflexes
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Learn to spot phishing, smishing, vishing, and 
            <span className="text-primary font-semibold"> AI-powered scams</span> while having fun.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/quiz">
              <Button size="lg" className="text-lg px-8 py-6 glow-cyber rounded-xl font-bold gap-2 w-full sm:w-auto">
                Start the Quiz <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <a href="#tips">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 rounded-xl font-medium gap-2 w-full sm:w-auto">
                <BookOpen className="h-5 w-5" /> Quick Tips
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
            ⚡ Quick Anti-Phishing Tips
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
        <p>PhishQuiz 2026 — Educational cybersecurity awareness project</p>
      </footer>
    </div>
  );
};

export default Index;
