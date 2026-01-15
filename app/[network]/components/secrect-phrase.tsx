"use client"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { toast } from "sonner";
import { Copy } from "lucide-react";

const SecretPhrase = ({secretPhrase}: {secretPhrase: string}) => {

 const mnemonicArray = secretPhrase.split(" ");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(secretPhrase);
    toast.success("Copied to clipboard!");
  };
  return (
    <div className="w-full border border-gray-300 dark:border-gray-700 rounded-xl p-4">
       <Accordion
      type="single"
      collapsible
      className="w-full"
      //defaultValue="item-1"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className="hover:no-underline cursor-pointer">
            <h1 className="text-3xl font-extrabold ">Your Secret Phrase</h1>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance cursor-pointer" onClick={copyToClipboard}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mnemonicArray.map((word, index) => (
              <div key={index} className="flex items-center gap-2 p-2 border rounded-lg bg-gray-50 dark:bg-gray-800">
                <span className="font-mono font-semibold text-gray-500 dark:text-gray-400">{index + 1}.</span>
                <span className="font-mono text-gray-900 dark:text-gray-100">{word}</span>
              </div>
            ))}
        </div>
          <div className="flex items-center cursor-pointer pt-2" onClick={copyToClipboard}>
            <Copy className="text-muted-foreground text-sm" size={23} />
            <span className="ml-2 text-base text-muted-foreground">Click AnyWhere To Copy</span>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
    </div>
  )
}

export default SecretPhrase
