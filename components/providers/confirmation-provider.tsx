"use client"

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  ReactNode,
} from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Define the shape of confirmation dialog options
interface ConfirmDialogOptions {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}

// Define the shape of the dialog state
interface ConfirmDialogState extends ConfirmDialogOptions {
  isOpen: boolean;
}

// Define the context value type
interface ConfirmDialogContextType {
  confirm: (data: ConfirmDialogOptions) => Promise<boolean>;
}

// Create the context with proper typing
const ConfirmDialogContext = createContext<ConfirmDialogContextType | null>(null);

export function ConfirmDialogProvider({ children }: { children: ReactNode }) {

  const [state, setState] = useState<ConfirmDialogState>({ 
    isOpen: false 
  });
  
 
  const fn = useRef<((choice: boolean) => void) | null>(null);

  
  const confirm = useCallback(
    (data: ConfirmDialogOptions): Promise<boolean> => {
      return new Promise((resolve) => {
        // Open the dialog with the provided options
        setState({ 
          ...data, 
          isOpen: true 
        });

        // Store the resolve function so we can call it later
        fn.current = (choice: boolean) => {
          resolve(choice); // Resolve the promise with true/false
          setState({ isOpen: false }); // Close the dialog
        };
      });
    },
    []
  );


  const handleClose = () => {
    fn.current?.(false);
  };

  // Handle confirm button click - resolves promise with true
  const handleConfirm = () => {
    fn.current?.(true);
  };

  return (
    <ConfirmDialogContext.Provider value={{ confirm }}>
      {children}
      
      <AlertDialog open={state.isOpen} onOpenChange={(open) => {
        if (!open) handleClose(); // Handle dialog close via escape key or backdrop click
      }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {state?.title || "Are you sure?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {state?.message || "This action cannot be undone."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleClose}>
              {state?.cancelText || "Cancel"}
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>
              {state?.confirmText || "Continue"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ConfirmDialogContext.Provider>
  );
}

// Custom hook to use the confirmation dialog
export function useConfirm() {
  const context = useContext(ConfirmDialogContext);
  
  if (!context) {
    throw new Error("useConfirm must be used within ConfirmDialogProvider");
  }
  
  return context;
}

export { ConfirmDialogContext };