"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Eye,
  Clock,
  AudioLines,
  Heart,
  Fingerprint,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";

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
};

export function AnalysisTabs() {
  const [activeTab, setActiveTab] = useState("visual");
  const [animatedScores, setAnimatedScores] = useState<Record<string, number>>(
    {}
  );
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    // Animate scores on mount
    Object.keys(analysisData).forEach((key) => {
      animateScore(key, analysisData[key as keyof typeof analysisData].score);
    });
  }, []);

  const animateScore = (key: string, targetScore: number) => {
    let current = 0;
    const increment = targetScore / 60;
    const interval = setInterval(() => {
      current += increment;
      if (current >= targetScore) {
        current = targetScore;
        clearInterval(interval);
      }
      setAnimatedScores((prev) => ({ ...prev, [key]: Math.round(current) }));
    }, 16);
  };

  return (
    <div
      className={`glass rounded-2xl p-6 border border-border/50 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{
        animation: "slideInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <h2 className="text-xl font-semibold mb-6 animate-fade-in">
        Parameter Analysis
      </h2>

      <Tabs
        defaultValue="visual"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList className="glass w-full grid grid-cols-5 mb-6 relative">
          {Object.entries(analysisData).map(([key, data]) => (
            <TabsTrigger
              key={key}
              value={key}
              className="gap-2 text-xs sm:text-sm transition-all duration-300 hover:scale-105 data-[state=active]:scale-110"
            >
              <data.icon
                className={`h-4 w-4 transition-transform duration-300 ${
                  activeTab === key ? "animate-pulse-slow" : ""
                }`}
              />
              <span className="hidden sm:inline">
                {data.title.split(" ")[0]}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(analysisData).map(([key, data]) => (
          <TabsContent key={key} value={key} className="space-y-6">
            <div
              className="flex items-center justify-between animate-slide-in-left"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 hover:scale-110 hover:rotate-6 ${
                    data.status === "danger"
                      ? "bg-destructive/20 animate-pulse-danger"
                      : data.status === "warning"
                      ? "bg-yellow-500/20 animate-pulse-warning"
                      : "bg-green-500/20 animate-pulse-success"
                  }`}
                >
                  <data.icon
                    className={`h-6 w-6 transition-all duration-500 ${
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
                  <p className="text-sm text-muted-foreground">
                    Analysis Results
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div
                  className={`text-3xl font-bold transition-all duration-500 ${
                    data.status === "danger"
                      ? "text-destructive animate-glow-danger"
                      : data.status === "warning"
                      ? "text-yellow-500 animate-glow-warning"
                      : "text-green-500 animate-glow-success"
                  }`}
                  style={{
                    animation:
                      activeTab === key
                        ? "countUp 1s ease-out, glow 2s ease-in-out infinite"
                        : "none",
                  }}
                >
                  {animatedScores[key] !== undefined
                    ? animatedScores[key]
                    : data.score}
                  %
                </div>
                <p className="text-xs text-muted-foreground">Anomaly Score</p>
              </div>
            </div>

            <div className="space-y-4">
              {data.items.map((item, index) => (
                <div
                  key={item.label}
                  className="space-y-2 animate-slide-in-right"
                  style={{
                    animationDelay: `${0.1 + index * 0.1}s`,
                    animationFillMode: "both",
                  }}
                >
                  <div className="flex items-center justify-between group">
                    <div className="flex items-center gap-2">
                      {item.anomaly ? (
                        <AlertTriangle className="h-4 w-4 text-destructive animate-bounce-subtle" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-green-500 animate-check" />
                      )}
                      <span className="text-sm transition-all duration-300 group-hover:translate-x-1">
                        {item.label}
                      </span>
                    </div>
                    <span
                      className={`text-sm font-mono transition-all duration-300 ${
                        item.anomaly ? "text-destructive" : "text-green-500"
                      }`}
                      style={{
                        animation:
                          activeTab === key ? "fadeIn 0.5s ease-out" : "none",
                        animationDelay: `${0.3 + index * 0.1}s`,
                        animationFillMode: "both",
                      }}
                    >
                      {item.value}%
                    </span>
                  </div>
                  <div className="relative overflow-hidden rounded-full">
                    <Progress
                      value={activeTab === key ? item.value : 0}
                      className={`h-2 transition-all duration-1000 ${
                        item.anomaly
                          ? "[&>div]:bg-destructive"
                          : "[&>div]:bg-green-500"
                      } [&>div]:transition-all [&>div]:duration-1000 [&>div]:ease-out`}
                      style={{
                        transitionDelay: `${0.2 + index * 0.1}s`,
                      }}
                    />
                    <div
                      className="absolute inset-0 animate-shimmer pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
                        animationDelay: `${index * 0.2}s`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes countUp {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes glow {
          0%,
          100% {
            filter: drop-shadow(0 0 2px currentColor);
          }
          50% {
            filter: drop-shadow(0 0 8px currentColor);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        @keyframes bounce-subtle {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-2px);
          }
        }

        @keyframes check {
          0% {
            transform: scale(0) rotate(0deg);
          }
          50% {
            transform: scale(1.2) rotate(180deg);
          }
          100% {
            transform: scale(1) rotate(360deg);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes pulse-danger {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4);
          }
          50% {
            box-shadow: 0 0 15px 5px rgba(239, 68, 68, 0.2);
          }
        }

        @keyframes pulse-warning {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(234, 179, 8, 0.4);
          }
          50% {
            box-shadow: 0 0 15px 5px rgba(234, 179, 8, 0.2);
          }
        }

        @keyframes pulse-success {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4);
          }
          50% {
            box-shadow: 0 0 15px 5px rgba(34, 197, 94, 0.2);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out 0.3s both;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }

        .animate-check {
          animation: check 0.6s ease-out;
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        .animate-pulse-danger {
          animation: pulse-danger 2s ease-in-out infinite;
        }

        .animate-pulse-warning {
          animation: pulse-warning 2s ease-in-out infinite;
        }

        .animate-pulse-success {
          animation: pulse-success 2s ease-in-out infinite;
        }

        .animate-glow-danger {
          animation: glow 2s ease-in-out infinite;
        }

        .animate-glow-warning {
          animation: glow 2s ease-in-out infinite;
        }

        .animate-glow-success {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
