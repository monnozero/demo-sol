import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";

import { IdlAccounts, Program, utils } from "@coral-xyz/anchor";
import type { PlatsId } from "./idlType";
import idl from "../anchorPlat/idl.json";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

export const program = new Program(idl as PlatsId, {
  connection,
});

export const getIdentityPDA = (nameId: string) => {
  const [pda] = PublicKey.findProgramAddressSync(
    [
      utils.bytes.utf8.encode("identity"),
      Buffer.from(nameId)
    ],
    program.programId
  );
  return pda;
};


export type CounterData = IdlAccounts<PlatsId>["identity"];
