"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";

export function WalletButton() {
  const { isConnected } = useAccount();
  const { connectors, connect, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <button className="btn btn-muted" onClick={() => disconnect()} type="button">
        Disconnect
      </button>
    );
  }

  const preferredConnector = connectors[0];
  if (!preferredConnector) {
    return (
      <button className="btn btn-muted" disabled type="button">
        Wallet unavailable
      </button>
    );
  }

  return (
    <button
      className="btn btn-primary"
      disabled={isPending}
      onClick={() => connect({ connector: preferredConnector })}
      type="button"
    >
      {isPending ? "Connecting..." : `Connect ${preferredConnector.name}`}
    </button>
  );
}
