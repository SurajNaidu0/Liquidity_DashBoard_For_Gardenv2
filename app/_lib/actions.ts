"use server";

import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";
import config from "@/app/_lib/config.json";

export async function addToken(
  chainIdentifier: string,
  formData: FormData
): Promise<void> {
  const name = String(formData.get("name"));
  const tokenAddress = String(formData.get("address"));

  if (!name || !tokenAddress) {
    return;
  }

  const chainObject = config.data.networks.find(
    (network) => network.identifier === chainIdentifier
  );

  chainObject?.assetConfig.push({
    name,
    decimals: 0,
    symbol: "",
    baseFees: 0,
    logo: "/coin.svg",
    tokenAddress,
    atomicSwapAddress: "",
    min_amount: "",
    max_amount: "",
  });

  // Updating config file
  const filePath = path.join(process.cwd(), "app/_lib/config.json");
  await fs.writeFile(filePath, JSON.stringify(config, null, 2));

  revalidatePath("/");
}
