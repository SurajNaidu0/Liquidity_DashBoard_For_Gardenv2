interface EtherscanApiResponse {
  status: string;
  message: string;
  result: string;
}

export async function getWalletBalance(
  address: string[],
  chainId: number,
  apiKey: string
): Promise<string> {
  const addressParam = address.join(",");
  const apiUrl = `https://api.etherscan.io/v2/api?chainid=${chainId}&module=account&action=balancemulti&address=${addressParam}&tag=latest&apikey=${apiKey}`;
  const response = await fetch(apiUrl);

  // Type assertion to treat the response as EtherscanApiResponse
  const data = (await response.json()) as EtherscanApiResponse;

  const balanceInWei: string = data.result;
  return balanceInWei; // Return the balance
}

export async function getWalletBalanceERC20(
  address: string,
  chainId: string,
  apiKey: string,
  contractAddress: string
): Promise<string> {
  const apiUrl = `https://api.etherscan.io/v2/api
   ?chainid=${chainId}
   &module=account
   &action=tokenbalance
   &contractaddress=${contractAddress}
   &address=${address}
   &tag=latest&apikey=${apiKey}`;
  const response = await fetch(apiUrl);
  const data = (await response.json()) as EtherscanApiResponse;
  const balanceInWei: string = data.result;
  return balanceInWei;
}

export function weiToEthConvertor(weiAmount: string) {
  const weiInEther = BigInt(weiAmount) / BigInt(10 ** 18);
  return weiInEther.toString(); // Return as string to avoid precision loss
}
