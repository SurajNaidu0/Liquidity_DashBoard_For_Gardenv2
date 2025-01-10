import Image from "next/image";
import Card from "@/app/_components/Card";
import AddToken from "@/app/_components/AddToken";
import {
  getWalletBalance,
  getWalletBalanceERC20,
} from "@/app/_lib/dataService";
import TokenDisplay from "@/app/_components/Token";
import type { ChainType, TokenType } from "@/app/_types/types";

interface ChainCardProps {
  userId: string;
  fillerAddress: string;
  chainData: ChainType;
}

interface TokenProps {
  userId: string;
  fillerAddress: string;
  chainId: number;
  chainIdentifier: string;
  tokenData: TokenType;
  delayIndex: number;
}

async function ChainCard({ userId, fillerAddress, chainData }: ChainCardProps) {
  const { chainId, identifier, chainLogo, name, tokens } = chainData;

  const balance = await getWalletBalance(fillerAddress, chainId);

  return (
    <Card>
      <div className="font-medium w-full flex items-center gap-2">
        <Image src={chainLogo} alt={name} width={26} height={26} />
        <h3 className="text-lg inline-block mr-auto">{name}</h3>

        <Image src="/gas-fill.svg" alt="gas" width={22} height={22} />
        <span className="text-sm">Gas: {Math.floor(balance)} Gwei</span>
      </div>

      <div>
        {tokens.map((token, index) => (
          <Token
            key={token.name}
            userId={userId}
            fillerAddress={fillerAddress}
            chainId={chainId}
            chainIdentifier={identifier}
            tokenData={token}
            delayIndex={index}
          />
        ))}
      </div>

      <AddToken userId={userId} chainIdentifier={identifier} />
    </Card>
  );
}

async function Token({
  userId,
  fillerAddress,
  chainId,
  chainIdentifier,
  tokenData,
  delayIndex,
}: TokenProps) {
  const { tokenAddress, logo, symbol } = tokenData;

  const balance = await getWalletBalanceERC20(
    fillerAddress,
    chainId,
    tokenAddress,
    500 * (delayIndex + 1)
  );

  return (
    <TokenDisplay
      userId={userId}
      chainIdentifier={chainIdentifier}
      logo={logo}
      symbol={symbol}
      balance={balance}
    />
  );
}

export default ChainCard;
