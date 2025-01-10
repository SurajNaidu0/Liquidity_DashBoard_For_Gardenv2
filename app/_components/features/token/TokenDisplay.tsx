"use client";

import Image from "next/image";
import { useState } from "react";
import { deleteToken } from "@/app/_lib/actions";

interface TokenDisplayProps {
  userId: string;
  chainIdentifier: string;
  logo: string;
  symbol: string;
  balance: number;
}

function TokenDisplay({
  userId,
  chainIdentifier,
  logo,
  symbol,
  balance,
}: TokenDisplayProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      className="flex items-center justify-between gap-2 hover:bg-stone-200 cursor-default px-2 py-1.5 rounded-md"
    >
      <Image src={logo} alt={symbol} width={18} height={18} />

      <span>{symbol}</span>

      {isHovered && (
        <button
          aria-label="Delete Token"
          title="Delete Token"
          onClick={() => deleteToken(userId, chainIdentifier, symbol)}
        >
          <Image src="/trash.svg" alt="Delete" height={18} width={18} />
        </button>
      )}

      <span className="ml-auto font-medium">{balance.toFixed(2)}</span>
    </div>
  );
}

export default TokenDisplay;
