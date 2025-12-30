"use client";

import { AppSidebar } from "@/components/ui/app-sidebar";
import { VideoComparison } from "@/components/analysis/video-comparison";
import { AnalysisTabs } from "@/components/analysis/analysis-tabs";
import { ResultsSummary } from "@/components/analysis/results-summary";
import { ProtectedRoute } from "@/components/protected-route";

export default function AnalysisPage() {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen">
        <AppSidebar />

        <main className="flex-1 ml-64 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">
                DeepFake{" "}
                <span className="text-primary text-glow-blue">
                  Analysis Results
                </span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
                Comprehensive multi-modal analysis of your uploaded video
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <VideoComparison />
                <AnalysisTabs />
              </div>
              <div>
                <ResultsSummary />
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
