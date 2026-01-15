import { notFound } from "next/navigation";
import HeroSection from "./components/hero-section"
export default async function Page({
  params,
}: {
  params: Promise<{ network: string }>
}) {
  const { network } = await params
  const avaliableNetworks = ['Ethereum', 'Solana'];
  
  if (!avaliableNetworks.includes(network)) {
    return notFound();
  }
  return (
    <main className=" min-h-[calc(100vh-90px)]   width-container">
      <HeroSection />
     </main>
  )
}