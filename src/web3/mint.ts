import { ATOR_COLLECTION_ADDRESSES } from '@/config/addresses';
import {
  prepareWriteContract,
  waitForTransaction,
  writeContract,
} from 'wagmi/actions';
import { atorABI } from '@/config/atorCollection';

export const mintNft = async (
  chainId: number,
  mintFee: bigint,
  to: `0x${string}`
) => {
  try {
    const config = await prepareWriteContract({
      address: ATOR_COLLECTION_ADDRESSES[chainId],
      abi: atorABI,
      functionName: 'mint',
      args: [to],
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
    console.log('---err:', e);
    return false;
  }
};

export default mintNft;
