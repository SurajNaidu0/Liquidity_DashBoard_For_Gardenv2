"use client";

import { deleteChain } from "@/app/_lib/actions";
import Image from "next/image";

interface DeleteChainProps {
  userId: string;
  chainIdentifier: string;
}

function DeleteChain({ userId, chainIdentifier }: DeleteChainProps) {
  return (
    <button
      onClick={() => deleteChain(userId, chainIdentifier)}
      type="button"
      className="h-full p-2 border border-red-300 hover:bg-red-100 rounded-md flex-shrink-0 aspect-square grid place-items-center"
      title="Delete Chain"
    >
      <Image src="/trash.svg" alt="Delete Chain" height={19} width={19} />
    </button>
  );
}

export default DeleteChain;
