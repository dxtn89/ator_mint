import { ATOR_COLLECTION_ADDRESSES, ATOR_REDEEM_COLLECTION_ADDRESSES } from "@/config/addresses";
import {
  prepareWriteContract,
  waitForTransaction,
  writeContract,
} from "wagmi/actions";
import { atorABI } from "@/config/atorCollection";

export const approveForRelay = async (
  chainId: number,
) => {
  try {
    const config = await prepareWriteContract({
      address: ATOR_COLLECTION_ADDRESSES[chainId],
      abi: atorABI,
      functionName: "setApprovalForAll",
      args: [ATOR_REDEEM_COLLECTION_ADDRESSES[chainId], true],
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

export default approveForRelay;
