import BitcoinCard from "@/app/_components/BitcoinCard";
import ChainCard from "@/app/_components/ChainCard";
import config from "@/app/_lib/config.json";
import type { NetworkType } from "./_types/types";

export default function Page() {
  const bitcoinData: NetworkType = config.data.networks.find(
    (network) => network.identifier === "bitcoin"
  )!;
  const evmChainsData: NetworkType[] = config.data.networks.filter(
    (network) => network.identifier !== "bitcoin"
  );

  return (
    <main className="px-4 sm:p-8 max-w-[90rem] mx-auto">
      <h1 className="text-3xl text-center font-bold my-12">
        Liquidity Dashboard
      </h1>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(22rem,1fr))] gap-6">
        {bitcoinData && <BitcoinCard bitcoinData={bitcoinData} />}

        {evmChainsData.map((chain) => (
          <ChainCard key={chain.identifier} chainData={chain} />
        ))}
      </div>
    </main>
  );
}
