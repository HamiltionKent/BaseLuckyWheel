import { toHex, type Hex } from "viem";

type DataSuffixInput = {
  codes: string[];
};

export const Attribution = {
  toDataSuffix({ codes }: DataSuffixInput): Hex {
    const normalized = codes.filter(Boolean).join("|");
    if (!normalized) return "0x";
    return toHex(`erc8021:${normalized}`) as Hex;
  }
};
