import UserCard from "@/app/_components/UserCard";
import config from "@/app/_lib/config.json";
import type { ConfigType, UserType } from "@/app/_types/types";
import AddAddress from "@/app/_components/AddAddress";
import RefreshPage from "@/app/_components/RefreshPage";

export default function Page() {
  const {
    data: { users },
  }: ConfigType = config;

  return (
    <>
      <header className="flex items-center gap-4">
        <h1 className="text-3xl text-slate-700 text-center font-bold my-12">
          # Liquidity Dashboard
        </h1>
        <AddAddress />
        <RefreshPage text="Refresh" />
      </header>

      <main className="space-y-12">
        {users.map((user: UserType) => (
          <UserCard key={user.userId} userData={user} />
        ))}
      </main>
    </>
  );
}
