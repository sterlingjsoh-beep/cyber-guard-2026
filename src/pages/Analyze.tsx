import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Copy, Check, AlertCircle, RotateCcw, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import SecurityGauge from "@/components/SecurityGauge";
import HeaderResultCard from "@/components/HeaderResultCard";
import MatrixLoader from "@/components/MatrixLoader";
import { fetchAndAnalyze, saveToHistory, generateMarkdownReport, type AnalysisResult } from "@/lib/headerAnalyzer";

const Analyze = () => {
  const [params] = useSearchParams();
  const url = params.get("url") || "";
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!url) return;
    setLoading(true);
    setResult(null);
    fetchAndAnalyze(url).then((r) => {
      setResult(r);
      saveToHistory(r);
      setLoading(false);
    });
  }, [url]);

  const handleCopyReport = () => {
    if (!result) return;
    navigator.clipboard.writeText(generateMarkdownReport(result));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!url) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Aucune URL spécifiée.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen matrix-grid pt-20 pb-10 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Back */}
        <Link to="/home" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" /> Retour
        </Link>

        {/* URL */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-xl p-4 mb-8"
        >
          <p className="text-xs text-muted-foreground mb-1">URL analysée</p>
          <p className="font-mono text-sm break-all">{url}</p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20">
            <MatrixLoader />
          </div>
        ) : result ? (
          <>
            {/* Score */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="glass rounded-2xl p-8 text-center mb-8"
            >
              <SecurityGauge score={result.score} grade={result.grade} />
              <p className="text-muted-foreground mt-4 text-sm max-w-md mx-auto">
                {result.score >= 80
                  ? "🏆 Excellente configuration ! Ce site suit les bonnes pratiques de sécurité HTTP."
                  : result.score >= 60
                    ? "⚠️ Configuration correcte mais améliorable. Suivez les recommandations ci-dessous."
                    : "🚨 Configuration faible. Plusieurs headers critiques sont absents ou mal configurés."}
              </p>
            </motion.div>

            {/* Warning banner */}
            {result.error && (
              <div className="flex items-start gap-2 glass rounded-xl p-4 mb-6 border-l-4 border-l-warning">
                <AlertCircle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">{result.error}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-3 mb-8">
              <Button variant="outline" size="sm" onClick={handleCopyReport} className="gap-2 rounded-lg">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copié !" : "Copier le rapport (Markdown)"}
              </Button>
              <Link to={`/analyze?url=${encodeURIComponent(url)}&t=${Date.now()}`}>
                <Button variant="outline" size="sm" className="gap-2 rounded-lg">
                  <RotateCcw className="h-4 w-4" /> Re-analyser
                </Button>
              </Link>
            </div>

            {/* Priority suggestions */}
            {(() => {
              const critical = result.headers.filter(h => h.status === "missing" || h.status === "bad");
              if (critical.length === 0) return null;
              return (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="glass rounded-xl p-5 mb-8 border border-destructive/20"
                >
                  <h2 className="font-bold text-sm mb-3 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-destructive" /> Actions prioritaires
                  </h2>
                  <ul className="space-y-2">
                    {critical.slice(0, 4).map(h => (
                      <li key={h.key} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-destructive">→</span>
                        <span><span className="font-mono font-medium text-foreground">{h.name}</span> : {h.recommendation}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })()}

            {/* Header details */}
            <h2 className="text-lg font-bold mb-4">📋 Détail des headers ({result.headers.length})</h2>
            <div className="space-y-3">
              {result.headers.map((h, i) => (
                <HeaderResultCard key={h.key} header={h} index={i} />
              ))}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Analyze;
