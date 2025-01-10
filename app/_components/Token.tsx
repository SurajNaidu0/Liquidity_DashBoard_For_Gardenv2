import Image from "next/image";
import { getWalletBalanceERC20 } from "@/app/_lib/dataService";
import type { TokenType } from "../_types/types";

interface TokenProps {
  fillerAddress: string;
  chainId: number;
  tokenData: TokenType;
  delayIndex: number;
}

async function Token({
  chainId,
  fillerAddress,
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
    <div className="flex items-center justify-between gap-2">
      <Image src={logo} alt={symbol} width={18} height={18} />
      <span>{symbol}</span>
      <span className="ml-auto font-medium">{balance}</span>
    </div>
  );
}

export default Token;
