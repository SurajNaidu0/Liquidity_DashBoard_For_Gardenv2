import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import type {
  AddressType,
  ChainType,
  ConfigType,
  DataMiddleware,
} from "@/app/_types/types";
import config from "@/app/_lib/config.json";
import { findChain, findAddress } from "@/app/_lib/utils";

class JsonMiddleware implements DataMiddleware {
  private filePath: string;

  constructor() {
    this.filePath = path.join(process.cwd(), "app/_lib/config.json");
  }

  private async updateConfig(config: ConfigType) {
    await fs.writeFile(this.filePath, JSON.stringify(config, null, 2));
  }

  async addAddress(addressName: string, fillerAddress: string) {
    config.data.addresses.push({
      addressId: crypto.randomUUID(),
      addressName,
      fillerAddress,
      chains: [],
    });

    await this.updateConfig(config);
    revalidatePath("/");
  }

  async editAddress(
    addressId: string,
    addressName: string,
    fillerAddress: string
  ) {
    const addressObject: AddressType | undefined = findAddress(
      config,
      addressId
    );
    if (!addressObject) return;

    addressObject.addressName = addressName;
    addressObject.fillerAddress = fillerAddress;

    await this.updateConfig(config);
    revalidatePath("/");
  }

  async deleteAddress(addressId: string) {
    config.data.addresses = config.data.addresses.filter(
      (address) => address.addressId !== addressId
    );

    await this.updateConfig(config);
    revalidatePath("/");
  }

  async addChain(addressId: string, name: string, chainId: number) {
    const addressObject: AddressType | undefined = findAddress(
      config,
      addressId
    );

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

    await this.updateConfig(config);
    revalidatePath("/");
  }

  async deleteChain(addressId: string, chainIdentifier: string) {
    const addressObject: AddressType | undefined = findAddress(
      config,
      addressId
    );

    if (!addressObject) return;

    addressObject.chains = addressObject.chains.filter(
      (chain) => chain.identifier !== chainIdentifier
    );

    await this.updateConfig(config);
    revalidatePath("/");
  }

  async addToken(
    addressId: string,
    chainIdentifier: string,
    name: string,
    tokenAddress: string
  ) {
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

    await this.updateConfig(config);
    revalidatePath("/");
  }

  async deleteToken(
    addressId: string,
    chainIdentifier: string,
    tokenSymbol: string
  ) {
    const chainObject: ChainType | undefined = findChain(
      config,
      addressId,
      chainIdentifier
    );

    if (!chainObject) return;

    chainObject.tokens = chainObject.tokens.filter(
      (token) => token.symbol !== tokenSymbol
    );

    await this.updateConfig(config);
    revalidatePath("/");
  }
}

export default JsonMiddleware;
