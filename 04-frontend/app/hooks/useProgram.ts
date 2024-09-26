// import { Program, AnchorProvider } from "@coral-xyz/anchor";
// import idl from "../../anchorPlat/idl.json";
// import { PlatsId } from "../../anchorPlat/idlType";
// import { useAnchorProvider } from "@/app/hooks/useAnchorProvider";
// import { useMemo } from "react";

// export const useProgram = () => {
//   const provider = useAnchorProvider();

//   const program = useMemo(() => {
//     if (!provider) return null;
//     return new Program(idl as PlatsId, programId, provider);
//   }, [provider]);

//   return program;
// };