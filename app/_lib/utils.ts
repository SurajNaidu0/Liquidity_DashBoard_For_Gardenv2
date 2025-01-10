import fs from "fs/promises";
import path from "path";
import type { ConfigType } from "@/app/_types/types";

export async function updateConfig(config: ConfigType) {
  const filePath = path.join(process.cwd(), "app/_lib/config.json");
  await fs.writeFile(filePath, JSON.stringify(config, null, 2));
}
