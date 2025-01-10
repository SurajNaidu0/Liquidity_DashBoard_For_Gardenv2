import type { ChainType, ConfigType, AddressType } from "@/app/_types/types";

export function findAddress(config: ConfigType, addressId: string) {
  const addressObject: AddressType | undefined = config.data.addresses.find(
    (address) => address.addressId === addressId
  );

  return addressObject;
}

export function findChain(
  config: ConfigType,
  addressId: string,
  chainIdentifier: string
) {
  const addressObject: AddressType | undefined = config.data.addresses.find(
    (address) => address.addressId === addressId
  );

  const chainObject: ChainType | undefined = addressObject?.chains.find(
    (chain) => chain.identifier === chainIdentifier
  );

  return chainObject;
}
