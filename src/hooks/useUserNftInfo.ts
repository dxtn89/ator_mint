import { useEffect } from "react";
import { erc20ABI, useContractReads } from "wagmi";
import { setNftInfo, useGlobalState } from "@/stores/app.store";
import { atorABI } from "@/config/atorCollection";
import {
  ATOR_TOKEN_ADDRESSES,
  ATOR_COLLECTION_ADDRESSES,
  ATOR_REDEEM_COLLECTION_ADDRESSES,
} from "@/config/addresses";
import { parseEther } from "viem";

export const useUserNftInfo = (chainId: number, address: `0x${string}`) => {
  const [isMinting] = useGlobalState("isMinting");

  const atorCollectionContract = {
    abi: atorABI,
    address: ATOR_COLLECTION_ADDRESSES[chainId],
  };

  const {
    isError,
    isLoading,
    data: contractData,
  } = useContractReads({
    contracts: [
      {
        ...atorCollectionContract,
        args: [address],
        functionName: "balanceOf",
      },
      {
        ...atorCollectionContract,
        args: [address],
        functionName: "isWhitelist",
      },
      {
        ...atorCollectionContract,
        args: [address],
        functionName: "tokensByOwner",
      },
      {
        address: ATOR_TOKEN_ADDRESSES[chainId],
        abi: erc20ABI,
        args: [address],
        functionName: "balanceOf",
      },
      {
        ...atorCollectionContract,
        args: [address],
        functionName: "mintedCount",
      },
      {
        address: ATOR_TOKEN_ADDRESSES[chainId],
        abi: erc20ABI,
        args: [address, ATOR_REDEEM_COLLECTION_ADDRESSES[chainId]],
        functionName: "allowance",
      },
      {
        ...atorCollectionContract,
        args: [address, ATOR_REDEEM_COLLECTION_ADDRESSES[chainId]],
        functionName: "isApprovedForAll",
      },
    ],
  });

  useEffect(() => {
    if (contractData) {
      if (!isLoading && !isError) {
        const nftInfo = contractData?.map((result) => result.result);
        if (!nftInfo) return;

        // Set state store
        setNftInfo({
          ownsNft: Number(nftInfo[0]) > 0,
          userMintedCount: nftInfo[4] as bigint,
          isWhitelist: nftInfo[1] as boolean,
          tokens: nftInfo[2] as bigint[],
          atorBalance: nftInfo[3] as bigint,
          hasSufficientBalance: Number(nftInfo[3]) >= 250,
          isApproved: (nftInfo[5] as bigint) >= parseEther("250"),
          isApprovedForRelay: nftInfo[6] as boolean,
        });
      }
    }
  }, [contractData, isError, isLoading, isMinting]);
};

export default useUserNftInfo;
