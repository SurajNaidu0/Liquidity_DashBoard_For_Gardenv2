"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import config from "@/app/_lib/config.json";
import type { ChainType, ConfigType, UserType } from "@/app/_types/types";
import { findChain, findUser } from "@/app/_lib/utils";

async function updateConfig(config: ConfigType) {
  const filePath = path.join(process.cwd(), "app/_lib/config.json");
  await fs.writeFile(filePath, JSON.stringify(config, null, 2));
}

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

export async function editAddress(
  userId: string,
  formData: FormData
): Promise<void> {
  const username = String(formData.get("name"));
  const fillerAddress = String(formData.get("fillerAddress"));

  if (!username || !fillerAddress) {
    return;
  }

  const userObject: UserType | undefined = findUser(config, userId);
  if (!userObject) return;

  userObject.username = username;
  userObject.fillerAddress = fillerAddress;

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

  const userObject: UserType | undefined = findUser(config, userId);

  if (!userObject) return;

  userObject.chains.push({
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

  const chainObject: ChainType | undefined = findChain(
    config,
    userId,
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
  userId: string,
  chainIdentifier: string,
  tokenSymbol: string
): Promise<void> {
  const chainObject: ChainType | undefined = findChain(
    config,
    userId,
    chainIdentifier
  );

  if (!chainObject) return;

  chainObject.tokens = chainObject.tokens.filter(
    (token) => token.symbol !== tokenSymbol
  );

  updateConfig(config);
  revalidatePath("/");
}
