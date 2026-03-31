import { WheelCard } from "@/components/WheelCard";

type SpinPanelProps = {
  points: bigint;
  isConnected: boolean;
  isSpinning: boolean;
  feeLabel: string;
  txHash?: string | null;
  resultText?: string;
  win?: boolean | null;
  onSpin: () => Promise<void>;
};

function shortHash(hash?: string | null) {
  if (!hash) return "";
  return `${hash.slice(0, 10)}...${hash.slice(-8)}`;
}

export function SpinPanel({
  points,
  isConnected,
  isSpinning,
  feeLabel,
  txHash,
  resultText,
  win,
  onSpin
}: SpinPanelProps) {
  return (
    <section className="card spin-panel">
      <WheelCard isSpinning={isSpinning} points={points} resultText={resultText} win={win} />
      <button
        className="btn btn-spin"
        disabled={!isConnected || isSpinning}
        onClick={() => void onSpin()}
        type="button"
      >
        {isSpinning ? "Submitting..." : "Spin Now"}
      </button>
      <p className="helper-line">Play fee: {feeLabel}</p>
      {txHash ? <p className="helper-line">Last tx: {shortHash(txHash)}</p> : null}
    </section>
  );
}
