import { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Trophy, RotateCcw, Share2, CheckCircle2, XCircle, Shield, AlertTriangle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { questions as allQuestions } from "@/data/questions";
import confetti from "canvas-confetti";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { results: Array<{ questionId: number; selectedIndex: number | null; correct: boolean }> } | null;

  useEffect(() => {
    if (!state?.results) {
      navigate("/");
    }
  }, [state, navigate]);

  const results = state?.results || [];
  const score = results.filter((r) => r.correct).length;
  const percentage = Math.round((score / allQuestions.length) * 100);

  // Confetti for high scores
  useEffect(() => {
    if (score >= 9) {
      const duration = 3000;
      const end = Date.now() + duration;
      const frame = () => {
        confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors: ["#3b82f6", "#10b981", "#f59e0b"] });
        confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors: ["#3b82f6", "#10b981", "#f59e0b"] });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
    }
  }, [score]);

  const getMessage = () => {
    if (score <= 4) return { icon: AlertTriangle, color: "text-destructive", title: "⚠️ Warning, danger!", desc: "You are very vulnerable to scams. Carefully re-read the explanations and retake the quiz." };
    if (score <= 7) return { icon: Shield, color: "text-warning", title: "🟡 Not bad, but gaps remain", desc: "You have good basics but some modern scams can still trick you." };
    return { icon: Star, color: "text-success", title: "🏆 Cyber warrior!", desc: "Impressive! You can help those around you stay safe. Share your knowledge!" };
  };

  const message = getMessage();

  const handleShare = () => {
    const text = `🛡️ PhishQuiz 2026 — I scored ${score}/10 (${percentage}%) on the anti-phishing quiz! Test your reflexes: ${window.location.origin}`;
    if (navigator.share) {
      navigator.share({ title: "PhishQuiz", text });
    } else {
      navigator.clipboard.writeText(text);
      alert("Link copied to clipboard!");
    }
  };

  if (!state?.results) return null;

  return (
    <div className="min-h-screen matrix-grid pt-20 pb-10 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Score Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="glass rounded-2xl p-8 text-center mb-8"
        >
          <Trophy className="h-12 w-12 text-primary mx-auto mb-4" />
          <h1 className="text-5xl font-black mb-2">
            {score}<span className="text-muted-foreground text-3xl">/{allQuestions.length}</span>
          </h1>
          <div className="text-2xl font-bold text-primary mb-6">{percentage}%</div>

          {/* Score bar */}
          <div className="h-3 rounded-full bg-secondary mb-6 max-w-xs mx-auto overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1, delay: 0.3 }}
              className={`h-full rounded-full ${score <= 4 ? "bg-destructive" : score <= 7 ? "bg-warning" : "bg-success"}`}
            />
          </div>

          <div className={`inline-flex items-center gap-2 ${message.color} mb-2`}>
            <message.icon className="h-5 w-5" />
            <span className="font-bold text-lg">{message.title}</span>
          </div>
          <p className="text-muted-foreground max-w-md mx-auto">{message.desc}</p>
        </motion.div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
          <Link to="/quiz">
            <Button size="lg" className="gap-2 rounded-xl w-full sm:w-auto">
              <RotateCcw className="h-4 w-4" /> Play Again
            </Button>
          </Link>
          <Button variant="outline" size="lg" onClick={handleShare} className="gap-2 rounded-xl">
            <Share2 className="h-4 w-4" /> Share My Score
          </Button>
        </div>

        {/* Answer review */}
        <h2 className="text-xl font-bold mb-6">📋 Answer Details</h2>
        <div className="space-y-3">
          {allQuestions.map((q, i) => {
            const result = results[i];
            const correct = result?.correct ?? false;
            return (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`glass rounded-xl p-4 border-l-4 ${correct ? "border-l-success" : "border-l-destructive"}`}
              >
                <div className="flex items-start gap-3">
                  {correct ? (
                    <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-muted-foreground">Q{i + 1}</span>
                      <span className="text-xs text-muted-foreground bg-secondary rounded px-1.5 py-0.5">{q.theme}</span>
                    </div>
                    <p className="text-sm font-medium mb-1">{q.question}</p>
                    <p className="text-xs text-muted-foreground">
                      {correct ? q.explanationCorrect : q.explanationWrong}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Results;
