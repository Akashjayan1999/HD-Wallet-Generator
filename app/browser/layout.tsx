import { ThemeProvider } from "@/components/providers/theme-provider";
import Header from "../components/header";
import { Toaster } from "@/components/ui/sonner";
import { ConfirmDialogProvider } from "@/components/providers/confirmation-provider";

export default function BrowserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <ConfirmDialogProvider>
       
          <Header />

          {children}
        </ConfirmDialogProvider>
      </ThemeProvider>
    </>
  );
}
