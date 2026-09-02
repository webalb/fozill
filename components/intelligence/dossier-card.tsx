import { TrendingUp, Users, Compass, ShieldCheck } from "lucide-react";

interface DossierProps {
  classification: string;
  targetEntity: string;
  healthScore: { positive: number; neutral: number; negative: number };
  keyShift: string;
  dominantNarrative: string;
  topGeographies: string[];
  recommendedAction: string;
}

export function DossierCard({
  classification,
  targetEntity,
  healthScore,
  keyShift,
  dominantNarrative,
  topGeographies,
  recommendedAction,
}: DossierProps) {
  return (
    <div className="relative rounded-xl border border-border bg-surface/90 p-6 shadow-2xl backdrop-blur-md">
      <div className="flex items-center justify-between border-b border-border pb-3.5">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
          <span className="font-mono text-xs font-semibold tracking-wider text-gold uppercase">
            {classification}
          </span>
        </div>
        <span className="font-mono text-xs text-foreground/50">TARGET: {targetEntity}</span>
      </div>

      <div className="mt-5">
        <div className="flex justify-between text-xs font-mono text-foreground/60 mb-2">
          <span className="font-heading uppercase tracking-wide">Brand &amp; Perception Health</span>
          <span className="text-foreground">
            {healthScore.positive}% POS / {healthScore.neutral}% NEU / {healthScore.negative}% NEG
          </span>
        </div>
        <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-elevated border border-border">
          <div style={{ width: `${healthScore.positive}%` }} className="bg-positive" />
          <div style={{ width: `${healthScore.neutral}%` }} className="bg-neutral" />
          <div style={{ width: `${healthScore.negative}%` }} className="bg-negative" />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="inset-panel p-4">
          <div className="flex items-center gap-2 text-xs font-heading font-semibold text-gold mb-1.5 uppercase tracking-wide">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>Velocity &amp; Shift</span>
          </div>
          <p className="font-body text-sm text-foreground/90 leading-relaxed">{keyShift}</p>
        </div>

        <div className="inset-panel p-4">
          <div className="flex items-center gap-2 text-xs font-heading font-semibold text-gold mb-1.5 uppercase tracking-wide">
            <Users className="h-3.5 w-3.5" />
            <span>Dominant Narrative</span>
          </div>
          <p className="font-body text-sm text-foreground/90 leading-relaxed">{dominantNarrative}</p>
        </div>
      </div>

      <div className="inset-panel p-4 mt-4">
        <div className="flex items-center justify-between text-xs font-mono text-foreground/60 mb-2.5">
          <span className="flex items-center gap-1.5 font-heading text-gold font-medium">
            <Compass className="h-3.5 w-3.5" /> Geographies:
          </span>
          <span className="text-foreground/80">{topGeographies.join(" • ")}</span>
        </div>
        <div className="mt-3 border-t border-border pt-3">
          <span className="text-xs font-heading font-bold text-gold uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5" /> Prescribed Strategic Action:
          </span>
          <p className="font-body text-sm text-foreground mt-1.5 leading-relaxed">{recommendedAction}</p>
        </div>
      </div>
    </div>
  );
}