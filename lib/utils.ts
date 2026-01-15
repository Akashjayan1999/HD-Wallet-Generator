import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import bs58 from "bs58";
import { Keypair } from "@solana/web3.js";
import { Keypair as SolanaKeypair } from "@/types/index";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


const solanaKeyPairGenWithMnemonic = async (mnemonic: string,index:number) => {
  const seed = mnemonicToSeedSync(mnemonic);
  const path = `m/44'/501'/${index}'/0'`;
  const derivedSeed = derivePath(path, seed.toString("hex")).key;
  const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
  const newKeypair:SolanaKeypair = {
      publicKey: Keypair.fromSecretKey(secret).publicKey.toBase58(),
      secretKey: bs58.encode(secret)
  };
  return newKeypair;
}

export { solanaKeyPairGenWithMnemonic }
