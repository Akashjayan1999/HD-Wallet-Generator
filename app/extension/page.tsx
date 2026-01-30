'use client'
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { BlockchainType,Keypair as SolanaKeypair } from "@/types";
import { useWalletService} from "@/hooks/use-wallet-service";
import { toast } from "sonner";
import { walletStateAtom,mnemonicPhraseAtom } from "@/store/wallet";
import { useAtom } from "jotai";
import useToggle from "@/hooks/use-toggle";
import MnemonicModel from "./components/mnemonic-modal";

export default  function Page() {
  const [,dispatch] = useAtom(walletStateAtom);
  const [mnemonicPhrase] = useAtom(mnemonicPhraseAtom);
  const walletService = useWalletService("Solana" as BlockchainType);
  const [isOpen, toggleOpen] = useToggle();
  const generateWallet = async()=>{
  try{
     const { mnemonic, keyPair } = await walletService.generateNewWallet();
     dispatch({ type: 'SET_MNEMONIC', payload: mnemonic });
     dispatch({ type: 'SET_WALLETS', payload: [keyPair] });
     dispatch({ type: 'SET_ACTIVE_WALLET', payload: keyPair });
     toggleOpen();
  }catch(error: any){
    console.log(error);
    //toast.error(error?.message||"An error occurred while generating the wallet.");
  }
 

}

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-col justify-center items-center flex-1 ">
        <div >
        <div className="animate-bounce flex justify-center mb-3">
          <Image
            className="dark:invert"
            src="/wallet.png"
            alt="Next.js logo"
            width={35}
            height={10}
            priority
           />
           </div>
           <div>
            <div>
            <h1 className="text-2xl font-extrabold">HD Wallets Generator</h1>
            </div>
            <div className="flex flex-col gap-2 mt-5">
              <Button className="cursor-pointer" onClick={generateWallet}>Generate Wallet</Button>
              <Button className="cursor-pointer">Import Wallet</Button> 
            </div>
           </div>
           </div>
           
      </div>
         <div className="flex justify-center underline cursor-pointer">
            <a href="http://localhost:3000/browser" target="_blank" className="text-center text-base text-muted-foreground">Open in Browser</a>
          </div>
          {isOpen && <MnemonicModel open={isOpen} onClose={toggleOpen} />}
    </div>
  );
}
