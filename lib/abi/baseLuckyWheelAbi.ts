export const baseLuckyWheelAbi = [
  {
    type: "function",
    name: "spin",
    stateMutability: "payable",
    inputs: [],
    outputs: []
  },
  {
    type: "function",
    name: "points",
    stateMutability: "view",
    inputs: [{ name: "", type: "address" }],
    outputs: [{ type: "uint256" }]
  },
  {
    type: "event",
    name: "Played",
    inputs: [
      { indexed: true, name: "user", type: "address" },
      { indexed: false, name: "win", type: "bool" }
    ],
    anonymous: false
  }
] as const;
