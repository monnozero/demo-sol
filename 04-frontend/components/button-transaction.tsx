"use client";

import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  TOKEN_2022_PROGRAM_ID,
  getAssociatedTokenAddressSync,
} from "@solana/spl-token";
import { program, getIdentityPDA } from "@/anchorPlat/setup";
import { Button } from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";
import { PublicKey } from "@solana/web3.js";

export default function ButtonTransaction() {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    if (!publicKey) return;

    setIsLoading(true);

    try {
      const associatedTokenAccount = getAssociatedTokenAddressSync(
        getIdentityPDA("demo113.ID"),
        publicKey,
        false,
        TOKEN_2022_PROGRAM_ID
      );

      const transaction = await program.methods
        .addPermissions("demo113.ID", ["plat-app-id-1", "plat-app-id-2"])
        .accounts({
            // @ts-ignore
      identity: getIdentityPDA("demo113.ID"),
      account:  associatedTokenAccount
          // user: publicKey,
          // tokenAccount: associatedTokenAccount,
        })
        .transaction();

      const transactionSignature = await sendTransaction(
        transaction,
        connection
      );

      toast.success(
        <a
          href={`https://solana.fm/tx/${transactionSignature}?cluster=devnet-alpha`}
          target="_blank"
        >
          View on SolanaFM
        </a>,
        {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        className="w-24"
        onClick={onClick}
        isLoading={isLoading}
        isDisabled={!publicKey}
      >
        {isLoading ? "" : "Transaction Plats"}
      </Button>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
}
