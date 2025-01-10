"use server";

import { revalidatePath } from "next/cache";
import config from "@/app/_lib/config.json";
import type { ChainType, UserType } from "@/app/_types/types";
import { updateConfig } from "@/app/_lib/utils";

export async function addAddress(formData: FormData): Promise<void> {
  const username = String(formData.get("name"));
  const fillerAddress = String(formData.get("fillerAddress"));

  if (!username || !fillerAddress) {
    return;
  }

  config.data.users.push({
    userId: crypto.randomUUID(),
    username,
    fillerAddress,
    chains: [],
  });

  updateConfig(config);
  revalidatePath("/");
}

export async function addChain(
  userId: string,
  formData: FormData
): Promise<void> {
  const name = String(formData.get("name"));
  const chainId = Number(formData.get("chainId"));

  if (!name || !chainId) {
    return;
  }

  const userObject: UserType | undefined = config.data.users.find(
    (user) => user.userId === userId
  );

  userObject?.chains.push({
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

export async function addToken(
  userId: string,
  chainIdentifier: string,
  formData: FormData
): Promise<void> {
  const name = String(formData.get("name"));
  const tokenAddress = String(formData.get("tokenAddress"));

  if (!name || !tokenAddress) {
    return;
  }

  const userObject: UserType | undefined = config.data.users.find(
    (user) => user.userId === userId
  );

  const chainObject: ChainType | undefined = userObject?.chains.find(
    (chain) => chain.identifier === chainIdentifier
  );

  chainObject?.tokens.push({
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
