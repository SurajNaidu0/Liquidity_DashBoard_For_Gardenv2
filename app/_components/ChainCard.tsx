import Image from "next/image";
import Card from "@/app/_components/Card";
import AddToken from "@/app/_components/AddToken";
import { getWalletBalance } from "@/app/_lib/dataService";
import Token from "@/app/_components/Token";
import type { ChainType } from "@/app/_types/types";

interface ChainCardProps {
  userId: string;
  fillerAddress: string;
  chainData: ChainType;
}

async function ChainCard({ userId, fillerAddress, chainData }: ChainCardProps) {
  const { chainId, identifier, chainLogo, name, tokens } = chainData;

  const balance = await getWalletBalance(fillerAddress, chainId);

  return (
    <Card>
      <div className="pb-2 font-medium w-full flex items-center gap-2">
        <Image src={chainLogo} alt={name} width={26} height={26} />
        <h3 className="text-lg inline-block mr-auto">{name}</h3>

        <Image src="/gas-fill.svg" alt="gas" width={22} height={22} />
        <span className="text-sm">Gas: {Math.floor(balance)} Gwei</span>
      </div>

      <div className="px-1 space-y-2">
        {tokens.map((token, index) => (
          <Token
            key={token.name}
            fillerAddress={fillerAddress}
            chainId={chainId}
            tokenData={token}
            delayIndex={index}
          />
        ))}
      </div>

      <AddToken userId={userId} chainIdentifier={identifier} />
    </Card>
  );
}

export default ChainCard;
