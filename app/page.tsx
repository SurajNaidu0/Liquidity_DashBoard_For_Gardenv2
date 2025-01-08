import BitcoinCard from "@/app/_components/BitcoinCard";
import ChainCard from "@/app/_components/ChainCard";
import { bitcoinData, chainData } from "@/app/_utils/mockData";

export default function Page() {
  return (
    <main className="px-4 sm:p-8 max-w-[90rem] mx-auto">
      <h1 className="text-3xl text-center font-bold my-12">
        Liquidity Dashboard
      </h1>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(22rem,1fr))] gap-6">
        <BitcoinCard {...bitcoinData} />

        {chainData.map((chain, index) => (
          <ChainCard key={index} {...chain} />
        ))}
      </div>
    </main>
  );
}
