"use client"

import { useState } from "react"
import { usePathname } from 'next/navigation';
import GenerateInputSection from "./generate-input-section";
import { Keypair } from "@/types/index";
import SecretPhrase from "./secrect-phrase";
import SecretWallet from "./wallet";
export default function HeroSection() {
  const pathname = usePathname().replace('/', '');

  const [secretPhase, setSecretPhase] = useState<string>("")
  const [keys, setKeys] = useState<Array<Keypair>>([])


  console.log({keys});
  return (
    <div>
      {
        secretPhase.length >0 ?
        <div className="w-full flex  gap-4">
          <>
          <div className="gap-6  pt-16 w-full">
           <SecretPhrase secretPhrase={secretPhase} />
           <SecretWallet keys={keys} secretPhase={secretPhase} setKeys={setKeys} setSecretPhase={setSecretPhase}/>
           </div>
          </>
          
        </div>
        : 
        <>
        <h1 className="text-4xl font-extrabold pt-18">Secret Recovery Phrase</h1>
        <h2 className="text-xl font-semibold pt-0">Save these words in a safe place.</h2>
         <div className="gap-6  pt-5 w-full">
        <GenerateInputSection setSecretPhase={setSecretPhase} setKeys={setKeys} /> 
        </div>
        </>
      }
      
    </div>
  )
}
