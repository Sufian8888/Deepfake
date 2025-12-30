import { Upload, Cpu, Eye, FileText, ArrowRight } from "lucide-react"

const steps = [
  {
    icon: Upload,
    title: "Upload",
    description: "Drag and drop your video file for analysis",
  },
  {
    icon: Cpu,
    title: "Analysis",
    description: "AI processes visual, audio, and temporal features",
  },
  {
    icon: Eye,
    title: "Explainable Results",
    description: "View heatmaps, graphs, and anomaly detection",
  },
  {
    icon: FileText,
    title: "Report",
    description: "Download detailed verification report",
  },
]

export function HowItWorks() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">
            How It <span className="text-primary text-glow-blue">Works</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
            Our advanced pipeline analyzes multiple dimensions of your video to detect manipulation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={step.title} className="relative group">
              <div className="glass rounded-2xl p-6 border border-border/50 hover:border-primary/50 transition-all duration-300 h-full">
                <div className="mb-4 relative">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:glow-blue transition-all duration-300">
                    <step.icon className="h-7 w-7 text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-mono font-bold text-muted-foreground">
                    {index + 1}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <ArrowRight className="h-6 w-6 text-muted-foreground/50" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
