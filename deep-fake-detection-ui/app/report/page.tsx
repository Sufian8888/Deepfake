"use client";

import { AppSidebar } from "@/components/ui/app-sidebar";
import { ProtectedRoute } from "@/components/protected-route";
import { ReportHeader } from "@/components/report/report-header";
import { VerdictCard } from "@/components/report/verdict-card";
import { HeatmapGrid } from "@/components/report/heatmap-grid";
import { AudioSyncChart } from "@/components/report/audio-sync-chart";
import { AnomalyTable } from "@/components/report/anomaly-table";
import { ExplanationSummary } from "@/components/report/explanation-summary";

export default function ReportPage() {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen">
        <AppSidebar />

        <main className="flex-1 ml-64 p-8">
          <div className="max-w-5xl mx-auto space-y-6">
            <ReportHeader />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <VerdictCard score={73} confidence={89} />
              <ExplanationSummary />
            </div>

            <HeatmapGrid />
            <AudioSyncChart />
            <AnomalyTable />
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
