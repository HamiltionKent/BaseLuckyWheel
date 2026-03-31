import { StatusChip } from "@/components/StatusChip";

type WheelCardProps = {
  points: bigint;
  isSpinning: boolean;
  resultText?: string;
  win?: boolean | null;
};

export function WheelCard({ points, isSpinning, resultText, win }: WheelCardProps) {
  const tone = win === true ? "success" : win === false ? "warning" : "default";

  return (
    <section className="card wheel-card">
      <div className={`wheel-core ${isSpinning ? "is-spinning" : ""}`} aria-hidden>
        <div className="wheel-ring" />
        <div className="wheel-dot" />
      </div>
      <div className="wheel-meta">
        <StatusChip label={`Points ${points.toString()}`} tone="default" />
        {resultText ? <StatusChip label={resultText} tone={tone} /> : null}
      </div>
    </section>
  );
}
