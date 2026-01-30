import type { Metadata } from "next";
import { DM_Sans, Geist, Geist_Mono, Quicksand, Varela_Round } from "next/font/google";
import "./globals.css";
import { JotaiProvider } from "@/components/providers/jotai-provider";
import { Toaster } from "sonner";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


const quicksand = Quicksand({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-quicksand",
});

const dmSans = DM_Sans({
  weight: ["100","200","300","400", "500","600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const varelaRound = Varela_Round({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-varela-round",
});

export const metadata: Metadata = {
  title: "HD Wallets Generator",
  description: "Generate Hierarchical Deterministic (HD) Wallets with ease and security.",
  icons:{
    icon: "/wallet.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable}  ${quicksand.variable} ${varelaRound.variable} ${dmSans.variable} antialiased font-quicksand`}
      >
          <Toaster /> 
        <JotaiProvider>
        {children}
        </JotaiProvider> 
      </body>
    </html>
  );
}
