import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Timer, ChevronRight, CheckCircle2, XCircle, AlertTriangle, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { questions, type QuizQuestion } from "@/data/questions";

const TIMER_DURATION = 30;

interface AnswerResult {
  questionId: number;
  selectedIndex: number | null;
  correct: boolean;
}

const Quiz = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [results, setResults] = useState<AnswerResult[]>([]);

  const question = questions[currentIndex];
  const isCorrect = selectedIndex === question.correctIndex;
  const progress = ((currentIndex) / questions.length) * 100;

  const handleAnswer = useCallback((index: number) => {
    if (answered) return;
    setSelectedIndex(index);
    setAnswered(true);
    setResults((prev) => [...prev, {
      questionId: question.id,
      selectedIndex: index,
      correct: index === question.correctIndex,
    }]);
  }, [answered, question]);

  const handleTimeout = useCallback(() => {
    if (answered) return;
    setAnswered(true);
    setResults((prev) => [...prev, {
      questionId: question.id,
      selectedIndex: null,
      correct: false,
    }]);
  }, [answered, question]);

  const handleNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedIndex(null);
      setAnswered(false);
      setTimeLeft(TIMER_DURATION);
    } else {
      const score = results.length > 0
        ? results.filter((r) => r.correct).length + (answered && isCorrect ? 0 : 0)
        : 0;
      // results already includes current answer
      navigate("/results", { state: { results, questions } });
    }
  }, [currentIndex, results, navigate, answered, isCorrect]);

  // Timer
  useEffect(() => {
    if (answered) return;
    if (timeLeft <= 0) {
      handleTimeout();
      return;
    }
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, answered, handleTimeout]);

  // Auto-advance after 3s
  useEffect(() => {
    if (!answered) return;
    const timer = setTimeout(handleNext, 4000);
    return () => clearTimeout(timer);
  }, [answered, handleNext]);

  const timerPercent = (timeLeft / TIMER_DURATION) * 100;
  const timerColor = timeLeft > 15 ? "bg-primary" : timeLeft > 5 ? "bg-warning" : "bg-destructive";

  return (
    <div className="min-h-screen matrix-grid pt-20 pb-10 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-muted-foreground font-mono">
            Question {currentIndex + 1}/{questions.length}
          </span>
          <div className="flex items-center gap-2 text-sm font-mono">
            <Timer className={`h-4 w-4 ${timeLeft <= 5 ? "text-destructive animate-pulse" : "text-muted-foreground"}`} />
            <span className={timeLeft <= 5 ? "text-destructive font-bold" : "text-muted-foreground"}>
              {timeLeft}s
            </span>
          </div>
        </div>

        {/* Timer bar */}
        <div className="h-1.5 rounded-full bg-secondary mb-6 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ease-linear ${timerColor}`}
            style={{ width: `${timerPercent}%` }}
          />
        </div>

        {/* Progress */}
        <Progress value={progress} className="h-1 mb-8" />

        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
          >
            {/* Theme badge */}
            <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 mb-4">
              <AlertTriangle className="h-3.5 w-3.5 text-warning" />
              <span className="text-xs font-medium">{question.theme}</span>
            </div>

            {/* Scenario */}
            <div className="glass rounded-xl p-6 mb-6">
              <p className="text-sm leading-relaxed mb-4">{question.scenario}</p>
              {/* Mockup */}
              <pre className="text-xs font-mono bg-background/50 rounded-lg p-4 overflow-x-auto whitespace-pre-wrap border border-border/50 text-muted-foreground">
                {question.mockup}
              </pre>
            </div>

            {/* Question */}
            <h2 className="text-xl font-bold mb-6">{question.question}</h2>

            {/* Choices */}
            <div className="space-y-3 mb-6">
              {question.choices.map((choice, i) => {
                let choiceClass = "glass rounded-xl p-4 cursor-pointer transition-all text-left w-full text-sm hover:border-primary/50";
                if (answered) {
                  if (i === question.correctIndex) {
                    choiceClass = "rounded-xl p-4 text-left w-full text-sm border bg-success/10 border-success/50 glow-success";
                  } else if (i === selectedIndex && !isCorrect) {
                    choiceClass = "rounded-xl p-4 text-left w-full text-sm border bg-destructive/10 border-destructive/50 glow-destructive";
                  } else {
                    choiceClass = "glass rounded-xl p-4 text-left w-full text-sm opacity-50";
                  }
                } else if (i === selectedIndex) {
                  choiceClass = "glass rounded-xl p-4 text-left w-full text-sm border-primary glow-cyber";
                }

                return (
                  <motion.button
                    key={i}
                    whileHover={!answered ? { scale: 1.01 } : {}}
                    whileTap={!answered ? { scale: 0.99 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={answered}
                    className={choiceClass}
                  >
                    <span className="font-mono text-primary mr-3">{String.fromCharCode(65 + i)}.</span>
                    {choice}
                    {answered && i === question.correctIndex && <CheckCircle2 className="inline ml-2 h-4 w-4 text-success" />}
                    {answered && i === selectedIndex && !isCorrect && i !== question.correctIndex && <XCircle className="inline ml-2 h-4 w-4 text-destructive" />}
                  </motion.button>
                );
              })}
            </div>

            {/* Feedback */}
            <AnimatePresence>
              {answered && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-xl p-6 mb-6 border ${
                    isCorrect
                      ? "bg-success/5 border-success/30"
                      : "bg-destructive/5 border-destructive/30"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {isCorrect ? (
                      <CheckCircle2 className="h-6 w-6 text-success shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="h-6 w-6 text-destructive shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="font-semibold mb-2">
                        {isCorrect ? "✅ Bonne réponse !" : selectedIndex === null ? "⏰ Temps écoulé !" : "❌ Mauvaise réponse"}
                      </p>
                      <p className="text-sm text-muted-foreground mb-3">
                        {isCorrect ? question.explanationCorrect : question.explanationWrong}
                      </p>
                      <div className="flex items-start gap-2 text-sm bg-background/50 rounded-lg p-3">
                        <Lightbulb className="h-4 w-4 text-warning shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{question.advice}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Next button */}
            {answered && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                <Button onClick={handleNext} size="lg" className="gap-2 rounded-xl">
                  {currentIndex < questions.length - 1 ? "Question suivante" : "Voir mes résultats"}
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Quiz;
