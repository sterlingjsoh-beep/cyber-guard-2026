import { motion } from "framer-motion";

interface SecurityGaugeProps {
  score: number;
  grade: string;
}

const SecurityGauge = ({ score, grade }: SecurityGaugeProps) => {
  const getColor = () => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getGlowClass = () => {
    if (score >= 80) return "glow-success";
    if (score >= 60) return "shadow-[0_0_20px_hsl(var(--warning)/0.3)]";
    return "glow-destructive";
  };

  const strokeColor = () => {
    if (score >= 80) return "hsl(var(--success))";
    if (score >= 60) return "hsl(var(--warning))";
    return "hsl(var(--destructive))";
  };

  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className={`relative inline-flex items-center justify-center rounded-full ${getGlowClass()}`}>
      <svg width="160" height="160" viewBox="0 0 120 120" className="-rotate-90">
        <circle cx="60" cy="60" r="54" fill="none" stroke="hsl(var(--secondary))" strokeWidth="8" />
        <motion.circle
          cx="60" cy="60" r="54" fill="none"
          stroke={strokeColor()}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className={`text-4xl font-black ${getColor()}`}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {grade}
        </motion.span>
        <span className="text-sm text-muted-foreground font-mono">{score}/100</span>
      </div>
    </div>
  );
};

export default SecurityGauge;
