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

export interface NetworkType {
  chainId: number;
  name: string;
  identifier: string;
  fillerAddresses: string[];
  networkLogo: string;
  explorer: string;
  networkType: string;
  assetConfig: TokenType[];
}
