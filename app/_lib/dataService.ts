interface EtherscanApiResponse {
  status: string;
  message: string;
  result: string;
}

export async function getWalletBalance(
  address: string,
  chainId: number
): Promise<number> {
  const apiUrl = `https://api.etherscan.io/v2/api?chainid=${chainId}&module=account&action=balance&address=${address}&tag=latest&apikey=${process.env.ETHERSCAN_API_KEY}`;
  const response = await fetch(apiUrl);

  // Type assertion to treat the response as EtherscanApiResponse
  const data = (await response.json()) as EtherscanApiResponse;
  const balanceInWei: number = parseFloat(data.result);
  const balanceInEth = balanceInWei / 10 ** 18;

  return balanceInEth;
}

export async function getWalletBalanceERC20(
  address: string,
  chainId: number,
  contractAddress: string,
  delay?: number
): Promise<number> {
  const apiUrl = `https://api.etherscan.io/v2/api?chainid=${chainId}&module=account&action=tokenbalance&contractaddress=${contractAddress}&address=${address}&tag=latest&apikey=${process.env.ETHERSCAN_API_KEY}`;

  // Delay to prevent rate limiting
  await new Promise((resolve) => setTimeout(resolve, delay));

  const response = await fetch(apiUrl);

  const data = (await response.json()) as EtherscanApiResponse;
  const balanceInWei: number = parseFloat(data.result);
  const balanceInEth = balanceInWei / 10 ** 18;

  return balanceInEth;
}
