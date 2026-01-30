"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { useWalletService} from "@/hooks/use-wallet-service";
import { BlockchainType } from "@/types";
import { walletStateAtom,mnemonicPhraseAtom } from "@/store/wallet";
import { useAtom } from "jotai";
import { Textarea } from "@/components/ui/textarea";
const ImportWallet = () => {
  const [userInput, setUserInput] = React.useState<string>("");
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const walletService = useWalletService();
  const [,dispatch] = useAtom(walletStateAtom);
  const [mnemonicPhrase] = useAtom(mnemonicPhraseAtom);
  const generateWallet = async () => {
    try {
       const keyPair = await walletService.importWallet(userInput);
       dispatch({ type: 'SET_MNEMONIC', payload: userInput });
       dispatch({ type: 'SET_WALLETS', payload: [keyPair] });
       dispatch({ type: 'SET_ACTIVE_WALLET', payload: keyPair });
        
    } catch (error:Error | any) {
        console.log("Error importing wallet:", error);
        setErrorMessage("Invalid mnemonic.");
    }
   
  };
  console.log("mnemonicPhrase",mnemonicPhrase);

 
  return (
    <div className="w-full h-full flex flex-col justify-center p-3  gap-4">
      <Textarea
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Enter your secret phrase( or leave blank to generate)"
        className=""
      />
      {errorMessage && (
        <p className="text-red-500 text-sm text-center">{errorMessage}</p>
      )}
      <Button  onClick={generateWallet}>Generate Wallet</Button>
    </div>
  );
};

export default ImportWallet;
