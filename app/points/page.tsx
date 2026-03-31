"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { LuckyHeader } from "@/components/LuckyHeader";
import { PointsPanel } from "@/components/PointsPanel";
import { WalletButton } from "@/components/WalletButton";
import { useLuckyWheelStatus } from "@/hooks/useLuckyWheelStatus";

type LastSpin = {
  txHash: string;
  win: boolean | null;
};

export default function PointsPage() {
  const { isConnected, points, isLoading, shortAddress } = useLuckyWheelStatus();
  const [lastSpinResult, setLastSpinResult] = useState<string>("");

  useEffect(() => {
    const raw = localStorage.getItem("baseLuckyWheel:lastSpin");
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as LastSpin;
      const shortHash = `${parsed.txHash.slice(0, 10)}...${parsed.txHash.slice(-8)}`;
      if (parsed.win === true) setLastSpinResult(`Win (+5) · ${shortHash}`);
      else if (parsed.win === false) setLastSpinResult(`No points · ${shortHash}`);
      else setLastSpinResult(`Submitted · ${shortHash}`);
    } catch {}
  }, []);

  return (
    <main className="page-shell">
      <section className="content-wrap">
        <LuckyHeader subtitle="Your achievement card" />
        <div className="card wallet-strip">
          <div>
            <p className="muted-label">Wallet</p>
            <p className="mono">{shortAddress}</p>
          </div>
          <WalletButton />
        </div>
        {isConnected ? (
          <PointsPanel
            isConnected={isConnected}
            isLoading={isLoading}
            latestResult={lastSpinResult}
            points={points}
            shortAddress={shortAddress}
          />
        ) : (
          <section className="card">
            <p>Connect wallet to view your points.</p>
          </section>
        )}
        <Link className="btn btn-primary" href="/">
          Back To Spin
        </Link>
      </section>
      <BottomNav />
    </main>
  );
}
