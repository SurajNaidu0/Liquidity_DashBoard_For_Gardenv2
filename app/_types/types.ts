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

export interface UserType {
  userId: string;
  username: string;
  fillerAddress: string;
  chains: ChainType[];
}

export interface ConfigType {
  data: {
    users: UserType[];
  };
}
