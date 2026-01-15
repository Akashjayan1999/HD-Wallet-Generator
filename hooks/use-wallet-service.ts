import { useMemo } from 'react';
import { WalletHelper } from '@/helpers/wallet-helper-facade';
import { BlockchainType } from '@/types';

export const useWalletService = (blockchain: BlockchainType = BlockchainType.SOLANA) => {
  return useMemo(() => new WalletHelper(blockchain), [blockchain]);
};