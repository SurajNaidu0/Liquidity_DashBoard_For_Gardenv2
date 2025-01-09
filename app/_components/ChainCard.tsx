import Image from "next/image";
import Card from "@/app/_components/Card";
import AddTokenModal from "@/app/_components/AddTokenModal";
import { getWalletBalance, getWalletBalanceERC20 } from "../_lib/dataService";
import type { NetworkType, TokenType } from "@/app/_types/types";

interface ChainCardProps {
  chainData: NetworkType;
}

interface TokenProps {
  chainId: number;
  chainAddress: string;
  tokenData: TokenType;
  delayIndex: number;
}

async function ChainCard({ chainData }: ChainCardProps) {
  const {
    chainId,
    identifier,
    fillerAddresses: [chainAddress],
    networkLogo,
    name,
    assetConfig,
  } = chainData;

  const balance = await getWalletBalance(chainAddress, chainId);

  return (
    <Card>
      <div className="pb-2  font-medium w-full flex items-center gap-2 ">
        <Image src={networkLogo} alt={name} width={26} height={26} />
        <span className="text-xl inline-block mr-auto">{name}</span>

        <Image src="/gas-fill.svg" alt="gas" width={22} height={22} />
        <span className="text-sm">Gas: {Math.floor(balance)} Gwei</span>
      </div>

      <div className="px-1 space-y-2">
        {assetConfig.map((token, index) => (
          <Token
            key={token.name}
            chainId={chainId}
            chainAddress={chainAddress}
            tokenData={token}
            delayIndex={index}
          />
        ))}
      </div>

      <AddTokenModal chainIdentifier={identifier} />
    </Card>
  );
}

async function Token({
  chainId,
  chainAddress,
  tokenData,
  delayIndex,
}: TokenProps) {
  const { tokenAddress, logo, name } = tokenData;

  const balance = await getWalletBalanceERC20(
    chainAddress,
    chainId,
    tokenAddress,
    500 * (delayIndex + 1)
  );

  return (
    <div className="flex items-center justify-between text-base gap-2 text-lg">
      <Image src={logo} alt={name} width={18} height={18} />
      <span>{name}</span>
      <span className="ml-auto font-medium">{balance}</span>
    </div>
  );
}

export default ChainCard;
