"use client"

import { Button } from "@/components/ui/button";
import { BlockchainType, Keypair } from "@/types/index"
import { Eye, EyeOff, Trash } from "lucide-react";
import { usePathname } from "next/navigation"
import { useState } from "react";
import { useConfirm } from "@/components/providers/confirmation-provider";
import { solanaKeyPairGenWithMnemonic } from "@/lib/utils";
import { useWalletService} from "@/hooks/use-wallet-service";
import { toast } from "sonner";
interface SecretWalletProps {
  keys: Keypair[];
  secretPhase: string;
  setKeys: React.Dispatch<React.SetStateAction<Array<Keypair>>>;
  setSecretPhase: React.Dispatch<React.SetStateAction<string>>;
}
const SecretWallet = ({ keys, secretPhase,setKeys,setSecretPhase }: SecretWalletProps) => {
const pathname = usePathname().replace('/', '');
const [showKeyIndex, setShowKeyIndex] = useState<number>(-1);
const { confirm } = useConfirm();
const walletService = useWalletService(pathname as BlockchainType);
const removeItemFromWallet = async(index: number) => {
     const result = await confirm({
      title: "Delete Item",
      message: "Are you sure you want to delete this item?",
      confirmText: "Delete",
      cancelText: "Cancel"
    });
    if(!result) return;

    const newKeys = keys.filter((_, i) => i !== index);
    setKeys(newKeys);
}

const removePhraseAndWallet = async() => {
    const result = await confirm({
      title: "Delete Wallet",
      message: "Are you sure you want to delete this wallet?",
      confirmText: "Delete",
      cancelText: "Cancel"
    });
    if(!result) return;
    setSecretPhase("");
    setKeys([]);
}

const AddWallet = async() => {
    try{
        const keyPair = await walletService.generateKeyPair(secretPhase,keys.length);
    //   const newKeypair = await solanaKeyPairGenWithMnemonic(secretPhase,keys.length);
      setKeys(prev => [...prev, keyPair]);
    } 
    catch(error: any){
        toast.error(error?.message||"An error occurred while generating the wallet.");
    }
  
}

  return (
    <div className="pt-20">
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-extrabold">{pathname} Wallet</h1>
            <div className="flex gap-2 items-center ">
                <Button className="cursor-pointer" onClick={AddWallet}>Add Wallet</Button>
                <Button variant="destructive" className="cursor-pointer" onClick={removePhraseAndWallet}>Clear Wallet</Button>
            </div>

        </div>

        
            <div className="pt-5">
                {keys.map((key, index) => (
                   <div key={index} className="w-full border mt-3  rounded-xl border-gray-300 dark:border-gray-700">
                    <div className="flex justify-between items-center font-mono py-3 px-5">
                    <div className="text-3xl font-bold">Wallet {index + 1}</div>
                    <Trash className="text-red-500 hover:text-red-700 cursor-pointer" size={18} onClick={()=>{removeItemFromWallet(index)}} />
                    </div>
                    <div className="bg-gray-200 font-mono rounded-xl">
                        <div className="py-3 px-5">
                            <div className="font-quicksand text-2xl font-bold">Public Key</div>
                            <div className="font-mono pt-1">{key.publicKey}</div>
                        </div>
                        <div className="py-3 px-5">
                            <div className="font-quicksand text-2xl font-bold">Private Key</div>
                          <div className="flex justify-between items-center"> <div className="font-mono pt-1">{index==showKeyIndex?key.secretKey:"•••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••"}</div>
                         {index==showKeyIndex?<EyeOff className="cursor-pointer" onClick={()=>{setShowKeyIndex(-1)}}/>:
                            <Eye className="cursor-pointer" onClick={()=>{setShowKeyIndex(index)}}/>} </div> 
                        </div>

                    </div>
                   </div>
                ))}
          
        </div>
      
    </div>
  )
}

export default SecretWallet
