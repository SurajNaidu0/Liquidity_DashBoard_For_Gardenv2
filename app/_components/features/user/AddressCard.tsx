import Image from "next/image";
import type { UserType } from "@/app/_types/types";
import ChainCard from "@/app/_components/features/chain/ChainCard";
import Card from "@/app/_components/Card";
import CopyClipboard from "@/app/_components/CopyClipboard";
import AddChain from "@/app/_components/features/chain/AddChain";
import EditAddress from "@/app/_components/features/user/EditAddress";
import DeleteAddress from "@/app/_components/features/user/DeleteAddress";

interface AddressCardProps {
  userData: UserType;
}

function UserCard({ userData }: AddressCardProps) {
  const { userId, username, fillerAddress, chains } = userData;

  return (
    <article className="bg-stone-100 p-8 rounded-2xl grid grid-rows-[auto,1fr] grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] gap-6">
      <section className="col-span-full flex gap-4 items-center">
        <div className="p-4 bg-slate-600 rounded-xl w-16 h-16 flex items-center justify-center">
          <Image src="/wallet.svg" alt="user" height={48} width={48} />
        </div>

        <div className="space-y-1">
          <h2 className="text-xl font-medium">{username}</h2>
          <div className="flex gap-2 items-center">
            <p className="text-sm">{fillerAddress}</p>
            <CopyClipboard
              className="flex-shrink-0 relative -top-[1.5px]"
              text={fillerAddress}
            >
              <Image src="/copy.svg" alt="Copy" height={20} width={20} />
            </CopyClipboard>
          </div>
        </div>

        <EditAddress userId={userId} />
        <DeleteAddress userId={userId} />
      </section>

      {chains.map((chain) => (
        <ChainCard
          key={chain.identifier}
          userId={userId}
          fillerAddress={fillerAddress}
          chainData={chain}
        />
      ))}

      <Card className="items-center justify-center">
        <AddChain userId={userId} />
      </Card>
    </article>
  );
}

export default UserCard;
