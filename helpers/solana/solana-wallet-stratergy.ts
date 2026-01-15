import { mnemonicToSeedSync, validateMnemonic } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";
import { WalletGeneratorStrategy, Keypair as WalletKeyPair } from "@/types/index";

export class SolanaWalletStrategy implements WalletGeneratorStrategy {
  getDerivationPath(index: number): string {
    return `m/44'/501'/${index}'/0'`;
  }

  validateMnemonic(mnemonic: string): boolean {
    return validateMnemonic(mnemonic);
  }

  async generateKeyPair(mnemonic: string, index: number): Promise<WalletKeyPair> {
    try {
      const seed = mnemonicToSeedSync(mnemonic);
      const path = this.getDerivationPath(index);
      const derivedSeed = derivePath(path, seed.toString("hex")).key;
      const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
      
      return {
        publicKey: Keypair.fromSecretKey(secret).publicKey.toBase58(),
        secretKey: bs58.encode(secret),
      };
    } catch (error) {
      throw new Error(`Failed to generate Solana keypair: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}