import { motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, XCircle, ExternalLink } from "lucide-react";
import type { HeaderCheck } from "@/lib/headerAnalyzer";

const statusConfig = {
  good: { icon: CheckCircle2, color: "text-success", border: "border-l-success", label: "✅ Présent et correct" },
  partial: { icon: AlertTriangle, color: "text-warning", border: "border-l-warning", label: "⚠️ Partiel" },
  missing: { icon: XCircle, color: "text-destructive", border: "border-l-destructive", label: "❌ Absent" },
  bad: { icon: XCircle, color: "text-destructive", border: "border-l-destructive", label: "❌ Mauvaise config" },
};

interface Props {
  header: HeaderCheck;
  index: number;
}

const HeaderResultCard = ({ header, index }: Props) => {
  const config = statusConfig[header.status];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06 }}
      className={`glass rounded-xl p-5 border-l-4 ${config.border}`}
    >
      <div className="flex items-start gap-3">
        <Icon className={`h-5 w-5 ${config.color} shrink-0 mt-1`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3 className="font-semibold font-mono text-sm">{header.name}</h3>
            <span className="text-xs font-mono text-muted-foreground">{header.score}/{header.maxScore} pts</span>
          </div>

          <p className="text-xs text-muted-foreground mb-2">{config.label}</p>

          {header.value && (
            <code className="block text-xs bg-secondary/50 rounded px-2 py-1 mb-2 font-mono break-all text-foreground/80">
              {header.value}
            </code>
          )}

          <p className="text-sm text-muted-foreground mb-1">{header.description}</p>

          {header.status !== "good" && (
            <div className="mt-2 p-2 rounded-lg bg-primary/5 border border-primary/10">
              <p className="text-xs text-primary font-medium">💡 {header.recommendation}</p>
            </div>
          )}

          {header.status !== "good" && (
            <p className="text-xs text-destructive/80 mt-1">⚡ Impact : {header.impact}</p>
          )}

          <a href={header.link} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2">
            En savoir plus <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default HeaderResultCard;
