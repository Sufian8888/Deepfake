import { AlertTriangle, CheckCircle, XCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function ResultsSummary() {
  const overallScore = 73
  const verdict = overallScore > 70 ? "LIKELY FAKE" : overallScore > 40 ? "SUSPICIOUS" : "LIKELY REAL"
  const verdictColor = overallScore > 70 ? "text-destructive" : overallScore > 40 ? "text-yellow-500" : "text-green-500"
  const verdictBg = overallScore > 70 ? "bg-destructive/20" : overallScore > 40 ? "bg-yellow-500/20" : "bg-green-500/20"

  return (
    <div className="glass rounded-2xl p-6 border border-border/50">
      <h2 className="text-xl font-semibold mb-6">Analysis Summary</h2>

      <div className={`rounded-xl p-6 ${verdictBg} mb-6`}>
        <div className="flex items-center gap-4">
          {overallScore > 70 ? (
            <XCircle className="h-12 w-12 text-destructive" />
          ) : overallScore > 40 ? (
            <AlertTriangle className="h-12 w-12 text-yellow-500" />
          ) : (
            <CheckCircle className="h-12 w-12 text-green-500" />
          )}
          <div>
            <p className="text-sm text-muted-foreground mb-1">Verification Result</p>
            <p className={`text-2xl font-bold ${verdictColor}`}>{verdict}</p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-sm text-muted-foreground mb-1">Confidence</p>
            <p className={`text-3xl font-bold font-mono ${verdictColor}`}>{overallScore}%</p>
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <h3 className="font-medium">Key Findings</h3>
        <div className="space-y-2">
          {[
            { label: "Audio-lip sync mismatch detected", severity: "high" },
            { label: "Facial boundary artifacts present", severity: "high" },
            { label: "Temporal inconsistencies in frames 12-18", severity: "medium" },
            { label: "Compression artifacts in lower region", severity: "low" },
          ].map((finding, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/50">
              <div
                className={`w-2 h-2 rounded-full ${
                  finding.severity === "high"
                    ? "bg-destructive"
                    : finding.severity === "medium"
                      ? "bg-yellow-500"
                      : "bg-blue-500"
                }`}
              />
              <span className="text-sm">{finding.label}</span>
            </div>
          ))}
        </div>
      </div>

      <Link href="/report">
        <Button className="w-full glow-blue">
          View Full Report
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </div>
  )
}
