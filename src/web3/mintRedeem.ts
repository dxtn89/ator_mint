import { ATOR_REDEEM_COLLECTION_ADDRESSES } from "@/config/addresses";
import {
  prepareWriteContract,
  waitForTransaction,
  writeContract,
} from "wagmi/actions";
import { atorRedeemABI } from "@/config/atorRedeemCollection";

export const mintRedeemNft = async (
  chainId: number,
  mintFee: bigint,
  to: `0x${string}`,
  tokenId: bigint
) => {
  try {
    const config = await prepareWriteContract({
      address: ATOR_REDEEM_COLLECTION_ADDRESSES[chainId],
      abi: atorRedeemABI,
      functionName: "mint",
      args: [to, tokenId],
      value: mintFee,
    });
    const res = await writeContract(config);
    const receivedTx = await waitForTransaction({
      chainId,
      confirmations: 1,
      hash: res.hash,
    });
    return receivedTx?.transactionHash;
  } catch (e) {
    console.log("---err:", e);
    return false;
  }
};

export default mintRedeemNft;
