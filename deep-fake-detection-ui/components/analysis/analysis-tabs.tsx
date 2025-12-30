"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, Clock, AudioLines, Heart, Fingerprint, AlertTriangle, CheckCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"

const analysisData = {
  visual: {
    title: "Visual Artifacts",
    icon: Eye,
    score: 78,
    status: "warning",
    items: [
      { label: "Facial Boundary Artifacts", value: 85, anomaly: true },
      { label: "Blending Inconsistencies", value: 72, anomaly: true },
      { label: "Texture Coherence", value: 45, anomaly: false },
      { label: "Color Distribution", value: 38, anomaly: false },
    ],
  },
  temporal: {
    title: "Temporal Consistency",
    icon: Clock,
    score: 65,
    status: "warning",
    items: [
      { label: "Frame-to-Frame Consistency", value: 62, anomaly: true },
      { label: "Optical Flow Analysis", value: 71, anomaly: true },
      { label: "Motion Blur Patterns", value: 45, anomaly: false },
      { label: "Jitter Detection", value: 58, anomaly: false },
    ],
  },
  audio: {
    title: "Audio-Lip Sync",
    icon: AudioLines,
    score: 92,
    status: "danger",
    items: [
      { label: "Phoneme Alignment", value: 95, anomaly: true },
      { label: "Lip Movement Correlation", value: 89, anomaly: true },
      { label: "Audio Spectrogram", value: 78, anomaly: true },
      { label: "Voice Characteristics", value: 85, anomaly: true },
    ],
  },
  physiological: {
    title: "Physiological Signals",
    icon: Heart,
    score: 42,
    status: "safe",
    items: [
      { label: "rPPG Analysis", value: 38, anomaly: false },
      { label: "Blink Rate Pattern", value: 45, anomaly: false },
      { label: "Eye Reflection", value: 52, anomaly: false },
      { label: "Micro-expressions", value: 35, anomaly: false },
    ],
  },
  forensic: {
    title: "Forensic Signals",
    icon: Fingerprint,
    score: 58,
    status: "warning",
    items: [
      { label: "Compression Artifacts", value: 62, anomaly: true },
      { label: "PRNU Analysis", value: 48, anomaly: false },
      { label: "Noise Fingerprint", value: 55, anomaly: false },
      { label: "JPEG Grid Analysis", value: 68, anomaly: true },
    ],
  },
}

export function AnalysisTabs() {
  return (
    <div className="glass rounded-2xl p-6 border border-border/50">
      <h2 className="text-xl font-semibold mb-6">Parameter Analysis</h2>

      <Tabs defaultValue="visual" className="w-full">
        <TabsList className="glass w-full grid grid-cols-5 mb-6">
          {Object.entries(analysisData).map(([key, data]) => (
            <TabsTrigger key={key} value={key} className="gap-2 text-xs sm:text-sm">
              <data.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{data.title.split(" ")[0]}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(analysisData).map(([key, data]) => (
          <TabsContent key={key} value={key} className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    data.status === "danger"
                      ? "bg-destructive/20"
                      : data.status === "warning"
                        ? "bg-yellow-500/20"
                        : "bg-green-500/20"
                  }`}
                >
                  <data.icon
                    className={`h-6 w-6 ${
                      data.status === "danger"
                        ? "text-destructive"
                        : data.status === "warning"
                          ? "text-yellow-500"
                          : "text-green-500"
                    }`}
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{data.title}</h3>
                  <p className="text-sm text-muted-foreground">Analysis Results</p>
                </div>
              </div>
              <div className="text-right">
                <div
                  className={`text-3xl font-bold ${
                    data.status === "danger"
                      ? "text-destructive"
                      : data.status === "warning"
                        ? "text-yellow-500"
                        : "text-green-500"
                  }`}
                >
                  {data.score}%
                </div>
                <p className="text-xs text-muted-foreground">Anomaly Score</p>
              </div>
            </div>

            <div className="space-y-4">
              {data.items.map((item) => (
                <div key={item.label} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {item.anomaly ? (
                        <AlertTriangle className="h-4 w-4 text-destructive" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                      <span className="text-sm">{item.label}</span>
                    </div>
                    <span className={`text-sm font-mono ${item.anomaly ? "text-destructive" : "text-green-500"}`}>
                      {item.value}%
                    </span>
                  </div>
                  <Progress
                    value={item.value}
                    className={`h-2 ${item.anomaly ? "[&>div]:bg-destructive" : "[&>div]:bg-green-500"}`}
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
