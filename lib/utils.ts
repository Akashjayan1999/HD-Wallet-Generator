import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import bs58 from "bs58";
import { Keypair } from "@solana/web3.js";
import { Keypair as SolanaKeypair } from "@/types/index";

import { HDNodeWallet, Wallet } from "ethers";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const supportedChains = [
  {
    name: "Ethereum",
    icon: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=024",
    chainId: 1,
    rpcUrl: "",
    blockExplorerUrl: "https://etherscan.io",
  },
  {
    name: "Solana",
    icon: "https://cryptologos.cc/logos/solana-sol-logo.svg?v=024",
    chainId:101,
    rpcUrl: "",
    blockExplorerUrl: "https://solscan.io",
  },
   ]


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


const EthereumKeyPairGenWithMnemonic = async (mnemonic: string,index:number) => {
  const seed = mnemonicToSeedSync(mnemonic);
  const path = `m/44'/60'/${index}'/0'`;
  const hdNode = HDNodeWallet.fromSeed(seed);
  const child = hdNode.derivePath(path);
  const secretKey = child.privateKey;
  const publicKey = child.publicKey;
  
  const newKeypair:SolanaKeypair = {
      publicKey: publicKey,
      secretKey: secretKey
  };
   return newKeypair;
}

export { solanaKeyPairGenWithMnemonic ,EthereumKeyPairGenWithMnemonic,supportedChains}
