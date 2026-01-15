import { generateMnemonic } from "bip39";
import { WalletGeneratorFactory } from "./wallet-generator-factory";
import { BlockchainType, Keypair } from "@/types";

export class WalletHelper {
  private blockchain: BlockchainType;
  
  constructor(blockchain: BlockchainType = BlockchainType.SOLANA) {
    this.blockchain = blockchain;
  }

  
  setBlockchain(blockchain: BlockchainType): void {
    this.blockchain = blockchain;
  }

  
  generateMnemonic(): string {
    return generateMnemonic();
  }

  
  validateMnemonic(mnemonic: string): boolean {
    const trimmedMnemonic = mnemonic.trim();
    
    // Check word count
    if (trimmedMnemonic.split(" ").length !== 12) {
      return false;
    }

    const strategy = WalletGeneratorFactory.getStrategy(this.blockchain);
    return strategy.validateMnemonic(trimmedMnemonic);
  }

  
  async generateKeyPair(mnemonic: string, index: number = 0): Promise<Keypair> {
    const strategy = WalletGeneratorFactory.getStrategy(this.blockchain);
    return strategy.generateKeyPair(mnemonic, index);
  }

  
  async generateNewWallet(): Promise<{ mnemonic: string; keyPair: Keypair }> {
    const mnemonic = this.generateMnemonic();
    const keyPair = await this.generateKeyPair(mnemonic, 0);
    
    return { mnemonic, keyPair };
  }

  
  async importWallet(mnemonic: string, startIndex: number = 0): Promise<Keypair> {
    if (!this.validateMnemonic(mnemonic)) {
      throw new Error("Invalid mnemonic phrase");
    }
    
    return this.generateKeyPair(mnemonic, startIndex);
  }

  
  async generateMultipleKeyPairs(
    mnemonic: string, 
    count: number, 
    startIndex: number = 0
  ): Promise<Keypair[]> {
    if (!this.validateMnemonic(mnemonic)) {
      throw new Error("Invalid mnemonic phrase");
    }

    const keyPairs: Keypair[] = [];
    
    for (let i = 0; i < count; i++) {
      const keyPair = await this.generateKeyPair(mnemonic, startIndex + i);
      keyPairs.push(keyPair);
    }
    
    return keyPairs;
  }
}