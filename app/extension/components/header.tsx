
'use client'
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {supportedChains} from "@/lib/utils";
import { BlockchainType } from "@/types";
import { walletStateAtom } from "@/store/wallet";
import { useAtom } from "jotai";
const Header = () => {
  const [walletState, dispatch] = useAtom(walletStateAtom);
  const handleChainChange = (value: string) => {
    const selectedChain = value as BlockchainType;
    
    
    dispatch({ type: 'SET_ACTIVE_CHAIN', payload: selectedChain });
    
    
    const walletsForChain = walletState.wallets[selectedChain];
    if (walletsForChain && walletsForChain.length > 0) {
      dispatch({ type: 'SET_ACTIVE_WALLET', payload: walletsForChain[0] });
    }
  };

  return (
    <header className=" px-2 py-3 shadow-sm">
      <div className="flex justify-between" >
        <Image
          className="dark:invert"
          src="/wallet.png"
          alt="Next.js logo"
          width={25}
          height={10}
          priority
        />
        <Select value={walletState.activeChain} onValueChange={handleChainChange}>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder="Select a chain" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Supported Chain</SelectLabel>
          {Object.entries(BlockchainType).map(([,value])=>
              <SelectItem value={value}>{value}</SelectItem>
          )}
          
       </SelectGroup>
      </SelectContent>
    </Select>
      </div>
    </header>
  );
};

export default Header;
