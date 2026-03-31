import { StatusChip } from "@/components/StatusChip";

type PointsPanelProps = {
  shortAddress: string;
  points: bigint;
  isLoading: boolean;
  isConnected: boolean;
  latestResult?: string;
};

export function PointsPanel({
  shortAddress,
  points,
  isLoading,
  isConnected,
  latestResult
}: PointsPanelProps) {
  return (
    <section className="card points-panel">
      <h2 className="panel-title">Points Card</h2>
      <div className="points-grid">
        <div>
          <p className="muted-label">Wallet status</p>
          <StatusChip label={isConnected ? "Connected" : "Disconnected"} tone="default" />
        </div>
        <div>
          <p className="muted-label">Current address</p>
          <p className="mono">{shortAddress}</p>
        </div>
        <div>
          <p className="muted-label">Current points</p>
          <p className="points-value">{isLoading ? "Loading..." : points.toString()}</p>
        </div>
      </div>
      {latestResult ? (
        <p className="helper-line">
          Latest result: <span className="mono">{latestResult}</span>
        </p>
      ) : null}
    </section>
  );
}
