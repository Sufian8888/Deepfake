import { Eye, AudioLines, Clock, FileSearch, Fingerprint, Waves } from "lucide-react"

const features = [
  {
    icon: Eye,
    title: "Visual Manipulation Detection",
    description: "Detect facial swaps, morphing, and visual artifacts using deep CNN analysis",
  },
  {
    icon: AudioLines,
    title: "Audio-Lip Sync Analysis",
    description: "Identify mismatches between audio and lip movements with temporal correlation",
  },
  {
    icon: Clock,
    title: "Temporal Inconsistency Detection",
    description: "Analyze frame-to-frame consistency and optical flow anomalies",
  },
  {
    icon: FileSearch,
    title: "Explainable Heatmaps",
    description: "Visualize manipulated regions with GradCAM attention overlays",
  },
  {
    icon: Fingerprint,
    title: "Physiological Signals",
    description: "Extract rPPG, blink patterns, and reflection consistency markers",
  },
  {
    icon: Waves,
    title: "Forensic Analysis",
    description: "Detect compression artifacts, PRNU patterns, and noise fingerprints",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative bg-muted/20">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,theme(colors.border/20)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.border/20)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">
            Comprehensive <span className="text-primary text-glow-blue">Detection Features</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
            Multi-modal analysis covering every aspect of deepfake detection
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="glass rounded-2xl p-6 border border-border/50 hover:border-primary/50 group transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:glow-blue transition-all duration-300">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
