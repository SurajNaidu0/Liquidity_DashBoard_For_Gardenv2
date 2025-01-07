import { getWalletBalance } from "./_lib/api-data";

export default async function Home() {
  const address = "0x3f2d27283ad34b2bf7aa9e117c4e6c63922779f2"; // Replace with a real Ethereum address
  const chainId = 1; // Mainnet Ethereum chain ID
  const apiKey = "1GZ5K9C5QM76HQCDJXFANUPHD3UFICFDWI"; // Replace with your real Etherscan API key

  const data = await getWalletBalance(address, chainId, apiKey)
    .then((balance) => console.log(`Wallet balance in Wei: ${balance}`))
    .catch((error) => console.error("Error fetching balance:", error));

  // console.log(data);

  return <div>hello</div>;
}
