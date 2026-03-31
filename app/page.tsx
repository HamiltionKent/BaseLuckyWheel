"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { LuckyHeader } from "@/components/LuckyHeader";
import { SpinPanel } from "@/components/SpinPanel";
import { StatusChip } from "@/components/StatusChip";
import { WalletButton } from "@/components/WalletButton";
import { useLuckyWheelStatus } from "@/hooks/useLuckyWheelStatus";
import { useTrackedSpin } from "@/hooks/useTrackedSpin";
import { PLAY_FEE_LABEL } from "@/lib/contracts";

function getFriendlyError(error: unknown) {
  const raw = error instanceof Error ? error.message : "Transaction failed.";
  const lowered = raw.toLowerCase();
  if (lowered.includes("rejected")) return "Transaction canceled in wallet.";
  if (lowered.includes("insufficient")) return "Insufficient balance for gas or fee.";
  if (lowered.includes("connect wallet")) return "Connect wallet to spin.";
  return "Spin failed. Please try again.";
}

export default function HomePage() {
  const router = useRouter();
  const { isConnected, points, refreshPoints, shortAddress } = useLuckyWheelStatus();
  const { spinTracked, isSpinning } = useTrackedSpin();

  const [statusText, setStatusText] = useState("Ready to spin.");
  const [txHash, setTxHash] = useState<string | null>(null);
  const [win, setWin] = useState<boolean | null>(null);

  const onSpin = async () => {
    if (!isConnected) {
      setStatusText("Connect wallet to spin.");
      return;
    }

    setStatusText("Submitting transaction...");
    setWin(null);

    try {
      const { txHash: nextHash, win: nextWin } = await spinTracked();
      setTxHash(nextHash);
      setWin(nextWin ?? null);

      if (nextWin === true) {
        setStatusText("You won +5 points");
      } else if (nextWin === false) {
        setStatusText("No points this round");
      } else {
        setStatusText("Spin submitted. Your on-chain result has been recorded");
      }

      localStorage.setItem(
        "baseLuckyWheel:lastSpin",
        JSON.stringify({
          txHash: nextHash,
          win: nextWin ?? null,
          timestamp: Date.now()
        })
      );

      await refreshPoints();
      router.push("/points");
    } catch (error) {
      setStatusText(getFriendlyError(error));
    }
  };

  return (
    <main className="page-shell">
      <section className="content-wrap">
        <LuckyHeader subtitle="Playful score machine on Base" />
        <div className="card wallet-strip">
          <div>
            <p className="muted-label">Wallet</p>
            <p className="mono">{shortAddress}</p>
          </div>
          <WalletButton />
        </div>
        <SpinPanel
          feeLabel={PLAY_FEE_LABEL}
          isConnected={isConnected}
          isSpinning={isSpinning}
          onSpin={onSpin}
          points={points}
          resultText={statusText}
          txHash={txHash}
          win={win}
        />
        <div className="card status-row">
          <p className="muted-label">Status</p>
          <StatusChip label={isConnected ? "Wallet connected" : "Wallet not connected"} />
        </div>
      </section>
      <BottomNav />
    </main>
  );
}
