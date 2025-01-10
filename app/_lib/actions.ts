"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import config from "@/app/_lib/config.json";
import type { ChainType, ConfigType, AddressType } from "@/app/_types/types";
import { findChain, findAddress } from "@/app/_lib/utils";

async function updateConfig(config: ConfigType) {
  const filePath = path.join(process.cwd(), "app/_lib/config.json");
  await fs.writeFile(filePath, JSON.stringify(config, null, 2));
}

export async function addAddress(formData: FormData): Promise<void> {
  const addressName = String(formData.get("name"));
  const fillerAddress = String(formData.get("fillerAddress"));

  if (!addressName || !fillerAddress) {
    return;
  }

  config.data.addresses.push({
    addressId: crypto.randomUUID(),
    addressName,
    fillerAddress,
    chains: [],
  });

  updateConfig(config);
  revalidatePath("/");
}

export async function editAddress(
  addressId: string,
  formData: FormData
): Promise<void> {
  const addressName = String(formData.get("name"));
  const fillerAddress = String(formData.get("fillerAddress"));

  if (!addressName || !fillerAddress) {
    return;
  }

  const addressObject: AddressType | undefined = findAddress(config, addressId);
  if (!addressObject) return;

  addressObject.addressName = addressName;
  addressObject.fillerAddress = fillerAddress;

  updateConfig(config);
  revalidatePath("/");
}

export async function deleteAddress(addressId: string): Promise<void> {
  config.data.addresses = config.data.addresses.filter(
    (address) => address.addressId !== addressId
  );

  updateConfig(config);
  revalidatePath("/");
}

export async function addChain(
  addressId: string,
  formData: FormData
): Promise<void> {
  const name = String(formData.get("name"));
  const chainId = Number(formData.get("chainId"));

  if (!name || !chainId) {
    return;
  }

  const addressObject: AddressType | undefined = findAddress(config, addressId);

  if (!addressObject) return;

  addressObject.chains.push({
    chainId,
    name,
    identifier: name[0].toLowerCase() + name.slice(1),
    chainLogo: "/command.svg",
    explorer: "",
    chainType: "",
    tokens: [],
  });

  updateConfig(config);
  revalidatePath("/");
}

export async function deleteChain(
  addressId: string,
  chainIdentifier: string
): Promise<void> {
  const addressObject: AddressType | undefined = findAddress(config, addressId);

  if (!addressObject) return;

  addressObject.chains = addressObject.chains.filter(
    (chain) => chain.identifier !== chainIdentifier
  );

  updateConfig(config);
  revalidatePath("/");
}

export async function addToken(
  addressId: string,
  chainIdentifier: string,
  formData: FormData
): Promise<void> {
  const name = String(formData.get("name"));
  const tokenAddress = String(formData.get("tokenAddress"));

  if (!name || !tokenAddress) {
    return;
  }

  const chainObject: ChainType | undefined = findChain(
    config,
    addressId,
    chainIdentifier
  );

  if (!chainObject) return;

  chainObject.tokens.push({
    name,
    decimals: 0,
    symbol: name,
    baseFees: 0,
    logo: "/coin.svg",
    tokenAddress,
    atomicSwapAddress: "",
    min_amount: "",
    max_amount: "",
  });

  updateConfig(config);
  revalidatePath("/");
}

export async function deleteToken(
  addressId: string,
  chainIdentifier: string,
  tokenSymbol: string
): Promise<void> {
  const chainObject: ChainType | undefined = findChain(
    config,
    addressId,
    chainIdentifier
  );

  if (!chainObject) return;

  chainObject.tokens = chainObject.tokens.filter(
    (token) => token.symbol !== tokenSymbol
  );

  updateConfig(config);
  revalidatePath("/");
}
