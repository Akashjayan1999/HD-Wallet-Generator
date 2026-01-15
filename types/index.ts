interface Keypair{
    publicKey: string;
    secretKey: string;
}

export enum BlockchainType {
  SOLANA = 'Solana',
  ETHEREUM = 'Ethereum',
}

export interface WalletGeneratorStrategy {
  generateKeyPair(mnemonic: string, index: number): Promise<Keypair>;
  getDerivationPath(index: number): string;
  validateMnemonic(mnemonic: string): boolean;
}

export type { Keypair }