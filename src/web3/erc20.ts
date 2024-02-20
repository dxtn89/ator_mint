import { ATOR_REDEEM_COLLECTION_ADDRESSES, ATOR_TOKEN_ADDRESSES } from "@/config/addresses";
import {
  prepareWriteContract,
  waitForTransaction,
  writeContract,
} from "wagmi/actions";
import { erc20ABI } from "wagmi";

export const approveAtor = async (
  chainId: number,
  amount: bigint,
) => {
  try {
    const config = await prepareWriteContract({
      address: ATOR_TOKEN_ADDRESSES[chainId],
      abi: erc20ABI,
      functionName: "approve",
      args: [ATOR_REDEEM_COLLECTION_ADDRESSES[chainId], amount],
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

export default approveAtor;
