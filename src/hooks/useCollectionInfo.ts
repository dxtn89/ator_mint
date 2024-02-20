import { useEffect } from "react";
import { useContractReads, useChainId } from "wagmi";
import { setCollectionInfo, useGlobalState } from "@/stores/app.store";
import { atorABI } from "@/config/atorCollection";
import { ATOR_COLLECTION_ADDRESSES } from "@/config/addresses";

// Get general info about collection
export const useCollectionInfo = () => {
  // Get chainId
  const chainId = useChainId();
  const [isMinting] = useGlobalState("isMinting");
  // Define contract
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
        functionName: "totalSupply",
      },
      {
        ...atorCollectionContract,
        functionName: "maxSupply",
      },
      {
        ...atorCollectionContract,
        functionName: "getLimitPerUser",
      },
      {
        ...atorCollectionContract,
        functionName: "getMintFee",
      },
      {
        ...atorCollectionContract,
        functionName: "isEnableMint",
      },
      {
        ...atorCollectionContract,
        functionName: "isEnableWhitelistMint",
      },
      {
        ...atorCollectionContract,
        functionName: "baseURI",
      },
    ],
  });

  useEffect(() => {
    if (contractData) {
      if (!isLoading && !isError) {
        const nftInfo = contractData?.map((result) => result.result);

        if (!nftInfo) return;
        // Set state store
        setCollectionInfo({
          totalMintedCount: nftInfo[0] as bigint,
          totalSupply: nftInfo[1] as bigint,
          limitPerUser: nftInfo[2] as bigint,
          mintFee: nftInfo[3] as bigint,
          isEnableMint: nftInfo[4] as boolean,
          isEnableWhitelistMint: nftInfo[5] as boolean,
          baseURI: nftInfo[6] as string,
        });
      }
    }
  }, [contractData, isError, isLoading, isMinting]);
};

export default useCollectionInfo;
