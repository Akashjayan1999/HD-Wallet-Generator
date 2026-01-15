"use client"
import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import { usePathname } from 'next/navigation';
import { Keypair as SolanaKeypair } from "@/types/index";
import { generateMnemonic } from "bip39";
import { toast } from "sonner";


import React from "react";
import { solanaKeyPairGenWithMnemonic } from "@/lib/utils";
interface GenerateInputSectionProps {
  setSecretPhase: React.Dispatch<React.SetStateAction<string>>;
  setKeys: React.Dispatch<React.SetStateAction<Array<SolanaKeypair>>>;
}
const GenerateInputSection = ({setSecretPhase, setKeys}:GenerateInputSectionProps) => {
const pathname = usePathname().replace('/', '');
const InputRef = React.useRef<HTMLInputElement>(null);

const generateWallet = async () => {
// Checks if the input is empty
if (InputRef.current?.value === "") {
    try{
    const mnemonic = generateMnemonic();
    // const seed = mnemonicToSeedSync(mnemonic);
    // const path = `m/44'/501'/0'/0'`;
    // const derivedSeed = derivePath(path, seed.toString("hex")).key;
    // const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    // const newKeypair:SolanaKeypair = {
    //     publicKey: Keypair.fromSecretKey(secret).publicKey.toBase58(),
    //     secretKey: bs58.encode(secret)
    // };
    const newKeypair = await solanaKeyPairGenWithMnemonic(mnemonic,0);
    setKeys(prev => [...prev, newKeypair]);
    setSecretPhase(mnemonic);
    }
    catch(error: any){
        toast.error(error?.message||"An error occurred while generating the wallet.");
    }
    
}else{
    // validate the mnemonic
    let mnemonic = (InputRef.current?.value||"").trim() ;
    if(mnemonic.split(" ").length !== 12){
        toast.error("Invalid mnemonic.");
        return;
    }
    
    try{
    // const seed = mnemonicToSeedSync(mnemonic);
    // const path = `m/44'/501'/0'/0'`;
    // const derivedSeed = derivePath(path, seed.toString("hex")).key;
    // const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    // const newKeypair:SolanaKeypair = {
    //     publicKey: Keypair.fromSecretKey(secret).publicKey.toBase58(),
    //     secretKey: bs58.encode(secret)
    // };
    const newKeypair = await solanaKeyPairGenWithMnemonic(mnemonic,0);
    setKeys(prev => [...prev, newKeypair]);
    setSecretPhase(mnemonic);
    }catch(error: any){
        toast.error(error?.message||"Invalid mnemonic.");
    }
    
}

//   const mnemonic = generateMnemonic();
//   console.log("Mnemonic:", mnemonic);
// const seed = mnemonicToSeedSync("mnemonic");
// console.log("Seed:", seed);
// console.log("Seed:", seed.toString("hex"));
// for (let i = 0; i < 4; i++) {
// const path = `m/44'/501'/${i}'/0'`; // This is the derivation path
// const derivedSeed = derivePath(path, seed.toString("hex")).key;
// const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
// console.log(`Account ${i} secrect Key:`, bs58.encode(secret));
// console.log(Keypair.fromSecretKey(secret).publicKey.toBase58());
// }
}

  return (
    <div className="w-full flex  gap-4">
      <Input ref = {InputRef} type="password" placeholder="Enter your secret phrase( or leave blank to generate)" className="grow"/>
      <Button onClick={generateWallet}>Generate Wallet</Button>

    </div>
  )
}

export default GenerateInputSection
