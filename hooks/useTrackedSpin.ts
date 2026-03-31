"use client";

import { useAccount, usePublicClient, useWriteContract } from "wagmi";
import { decodeEventLog } from "viem";
import { Attribution } from "ox/erc8021";
import { baseLuckyWheelAbi } from "@/lib/abi/baseLuckyWheelAbi";
import {
  APP_ID,
  APP_NAME,
  BUILDER_CODE,
  BUILDER_CODE_ENCODED,
  PLAY_FEE_WEI,
  luckyWheelContract
} from "@/lib/contracts";
import { trackTransaction } from "@/utils/track";

export type SpinTrackedResult = {
  txHash: `0x${string}`;
  win?: boolean;
};

const computedDataSuffix = Attribution.toDataSuffix({
  // Replace this with your real Builder Code.
  codes: [BUILDER_CODE]
});

const DATA_SUFFIX = (computedDataSuffix.toLowerCase() === BUILDER_CODE_ENCODED.toLowerCase()
  ? computedDataSuffix
  : BUILDER_CODE_ENCODED) as `0x${string}`;

export function useTrackedSpin() {
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const { writeContractAsync, isPending } = useWriteContract();

  const spinTracked = async (): Promise<SpinTrackedResult> => {
    if (!address) {
      throw new Error("Connect wallet before spinning.");
    }

    const txHash = await writeContractAsync({
      ...luckyWheelContract,
      functionName: "spin",
      value: PLAY_FEE_WEI,
      dataSuffix: DATA_SUFFIX
    });

    void trackTransaction(APP_ID, APP_NAME, address, txHash);

    let win: boolean | undefined;
    if (publicClient) {
      try {
        const receipt = await publicClient.waitForTransactionReceipt({
          hash: txHash
        });

        for (const log of receipt.logs) {
          try {
            const parsed = decodeEventLog({
              abi: baseLuckyWheelAbi,
              data: log.data,
              topics: log.topics
            });
            if (parsed.eventName !== "Played") continue;

            const logUser = String(parsed.args.user || "").toLowerCase();
            if (logUser !== address.toLowerCase()) continue;
            if (typeof parsed.args.win === "boolean") {
              win = parsed.args.win;
              break;
            }
          } catch {}
        }
      } catch {}
    }

    return { txHash, win };
  };

  return {
    spinTracked,
    isSpinning: isPending,
    dataSuffix: DATA_SUFFIX
  };
}
