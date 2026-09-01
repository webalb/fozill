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
    <div className="relative rounded-xl border border-[#2C3138] bg-[#181B1E]/90 p-6 shadow-2xl backdrop-blur-md">
      <div className="flex items-center justify-between border-b border-[#2C3138] pb-3.5">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#D8A83E] animate-pulse" />
          <span className="font-mono text-xs font-semibold tracking-wider text-[#D8A83E] uppercase">
            {classification}
          </span>
        </div>
        <span className="font-mono text-xs text-[#F5F5F2]/50">TARGET: {targetEntity}</span>
      </div>

      <div className="mt-5">
        <div className="flex justify-between text-xs font-mono text-[#F5F5F2]/60 mb-2">
          <span className="font-heading uppercase tracking-wide">Brand &amp; Perception Health</span>
          <span className="text-[#F5F5F2]">
            {healthScore.positive}% POS / {healthScore.neutral}% NEU / {healthScore.negative}% NEG
          </span>
        </div>
        <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-[#202428] border border-[#2C3138]">
          <div style={{ width: `${healthScore.positive}%` }} className="bg-[#10B981]" />
          <div style={{ width: `${healthScore.neutral}%` }} className="bg-[#8E95A2]" />
          <div style={{ width: `${healthScore.negative}%` }} className="bg-[#EF4444]" />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-lg bg-[#202428]/80 p-4 border border-[#2C3138]">
          <div className="flex items-center gap-2 text-xs font-heading font-semibold text-[#D8A83E] mb-1.5 uppercase tracking-wide">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>Velocity &amp; Shift</span>
          </div>
          <p className="font-body text-sm text-[#F5F5F2]/90 leading-relaxed">{keyShift}</p>
        </div>

        <div className="rounded-lg bg-[#202428]/80 p-4 border border-[#2C3138]">
          <div className="flex items-center gap-2 text-xs font-heading font-semibold text-[#D8A83E] mb-1.5 uppercase tracking-wide">
            <Users className="h-3.5 w-3.5" />
            <span>Dominant Narrative</span>
          </div>
          <p className="font-body text-sm text-[#F5F5F2]/90 leading-relaxed">{dominantNarrative}</p>
        </div>
      </div>

      <div className="mt-4 rounded-lg bg-[#202428]/80 p-4 border border-[#2C3138]">
        <div className="flex items-center justify-between text-xs font-mono text-[#F5F5F2]/60 mb-2.5">
          <span className="flex items-center gap-1.5 font-heading text-[#D8A83E] font-medium">
            <Compass className="h-3.5 w-3.5" /> Geographies:
          </span>
          <span className="text-[#F5F5F2]/80">{topGeographies.join(" • ")}</span>
        </div>
        <div className="mt-3 border-t border-[#2C3138] pt-3">
          <span className="text-xs font-heading font-bold text-[#D8A83E] uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5" /> Prescribed Strategic Action:
          </span>
          <p className="font-body text-sm text-[#F5F5F2] mt-1.5 leading-relaxed">{recommendedAction}</p>
        </div>
      </div>
    </div>
  );
}
