import { BlockchainType } from "@/types";
import { SolanaWalletStrategy } from "./solana/solana-wallet-stratergy";
import { EthereumWalletStrategy } from "./Ethereum/eth-wallet-stratergy";
import { WalletGeneratorStrategy } from "@/types";

export class WalletGeneratorFactory {
  private static strategies: Map<BlockchainType, WalletGeneratorStrategy> = new Map([
    [BlockchainType.SOLANA, new SolanaWalletStrategy()],
    [BlockchainType.ETHEREUM, new EthereumWalletStrategy()],
  ]);

  static getStrategy(blockchain: BlockchainType): WalletGeneratorStrategy {
    const strategy = this.strategies.get(blockchain);
    
    if (!strategy) {
      throw new Error(`Unsupported blockchain type: ${blockchain}`);
    }
    
    return strategy;
  }

  static getSupportedBlockchains(): BlockchainType[] {
    return Array.from(this.strategies.keys());
  }
}