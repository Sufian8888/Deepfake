"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { UploadPanel } from "@/components/upload/upload-panel";
import { PreviewPanel } from "@/components/upload/preview-panel";
import { ProtectedRoute } from "@/components/protected-route";

export default function UploadPage() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleStartAnalysis = () => {
    setIsAnalyzing(true);
    // Simulate analysis and redirect
    setTimeout(() => {
      router.push("/analysis");
    }, 2000);
  };

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen">
        <AppSidebar />

        <main className="flex-1 ml-64 p-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">
                Upload &{" "}
                <span className="text-primary text-glow-blue">Analyze</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
                Upload your video file to begin the deepfake detection analysis
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <UploadPanel
                onFileSelect={setSelectedFile}
                isAnalyzing={isAnalyzing}
                onStartAnalysis={handleStartAnalysis}
              />
              <PreviewPanel file={selectedFile} />
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
