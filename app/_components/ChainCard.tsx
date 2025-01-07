import Image from "next/image";
import type { Token } from "../_types/types";
import Card from "./Card";

interface ChainCardProps extends Token {
  tokens: Token[];
}

export function ChainCard({ name, logo, balance, tokens }: ChainCardProps) {
  return (
    <Card>
      <div className="pb-2  font-medium w-full flex items-center gap-2 ">
        <Image src={logo} alt={name} width={26} height={26} />
        <span className="text-xl inline-block mr-auto">{name}</span>

        <Image src="/gas-fill.svg" alt="gas" width={22} height={22} />
        <span className="text-sm">Gas: 123 Gwei</span>
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

      <button className="hover:bg-stone-100 w-full flex items-center justify-center gap-2 px-4 py-2 border rounded-md mt-auto">
        <Image src="/plus.svg" alt="add" height={16} width={16} />
        <span>Add Token</span>
      </button>
    </Card>
  );
}
