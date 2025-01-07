import Image from "next/image";
import type { Token } from "../_types/types";
import Card from "./Card";

export function BitcoinCard({ name, logo, balance }: Token) {
  return (
    <Card>
      <div className="pb-2  font-medium flex items-center gap-2">
        <Image src={logo} alt={name} width={26} height={26} />
        <span className="text-xl">{name}</span>
      </div>

      <p className="text-2xl font-bold">{balance}</p>
    </Card>
  );
}
