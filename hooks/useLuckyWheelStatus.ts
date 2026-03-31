"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useAccount, usePublicClient } from "wagmi";
import { luckyWheelContract } from "@/lib/contracts";

type WheelStatus = {
  address?: `0x${string}`;
  shortAddress: string;
  isConnected: boolean;
  points: bigint;
  isLoading: boolean;
  refreshPoints: () => Promise<void>;
};

function shortenAddress(address?: string) {
  if (!address) return "Not connected";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function useLuckyWheelStatus(): WheelStatus {
  const { address, isConnected } = useAccount();
  const publicClient = usePublicClient();
  const [points, setPoints] = useState<bigint>(0n);
  const [isLoading, setIsLoading] = useState(false);

  const refreshPoints = useCallback(async () => {
    if (!address || !publicClient) {
      setPoints(0n);
      return;
    }

    setIsLoading(true);
    try {
      const nextPoints = await publicClient.readContract({
        ...luckyWheelContract,
        functionName: "points",
        args: [address]
      });
      setPoints(nextPoints);
    } catch {
      setPoints(0n);
    } finally {
      setIsLoading(false);
    }
  }, [address, publicClient]);

  useEffect(() => {
    void refreshPoints();
  }, [refreshPoints]);

  const shortAddress = useMemo(() => shortenAddress(address), [address]);

  return {
    address,
    shortAddress,
    isConnected,
    points,
    isLoading,
    refreshPoints
  };
}
