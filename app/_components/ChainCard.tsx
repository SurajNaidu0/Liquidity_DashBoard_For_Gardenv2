import Image from "next/image";
import type { Token } from "@/app/_types/types";
import Card from "@/app/_components/Card";
import AddTokenModal from "@/app/_components/AddTokenModal";

interface ChainCardProps extends Token {
  tokens: Token[];
}

function ChainCard({ name, logo, balance, tokens }: ChainCardProps) {
  return (
    <Card>
      <div className="pb-2  font-medium w-full flex items-center gap-2 ">
        <Image src={logo} alt={name} width={26} height={26} />
        <span className="text-xl inline-block mr-auto">{name}</span>

        <Image src="/gas-fill.svg" alt="gas" width={22} height={22} />
        <span className="text-sm">Gas: {balance} Gwei</span>
      </div>

      <div className="px-1 space-y-2">
        {tokens.map((token, index) => (
          <div
            key={index}
            className="flex items-center justify-between text-base gap-2 text-lg"
          >
            <Image src={token.logo} alt={token.name} width={18} height={18} />
            <span>{token.name}</span>
            <span className="ml-auto font-medium">{token.balance}</span>
          </div>
        ))}
      </div>

      <AddTokenModal />
    </Card>
  );
}

export default ChainCard;
