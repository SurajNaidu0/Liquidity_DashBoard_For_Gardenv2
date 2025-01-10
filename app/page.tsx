import AddressCard from "@/app/_components/features/address/AddressCard";
import config from "@/app/_lib/config.json";
import type { ConfigType, AddressType } from "@/app/_types/types";
import AddAddress from "@/app/_components/features/address/AddAddress";
import RefreshPage from "@/app/_components/RefreshPage";

export default function Page() {
  const {
    data: { addresses },
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
        {addresses.map((address: AddressType) => (
          <AddressCard key={address.addressId} addressData={address} />
        ))}
      </main>
    </>
  );
}
