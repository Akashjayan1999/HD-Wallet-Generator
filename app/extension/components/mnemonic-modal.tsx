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
import { EyeClosed, Eye } from "lucide-react";
import useToggle from "@/hooks/use-toggle";
interface MnemonicModelProps {
  open: boolean;
  onClose: () => void;
}
const MnemonicModel = ({ open, onClose }: MnemonicModelProps) => {
  const [mnemonicPhrase] = useAtom(mnemonicPhraseAtom);
 const [showPhrase, setShowPhrase] = useToggle(false);
  const mnemonicArray = mnemonicPhrase.split(" ");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(mnemonicPhrase);
    toast.success("Copied to clipboard!");
  };

  const handleShowPhrase = () => {
    setShowPhrase();
  };
  return (
    <AlertDialog open={open} onOpenChange={onClose} >
      <AlertDialogContent isInsideExtension={true}  className="w-70 fixed left-8 top-10 h- translate-x-0 translate-y-0 rounded-l-lg data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left "
        >
        <AlertDialogHeader>
          <AlertDialogTitle>Secret(Metadata) Phrase</AlertDialogTitle>
          <h3 className="font-semibold text-sm text-gray-600 dark:text-gray-300 mx-auto pb-3">Please Keep this Phrase safely</h3>
          <AlertDialogDescription className="flex flex-col gap-4 text-balance " >
            <div className="grid grid-cols-1 lg:grid-cols-2  gap-2">
              {mnemonicArray.map((word, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2 border rounded-lg bg-gray-50 dark:bg-gray-800"
                >
                  <span className="font-mono font-semibold text-gray-500 dark:text-gray-400">
                    {index + 1}.
                  </span>
                  <span className="font-mono text-gray-900 dark:text-gray-100">
                    {showPhrase ? word : "*".repeat(word.length)}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-between">
            <div
              className="flex items-center cursor-pointer pt-2"
              onClick={copyToClipboard}
            >
              <Copy className="text-muted-foreground text-sm" size={23} />
              <span className="ml-2 text-base text-muted-foreground">
                Click  To Copy
              </span>
            </div>
            {showPhrase ? (
              <div className="flex items-center cursor-pointer pt-2">
                <EyeClosed className="text-muted-foreground text-sm" size={23} onClick={handleShowPhrase}/>
                
              </div>
            ) : (
              <div className="flex items-center cursor-pointer pt-2">
                <Eye className="text-muted-foreground text-sm" size={23} onClick={handleShowPhrase}/>
              </div>
            )}
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
