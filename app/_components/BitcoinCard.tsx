import Image from "next/image";
import type { NetworkType } from "../_types/types";
import Card from "./Card";

interface BitcoinCardProps {
  bitcoinData: NetworkType;
}

async function BitcoinCard({ bitcoinData }: BitcoinCardProps) {
  return (
    <Card>
      <div className="pb-2  font-medium flex items-center gap-2">
        <Image
          src={bitcoinData.networkLogo}
          alt={bitcoinData.name}
          width={26}
          height={26}
        />
        <span className="text-xl">{bitcoinData.name}</span>
      </div>

      <p className="text-2xl font-bold">Balance</p>
    </Card>
  );
}

export default BitcoinCard;
