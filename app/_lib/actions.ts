"use server";

import JsonMiddleware from "@/app/_lib/jsonMiddleware";

const jsonMiddleware = new JsonMiddleware();

export async function addAddress(formData: FormData): Promise<void> {
  const addressName = String(formData.get("name"));
  const fillerAddress = String(formData.get("fillerAddress"));

  if (!addressName || !fillerAddress) {
    return;
  }

  await jsonMiddleware.addAddress(addressName, fillerAddress);
}

export async function editAddress(
  addressId: string,
  formData: FormData
): Promise<void> {
  const addressName = String(formData.get("name"));
  const fillerAddress = String(formData.get("fillerAddress"));

  if (!addressName || !fillerAddress) {
    return;
  }

  await jsonMiddleware.editAddress(addressId, addressName, fillerAddress);
}

export async function deleteAddress(addressId: string): Promise<void> {
  await jsonMiddleware.deleteAddress(addressId);
}

export async function addChain(
  addressId: string,
  formData: FormData
): Promise<void> {
  const name = String(formData.get("name"));
  const chainId = Number(formData.get("chainId"));

  if (!name || !chainId) {
    return;
  }

  await jsonMiddleware.addChain(addressId, name, chainId);
}

export async function deleteChain(
  addressId: string,
  chainIdentifier: string
): Promise<void> {
  await jsonMiddleware.deleteChain(addressId, chainIdentifier);
}

export async function addToken(
  addressId: string,
  chainIdentifier: string,
  formData: FormData
): Promise<void> {
  const name = String(formData.get("name"));
  const tokenAddress = String(formData.get("tokenAddress"));

  if (!name || !tokenAddress) {
    return;
  }

  await jsonMiddleware.addToken(addressId, chainIdentifier, name, tokenAddress);
}

export async function deleteToken(
  addressId: string,
  chainIdentifier: string,
  tokenSymbol: string
): Promise<void> {
  await jsonMiddleware.deleteToken(addressId, chainIdentifier, tokenSymbol);
}
