import fs from "fs/promises";
import path from "path";
import type { ChainType, ConfigType, UserType } from "@/app/_types/types";

export async function updateConfig(config: ConfigType) {
  const filePath = path.join(process.cwd(), "app/_lib/config.json");
  await fs.writeFile(filePath, JSON.stringify(config, null, 2));
}

export function findUser(config: ConfigType, userId: string) {
  const userObject: UserType | undefined = config.data.users.find(
    (user) => user.userId === userId
  );

  return userObject;
}

export function findChain(
  config: ConfigType,
  userId: string,
  chainIdentifier: string
) {
  const userObject: UserType | undefined = config.data.users.find(
    (user) => user.userId === userId
  );

  const chainObject: ChainType | undefined = userObject?.chains.find(
    (chain) => chain.identifier === chainIdentifier
  );

  return chainObject;
}
