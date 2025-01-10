import UserCard from "@/app/_components/UserCard";
import config from "@/app/_lib/config.json";
import type { ConfigType, UserType } from "@/app/_types/types";
import AddAddress from "@/app/_components/AddAddress";

export default function Page() {
  const {
    data: { users },
  }: ConfigType = config;

  return (
    <>
      <header className="flex justify-between items-center">
        <h1 className="text-3xl text-slate-700 text-center font-bold my-12">
          # Liquidity Dashboard
        </h1>
        <AddAddress />
      </header>

      <main className="space-y-12">
        {users.map((user: UserType) => (
          <UserCard key={user.userId} userData={user} />
        ))}
      </main>
    </>
  );
}
