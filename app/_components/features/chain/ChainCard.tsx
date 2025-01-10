import Image from "next/image";
import Card from "@/app/_components/Card";
import AddToken from "@/app/_components/features/token/AddToken";
import {
  getWalletBalance,
  getWalletBalanceERC20,
} from "@/app/_lib/dataService";
import TokenDisplay from "@/app/_components/features/token/TokenDisplay";
import type { ChainType, TokenType } from "@/app/_types/types";
import DeleteChain from "@/app/_components/features/chain/DeleteChain";

interface ChainCardProps {
  addressId: string;
  fillerAddress: string;
  chainData: ChainType;
}

interface TokenProps {
  addressId: string;
  fillerAddress: string;
  chainId: number;
  chainIdentifier: string;
  tokenData: TokenType;
  delayIndex: number;
}

async function ChainCard({
  addressId,
  fillerAddress,
  chainData,
}: ChainCardProps) {
  const { chainId, identifier, chainLogo, name, tokens } = chainData;

  const balance = await getWalletBalance(fillerAddress, chainId);

  return (
    <Card>
      <div className="font-medium w-full flex items-center gap-2">
        <Image src={chainLogo} alt={name} width={26} height={26} />
        <h3 className="text-lg inline-block mr-auto">{name}</h3>

        <Image src="/gas-fill.svg" alt="gas" width={22} height={22} />
        <span className="text-sm">Gas: {balance.toFixed(2)} Eth</span>
      </div>

      <div>
        {tokens.map((token, index) => (
          <Token
            key={token.name}
            addressId={addressId}
            fillerAddress={fillerAddress}
            chainId={chainId}
            chainIdentifier={identifier}
            tokenData={token}
            delayIndex={index}
          />
        ))}
      </div>

      <div className="flex mt-auto gap-2">
        <AddToken addressId={addressId} chainIdentifier={identifier} />
        <DeleteChain addressId={addressId} chainIdentifier={identifier} />
      </div>
    </Card>
  );
}

async function Token({
  addressId,
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
      addressId={addressId}
      chainIdentifier={chainIdentifier}
      logo={logo}
      symbol={symbol}
      balance={balance}
    />
  );
}

export default ChainCard;
