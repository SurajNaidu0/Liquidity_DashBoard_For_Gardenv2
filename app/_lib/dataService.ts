import { ethers } from "ethers";

async function getWalletBalance( address: string,rpcUrl: string) {
  try {
    // Create a provider using the RPC URL
    const provider = new ethers.JsonRpcProvider(rpcUrl);

    // Validate the address
    if (!ethers.isAddress(address)) {
      throw new Error("Invalid Ethereum address.");
    }

    // Fetch the balance of the address
    const balance = await provider.getBalance(address);

    // Convert the balance from Wei to Ether
    const balanceInEther = ethers.formatEther(balance);


    return balanceInEther;

  } catch (error) {
    console.error("Error fetching address data:", error);
    throw error;
  }
}

async function getWalletBalanceERC20(
    userAddress: string,
    rpcUrl: string,
    tokenContractAddress: string,
) {
  try {
    // Create a provider using the RPC URL
    const provider = new ethers.JsonRpcProvider(rpcUrl);

    // ERC-20 token ABI (only the balanceOf function is needed)
    const erc20Abi = [
      "function balanceOf(address owner) view returns (uint256)",
      "function decimals() view returns (uint8)",
      "function symbol() view returns (string)",
    ];

    // Create a contract instance
    const tokenContract = new ethers.Contract(
        tokenContractAddress,
        erc20Abi,
        provider
    );

    // Validate the user address
    if (!ethers.isAddress(userAddress)) {
      throw new Error("Invalid user address.");
    }

    // Fetch the token balance
    const balance = await tokenContract.balanceOf(userAddress);

    // Fetch the token's decimals and symbol
    const decimals = await tokenContract.decimals();
    const symbol = await tokenContract.symbol();

    // Format the balance using the token's decimals
    const formattedBalance = ethers.formatUnits(balance, decimals);



    return formattedBalance;

  } catch (error) {
    console.error("Error fetching token balance:", error);
    throw error;
  }
}


//Testing purpose


// (async () => {
//     const rpcUrl = "https://ethereum.blockpi.network/v1/rpc/public"; // Replace with your RPC URL
//     const address = "0x3f2d27283ad34b2bf7aa9e117c4e6c63922779f2"; // Replace with the target address
//
//     try {
//         const data = await getWalletBalance(address, rpcUrl);
//         console.log("Fetched Data:", data);
//     } catch (error) {
//         console.error("Failed to fetch address data.");
//     }
//
//     const tockenContractAdsress = "0xca14007eff0db1f8135f4c25b34de49ab0d42766";
//
//     try {
//         const data = await getWalletBalanceERC20(address, rpcUrl,tockenContractAdsress);
//         console.log("Fetched Data:", data);
//     } catch (error) {
//         console.error("Failed to fetch address data.");
//     }
// })();

