import { AnchorProvider } from "@coral-xyz/anchor";
import { useWallet } from "@solana/wallet-adapter-react";
import { clusterApiUrl, Connection } from "@solana/web3.js";
import { useMemo } from "react";

const network = clusterApiUrl("devnet");

export const useAnchorProvider = () => {
  const { publicKey, signTransaction, signAllTransactions } = useWallet();
  const connection = new Connection(network, "confirmed");

  const provider = useMemo(() => {
    if (!publicKey || !signTransaction || !signAllTransactions) return null;

    return new AnchorProvider(
      connection,
      {
        publicKey,
        signTransaction,
        signAllTransactions,
      },
      { commitment: "confirmed" }
    );
  }, [connection, publicKey, signTransaction, signAllTransactions]);

  return provider;
};
