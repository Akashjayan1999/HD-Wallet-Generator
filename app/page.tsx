import BlockchainNetworkCard from "./components/blockchain-network-card";

export default function Home() {
  return (
    <main className="flex min-h-[calc(100vh-90px)] flex-col items-start justify-start width-container">
      <h1 className="text-3xl font-bold pt-18">HD Wallets Generator supports mutliple chains</h1>
      <h2 className="text-xl font-semibold pt-0">Choose your wallet to start</h2>
      <div className="flex gap-6  pt-5">
      <BlockchainNetworkCard />
      </div>
     </main>
  );
}
