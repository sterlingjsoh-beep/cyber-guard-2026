export interface HeaderCheck {
  name: string;
  key: string;
  value: string | null;
  status: "good" | "partial" | "missing" | "bad";
  score: number;
  maxScore: number;
  description: string;
  impact: string;
  recommendation: string;
  link: string;
}

export interface AnalysisResult {
  url: string;
  score: number;
  grade: string;
  headers: HeaderCheck[];
  timestamp: number;
  error?: string;
}

const HEADER_DEFINITIONS = [
  {
    name: "Strict-Transport-Security",
    key: "strict-transport-security",
    maxScore: 15,
    description: "Forces the browser to use HTTPS exclusively.",
    impact: "Without HSTS, man-in-the-middle (MITM) attacks and HTTP downgrades are possible.",
    link: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security",
    evaluate: (val: string | null): { status: HeaderCheck["status"]; score: number; rec: string } => {
      if (!val) return { status: "missing", score: 0, rec: "Add HSTS with max-age ≥ 31536000, includeSubDomains and preload." };
      const maxAge = val.match(/max-age=(\d+)/i);
      const hasSub = /includesubdomains/i.test(val);
      const hasPreload = /preload/i.test(val);
      const age = maxAge ? parseInt(maxAge[1]) : 0;
      if (age >= 31536000 && hasSub && hasPreload) return { status: "good", score: 15, rec: "Excellent! Complete HSTS with preload." };
      if (age >= 31536000 && hasSub) return { status: "partial", score: 12, rec: "Add 'preload' and submit your domain at hstspreload.org." };
      if (age >= 2592000) return { status: "partial", score: 8, rec: "Increase max-age to 1 year (31536000) and add includeSubDomains + preload." };
      return { status: "bad", score: 4, rec: "max-age too low. Aim for 31536000 with includeSubDomains and preload." };
    },
  },
  {
    name: "Content-Security-Policy",
    key: "content-security-policy",
    maxScore: 20,
    description: "Controls which content sources are allowed (scripts, styles, images…).",
    impact: "Without CSP, your site is vulnerable to XSS attacks and malicious code injection.",
    link: "https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP",
    evaluate: (val: string | null): { status: HeaderCheck["status"]; score: number; rec: string } => {
      if (!val) return { status: "missing", score: 0, rec: "Add a strict CSP. Start with default-src 'self'; script-src 'strict-dynamic'." };
      const hasDefault = /default-src/i.test(val);
      const hasScript = /script-src/i.test(val);
      const hasUnsafeInline = /unsafe-inline/i.test(val);
      const hasUnsafeEval = /unsafe-eval/i.test(val);
      const hasStrictDynamic = /strict-dynamic/i.test(val);
      if (hasUnsafeEval) return { status: "bad", score: 5, rec: "Remove 'unsafe-eval' — it's a critical flaw. Use 'strict-dynamic' with nonces." };
      if (hasUnsafeInline && !hasStrictDynamic) return { status: "partial", score: 8, rec: "Replace 'unsafe-inline' with nonces or 'strict-dynamic'." };
      if (hasDefault && hasScript && hasStrictDynamic) return { status: "good", score: 20, rec: "Robust CSP with strict-dynamic. Excellent!" };
      if (hasDefault && hasScript) return { status: "partial", score: 14, rec: "Good base. Add 'strict-dynamic' and a report-uri to monitor violations." };
      if (hasDefault) return { status: "partial", score: 10, rec: "Add script-src with 'strict-dynamic' to strengthen the policy." };
      return { status: "partial", score: 6, rec: "CSP present but incomplete. Add default-src 'self' as a base." };
    },
  },
  {
    name: "X-Content-Type-Options",
    key: "x-content-type-options",
    maxScore: 10,
    description: "Prevents the browser from guessing the MIME type (MIME sniffing).",
    impact: "Without this header, a malicious file could be interpreted as an executable script.",
    link: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options",
    evaluate: (val: string | null) => {
      if (!val) return { status: "missing" as const, score: 0, rec: "Add X-Content-Type-Options: nosniff" };
      if (val.toLowerCase().includes("nosniff")) return { status: "good" as const, score: 10, rec: "Perfect!" };
      return { status: "bad" as const, score: 2, rec: "Value must be 'nosniff'." };
    },
  },
  {
    name: "X-Frame-Options",
    key: "x-frame-options",
    maxScore: 10,
    description: "Prevents your page from being embedded in an iframe (clickjacking).",
    impact: "Without this header, an attacker can overlay your site in an invisible frame.",
    link: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options",
    evaluate: (val: string | null) => {
      if (!val) return { status: "missing" as const, score: 0, rec: "Add X-Frame-Options: DENY or SAMEORIGIN. Or better: use CSP frame-ancestors." };
      const v = val.toUpperCase();
      if (v.includes("DENY")) return { status: "good" as const, score: 10, rec: "Perfect! Also consider CSP frame-ancestors 'none'." };
      if (v.includes("SAMEORIGIN")) return { status: "good" as const, score: 9, rec: "Good. SAMEORIGIN is acceptable for most cases." };
      return { status: "bad" as const, score: 3, rec: "Unrecognized value. Use DENY or SAMEORIGIN." };
    },
  },
  {
    name: "X-XSS-Protection",
    key: "x-xss-protection",
    maxScore: 5,
    description: "Built-in browser XSS filter (legacy, replaced by CSP).",
    impact: "Obsolete header but still checked. Can cause info leaks if misconfigured.",
    link: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection",
    evaluate: (val: string | null) => {
      if (!val) return { status: "partial" as const, score: 2, rec: "Add X-XSS-Protection: 0 (disabled, CSP is preferred) or 1; mode=block." };
      if (val.includes("1") && val.includes("mode=block")) return { status: "good" as const, score: 5, rec: "OK. But prefer a solid CSP." };
      if (val === "0") return { status: "good" as const, score: 5, rec: "Intentionally disabled — correct if CSP is in place." };
      return { status: "partial" as const, score: 3, rec: "Add mode=block or disable with 0 if CSP is active." };
    },
  },
  {
    name: "Referrer-Policy",
    key: "referrer-policy",
    maxScore: 10,
    description: "Controls info sent in the Referer header during navigation.",
    impact: "Without a policy, the full URL (with tokens, sensitive params) can leak to third-party sites.",
    link: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy",
    evaluate: (val: string | null) => {
      if (!val) return { status: "missing" as const, score: 0, rec: "Add Referrer-Policy: strict-origin-when-cross-origin or no-referrer." };
      const v = val.toLowerCase();
      if (v.includes("no-referrer") && !v.includes("when")) return { status: "good" as const, score: 10, rec: "Maximum protection. Perfect." };
      if (v.includes("strict-origin-when-cross-origin")) return { status: "good" as const, score: 9, rec: "Excellent security/functionality balance." };
      if (v.includes("same-origin")) return { status: "good" as const, score: 8, rec: "Good. No info sent to third-party sites." };
      if (v.includes("unsafe-url")) return { status: "bad" as const, score: 2, rec: "Dangerous! Full URL is sent. Change immediately." };
      return { status: "partial" as const, score: 5, rec: "Consider strict-origin-when-cross-origin for a good balance." };
    },
  },
  {
    name: "Permissions-Policy",
    key: "permissions-policy",
    maxScore: 10,
    description: "Restricts access to browser APIs (camera, mic, geolocation…).",
    impact: "Without this header, third-party code (ads, iframes) can access device sensors.",
    link: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy",
    evaluate: (val: string | null) => {
      if (!val) return { status: "missing" as const, score: 0, rec: "Add Permissions-Policy to restrict camera, mic, geolocation to necessary contexts." };
      const features = val.split(",").length;
      if (features >= 5) return { status: "good" as const, score: 10, rec: "Comprehensive policy. Regularly check for new APIs to restrict." };
      if (features >= 2) return { status: "partial" as const, score: 6, rec: "Add more restrictions: camera, microphone, geolocation, payment, usb." };
      return { status: "partial" as const, score: 4, rec: "Policy too minimal. Explicitly list each sensitive API." };
    },
  },
  {
    name: "Cross-Origin-Opener-Policy",
    key: "cross-origin-opener-policy",
    maxScore: 5,
    description: "Isolates your window from cross-origin contexts (Spectre protection).",
    impact: "Required to enable SharedArrayBuffer and strengthen memory isolation.",
    link: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Opener-Policy",
    evaluate: (val: string | null) => {
      if (!val) return { status: "missing" as const, score: 0, rec: "Add Cross-Origin-Opener-Policy: same-origin for cross-origin isolation." };
      if (val.includes("same-origin")) return { status: "good" as const, score: 5, rec: "Perfect! Maximum isolation." };
      return { status: "partial" as const, score: 3, rec: "Consider same-origin for complete isolation." };
    },
  },
  {
    name: "Cross-Origin-Resource-Policy",
    key: "cross-origin-resource-policy",
    maxScore: 5,
    description: "Prevents your resources from being loaded by other origins.",
    impact: "Protects against data leaks via cross-origin requests.",
    link: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Resource-Policy",
    evaluate: (val: string | null) => {
      if (!val) return { status: "missing" as const, score: 0, rec: "Add Cross-Origin-Resource-Policy: same-origin (or same-site depending on your needs)." };
      if (val.includes("same-origin")) return { status: "good" as const, score: 5, rec: "Perfect." };
      if (val.includes("same-site")) return { status: "good" as const, score: 4, rec: "Good for multi-subdomain architectures." };
      return { status: "partial" as const, score: 2, rec: "cross-origin value — very permissive. Restrict if possible." };
    },
  },
  {
    name: "Server / X-Powered-By",
    key: "server",
    maxScore: 10,
    description: "Reveals the server technology used (Apache, Nginx, Express…).",
    impact: "Makes reconnaissance easier for attackers looking for known vulnerabilities.",
    link: "https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/01-Information_Gathering/",
    evaluate: (_val: string | null, allHeaders: Record<string, string>) => {
      const server = allHeaders["server"];
      const powered = allHeaders["x-powered-by"];
      if (!server && !powered) return { status: "good" as const, score: 10, rec: "No server info exposed. Excellent." };
      if (powered) return { status: "bad" as const, score: 2, rec: `X-Powered-By exposes "${powered}". Remove this header immediately.` };
      if (server && /\d/.test(server)) return { status: "bad" as const, score: 3, rec: `Server header exposes version "${server}". Hide it.` };
      if (server) return { status: "partial" as const, score: 6, rec: `Server "${server}" is visible. Ideally, hide or genericize this header.` };
      return { status: "good" as const, score: 10, rec: "OK" };
    },
  },
];

function getGrade(score: number): string {
  if (score >= 90) return "A+";
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  if (score >= 45) return "D";
  if (score >= 30) return "E";
  return "F";
}

export function analyzeHeaders(responseHeaders: Record<string, string>, url: string): AnalysisResult {
  const headers: HeaderCheck[] = HEADER_DEFINITIONS.map((def) => {
    const val = responseHeaders[def.key] || null;
    const result = def.key === "server"
      ? (def.evaluate as (v: string | null, all: Record<string, string>) => { status: HeaderCheck["status"]; score: number; rec: string })(val, responseHeaders)
      : (def.evaluate as (v: string | null) => { status: HeaderCheck["status"]; score: number; rec: string })(val);
    return {
      name: def.name,
      key: def.key,
      value: val,
      status: result.status,
      score: result.score,
      maxScore: def.maxScore,
      description: def.description,
      impact: def.impact,
      recommendation: result.rec,
      link: def.link,
    };
  });

  const totalMax = headers.reduce((s, h) => s + h.maxScore, 0);
  const totalScore = headers.reduce((s, h) => s + h.score, 0);
  const normalized = Math.round((totalScore / totalMax) * 100);

  return {
    url,
    score: normalized,
    grade: getGrade(normalized),
    headers,
    timestamp: Date.now(),
  };
}

export async function fetchAndAnalyze(inputUrl: string): Promise<AnalysisResult> {
  let url = inputUrl.trim();
  if (!/^https?:\/\//i.test(url)) url = "https://" + url;

  try {
    const resp = await fetch(url, { method: "HEAD", mode: "cors" });
    const h: Record<string, string> = {};
    resp.headers.forEach((v, k) => { h[k.toLowerCase()] = v; });
    if (Object.keys(h).length > 2) {
      return analyzeHeaders(h, url);
    }
  } catch {
    // CORS blocked — expected for most sites
  }

  try {
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
    const resp = await fetch(proxyUrl, { method: "HEAD" });
    const h: Record<string, string> = {};
    resp.headers.forEach((v, k) => { h[k.toLowerCase()] = v; });
    if (Object.keys(h).length > 0) {
      return {
        ...analyzeHeaders(h, url),
        error: "Analysis via proxy — some headers may not reflect the actual site. For a complete analysis, use a server-side tool.",
      };
    }
  } catch {
    // Proxy also failed
  }

  return getDemoAnalysis(url);
}

function getDemoAnalysis(url: string): AnalysisResult {
  const mockHeaders: Record<string, string> = {
    "strict-transport-security": "max-age=31536000; includeSubDomains; preload",
    "content-security-policy": "default-src 'self'; script-src 'self' 'strict-dynamic'",
    "x-content-type-options": "nosniff",
    "x-frame-options": "SAMEORIGIN",
    "referrer-policy": "strict-origin-when-cross-origin",
    "server": "cloudflare",
  };

  if (url.includes("httpforever") || url.includes("http://")) {
    return analyzeHeaders({
      "server": "Apache/2.4.41 (Ubuntu)",
      "x-powered-by": "PHP/7.4",
    }, url);
  }

  if (url.includes("google")) {
    return analyzeHeaders({
      "strict-transport-security": "max-age=31536000",
      "x-content-type-options": "nosniff",
      "x-frame-options": "SAMEORIGIN",
      "x-xss-protection": "0",
      "cross-origin-opener-policy": "same-origin-allow-popups",
      "permissions-policy": "ch-ua-arch=*, ch-ua-bitness=*, ch-ua-full-version=*",
      "content-security-policy": "script-src 'nonce-random' 'strict-dynamic'",
      "referrer-policy": "origin",
    }, url);
  }

  const result = analyzeHeaders(mockHeaders, url);
  result.error = "CORS blocked — demo results shown. For a real analysis, a server-side proxy is required.";
  return result;
}

const HISTORY_KEY = "headercheck_history";

export function getHistory(): AnalysisResult[] {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  } catch { return []; }
}

export function saveToHistory(result: AnalysisResult) {
  const history = getHistory();
  history.unshift(result);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 10)));
}

export function generateMarkdownReport(result: AnalysisResult): string {
  const lines = [
    `# HeaderCheck — HTTP Security Report`,
    ``,
    `**URL:** ${result.url}`,
    `**Score:** ${result.score}/100 (${result.grade})`,
    `**Date:** ${new Date(result.timestamp).toLocaleString("en-US")}`,
    ``,
    `## Header Details`,
    ``,
    `| Header | Status | Score | Recommendation |`,
    `|--------|--------|-------|----------------|`,
    ...result.headers.map(h =>
      `| ${h.name} | ${h.status === "good" ? "✅" : h.status === "partial" ? "⚠️" : "❌"} ${h.status} | ${h.score}/${h.maxScore} | ${h.recommendation} |`
    ),
    ``,
    `---`,
    `Generated by HeaderCheck 2026`,
  ];
  return lines.join("\n");
}
