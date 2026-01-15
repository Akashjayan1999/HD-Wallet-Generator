import { mnemonicToSeedSync, validateMnemonic } from "bip39";
import { HDNodeWallet } from "ethers";
import { WalletGeneratorStrategy, Keypair } from "@/types/index";

export class EthereumWalletStrategy implements WalletGeneratorStrategy {
  getDerivationPath(index: number): string {
    return `m/44'/60'/${index}'/0'`;
  }

  validateMnemonic(mnemonic: string): boolean {
    return validateMnemonic(mnemonic);
  }

  async generateKeyPair(mnemonic: string, index: number): Promise<Keypair> {
    try {
      const seed = mnemonicToSeedSync(mnemonic);
      const hdNode = HDNodeWallet.fromSeed(seed);
      const child = hdNode.derivePath(this.getDerivationPath(index));
      console.log("child",child);
      return {
        publicKey: child.address,
        secretKey: child.privateKey,
      };
    } catch (error) {
      throw new Error(`Failed to generate Ethereum keypair: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}