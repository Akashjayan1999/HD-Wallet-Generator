'use client'
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { BlockchainType,Keypair as SolanaKeypair } from "@/types";
import { useWalletService} from "@/hooks/use-wallet-service";
import { toast } from "sonner";
import { walletStateAtom,mnemonicPhraseAtom,activeChainAtom } from "@/store/wallet";
import { useAtom } from "jotai";
import useToggle from "@/hooks/use-toggle";
import MnemonicModel from "./components/mnemonic-modal";
import { useRouter } from 'next/navigation';
export default  function Page() {
  const [walletState,dispatch] = useAtom(walletStateAtom);
  const [mnemonicPhrase] = useAtom(mnemonicPhraseAtom);
   const [activeChain] = useAtom(activeChainAtom);
  const [isOpen, toggleOpen] = useToggle()
  const router = useRouter();
    const walletService1 = useWalletService(BlockchainType.SOLANA);
    const walletService2 = useWalletService(BlockchainType.ETHEREUM);
  const generateWallet = async()=>{
  try{
  
    const { mnemonic, keyPair: keyPair1 }  = await walletService1.generateNewWallet();
    const keyPair2 = await walletService2.importWallet(mnemonic);

    
     dispatch({ type: 'SET_MNEMONIC', payload: mnemonic });
     dispatch({ type: 'SET_WALLETS', payload: { [BlockchainType.SOLANA]: [keyPair1], [BlockchainType.ETHEREUM]: [keyPair2] } });
      if(activeChain === BlockchainType.SOLANA){
             dispatch({ type: 'SET_ACTIVE_WALLET', payload: keyPair1 });
            }else{
             dispatch({ type: 'SET_ACTIVE_WALLET', payload: keyPair2 });
            }
            
     toggleOpen();
  }catch(error: any){
    console.log(error);
    //toast.error(error?.message||"An error occurred while generating the wallet.");
  }
 

}
 console.log("activeChain",activeChain);
 console.log("walletState",walletState);
  const handleImportWallet = () => {
    router.push("/extension/import-wallet");
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
              <Button className="cursor-pointer" onClick={handleImportWallet}>Import Wallet</Button> 
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
