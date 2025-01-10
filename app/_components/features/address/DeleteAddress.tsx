"use client";

import { deleteAddress } from "@/app/_lib/actions";
import Image from "next/image";

interface DeleteAddressProps {
  addressId: string;
}

function DeleteAddress({ addressId }: DeleteAddressProps) {
  return (
    <button
      onClick={() => deleteAddress(addressId)}
      type="button"
      className="px-4 py-2 border border-red-300 hover:bg-red-100 rounded-md flex-shrink-0 flex items-center justify-center gap-1.5 text-red-600"
      title="Delete Address"
    >
      <Image src="/trash.svg" alt="Delete Address" height={20} width={20} />
      <span>Delete</span>
    </button>
  );
}

export default DeleteAddress;
