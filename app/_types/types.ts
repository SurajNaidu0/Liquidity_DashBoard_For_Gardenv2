export interface TokenType {
  name: string;
  decimals: number;
  symbol: string;
  baseFees: number;
  logo: string;
  tokenAddress: string;
  atomicSwapAddress: string;
  min_amount: string;
  max_amount: string;
}

export interface ChainType {
  chainId: number;
  name: string;
  identifier: string;
  chainLogo: string;
  explorer: string;
  chainType: string;
  tokens: TokenType[];
}

export interface AddressType {
  addressId: string;
  addressName: string;
  fillerAddress: string;
  chains: ChainType[];
}

export interface ConfigType {
  data: {
    addresses: AddressType[];
  };
}

export interface DataMiddleware {
  addAddress(addressName: string, fillerAddress: string): Promise<void>;
  editAddress(
    addressId: string,
    addressName: string,
    fillerAddress: string
  ): Promise<void>;
  deleteAddress(addressId: string): Promise<void>;
  addChain(addressId: string, name: string, chainId: number): Promise<void>;
  deleteChain(addressId: string, chainIdentifier: string): Promise<void>;
  addToken(
    addressId: string,
    chainIdentifier: string,
    name: string,
    tokenAddress: string
  ): Promise<void>;
  deleteToken(
    addressId: string,
    chainIdentifier: string,
    tokenSymbol: string
  ): Promise<void>;
}
