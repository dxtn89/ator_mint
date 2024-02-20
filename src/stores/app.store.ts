// To avoid complex state stores like Redux we are using a simple global state store
// See: https://github.com/dai-shi/react-hooks-global-state/tree/27f3e18257d76bd89222c251f2193184586301e6/examples/03_actions

import { createGlobalState } from "react-hooks-global-state";

type CollectionInfo = {
  mintFee: bigint;
  totalSupply: bigint;
  limitPerUser: bigint;
  totalMintedCount: bigint;
  isEnableMint: boolean;
  isEnableWhitelistMint: boolean;
  baseURI: string;
};

export type NftInfo = {
  ownsNft: boolean;
  tokens: bigint[];
  atorBalance: bigint;
  isWhitelist: boolean;
  userMintedCount: bigint;
  hasSufficientBalance: boolean;
  isApproved: boolean;
  isApprovedForRelay: boolean;
};

type UserInfo = {
  hasPaidPostage: boolean;
  hasPaidRelayFee: boolean;
  hasNominatedPickup: boolean;
  hasSuppliedEmailAddress: boolean;
  hasSuppliedPostalAddress: boolean;
};

// Set the initial state of the app
const { setGlobalState, useGlobalState } = createGlobalState({
  isMinting: false,
  hasDoneNftReveal: true,
  hasPurchasedRelay: false,
  hasCommencedReservation: true,

  // General NFT info
  collectionInfo: {
    mintFee: 0n,
    totalSupply: 0n,
    limitPerUser: 0n,
    totalMintedCount: 0n,
    isEnableMint: false,
    isEnableWhitelistMint: false,
    baseURI: "",
  } as CollectionInfo,

  // User info
  // TODO: Init this with the user's info from the contract
  userInfo: {
    hasPaidPostage: false,
    hasPaidRelayFee: true,
    hasNominatedPickup: false,
    hasSuppliedEmailAddress: false,
    hasSuppliedPostalAddress: false,
  } as UserInfo,

  // User NFT info
  nftInfo: {
    tokens: [],
    userMintedCount: 0n,
    ownsNft: false,
    isWhitelist: false,
    atorBalance: 0n,
    hasSufficientBalance: false,
    isApproved: false,
    isApprovedForRelay: false,
  } as NftInfo,
});

export const setIsMinting = (isMinting: boolean) => {
  setGlobalState("isMinting", () => isMinting);
};

export const setNftInfo = (nftInfo: NftInfo) => {
  setGlobalState("nftInfo", () => nftInfo);
};

export const setCollectionInfo = (collectionInfo: CollectionInfo) => {
  setGlobalState("collectionInfo", () => collectionInfo);
};

export const setHasPaidRelayFee = (hasPaidRelayFee: boolean) => {
  setGlobalState("userInfo", (v) => ({ ...v, hasPaidRelayFee }));
};

export const setHasNominatedPickup = (hasNominatedPickup: boolean) => {
  setGlobalState("userInfo", (v) => ({ ...v, hasNominatedPickup }));
};

export { useGlobalState };
