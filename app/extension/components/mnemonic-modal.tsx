import React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { mnemonicPhraseAtom } from "@/store/wallet";
import { useAtom } from "jotai";
import { Copy } from "lucide-react";
import { toast } from "sonner";
interface MnemonicModelProps {
  open: boolean;
  onClose: () => void;
}
const MnemonicModel = ({ open, onClose }: MnemonicModelProps) => {
  const [mnemonicPhrase] = useAtom(mnemonicPhraseAtom);

  const mnemonicArray = mnemonicPhrase.split(" ");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(mnemonicPhrase);
    toast.success("Copied to clipboard!");
  };
  return (
    <AlertDialog open={open} onOpenChange={onClose} >
      <AlertDialogContent isInsideExtension={true}  className="w-70 fixed left-8 top-10 h- translate-x-0 translate-y-0 rounded-l-lg data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left "
        >
        <AlertDialogHeader>
          <AlertDialogTitle>Secret(Metadata) Phrase</AlertDialogTitle>
          <AlertDialogDescription className="flex flex-col gap-4 text-balance cursor-pointer" onClick={copyToClipboard}>
            <div className="grid grid-cols-1 lg:grid-cols-2  gap-4">
              {mnemonicArray.map((word, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2 border rounded-lg bg-gray-50 dark:bg-gray-800"
                >
                  <span className="font-mono font-semibold text-gray-500 dark:text-gray-400">
                    {index + 1}.
                  </span>
                  <span className="font-mono text-gray-900 dark:text-gray-100">
                    {word}
                  </span>
                </div>
              ))}
            </div>
            <div
              className="flex items-center cursor-pointer pt-2"
              
            >
              <Copy className="text-muted-foreground text-sm" size={23} />
              <span className="ml-2 text-base text-muted-foreground">
                Click  To Copy
              </span>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="">
            <div className="flex justify-center items-center w-full">
              <AlertDialogCancel >Close</AlertDialogCancel>
            </div>
          
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default MnemonicModel;
