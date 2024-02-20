import '@/styles/minter.css';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { useAccount, useChainId } from 'wagmi';
import mintBg from '@assets/mint-bg.webp';

import mintNft from '@/web3/mint';
import UserNft from '@components/UserNft';
import { useGlobalState, setIsMinting } from '@/stores/app.store';

const Minter = () => {
  const chainId = useChainId();
  const { address } = useAccount();
  const [isMinting] = useGlobalState('isMinting');
  const [mintingStatus, setMintingStatus] = useState('Mint now');
  const [{ isEnableMint, isEnableWhitelistMint, limitPerUser, mintFee }] =
    useGlobalState('collectionInfo');
  const [
    {
      ownsNft,
      hasSufficientBalance,
      atorBalance,
      isWhitelist,
      userMintedCount,
    },
  ] = useGlobalState('nftInfo');

  // Handle minting
  const mint = useCallback(async () => {
    if (!address || isMinting) return;
    // No one can mint if this is false
    if (!isEnableMint && !(isEnableWhitelistMint && isWhitelist)) {
      document.getElementById('minter_modal')?.click();
      toast.error('Minting is not enabled');
      return;
    }

    // Check they hold sufficient ATOR
    if (!hasSufficientBalance && Number(atorBalance) < 250) {
      document.getElementById('minter_modal')?.click();
      toast.error('Insufficient ATOR balance');
      return;
    }

    // Check is is whitelist stage and they are whitelisted
    if (isEnableMint && isEnableWhitelistMint && !isWhitelist) {
      document.getElementById('minter_modal')?.click();
      toast.error('You are not whitelisted');
      return;
    }

    // They already own an NFT
    if (ownsNft && limitPerUser - userMintedCount > 0) {
      document.getElementById('minter_modal')?.click();
      toast.error('Only one NFT per user');
      return;
    }

    // Pay the eth and mint the NFT 

    setIsMinting(true);
    setMintingStatus('Minting in progress');

    const mintResult = await mintNft(chainId, mintFee, address);

    if (!mintResult) {
      document.getElementById('minter_modal')?.click();
      toast.error('Minting failed');
      setIsMinting(false);
      setMintingStatus('Minting is failed');
      return;
    }


    // NOTE: Since isMinting is a global state and a dependency of
    // useCollection and useUserNftInfo it triggers a updates of the data

    // Kill the animation 3s later
    setTimeout(() => {
      setIsMinting(false);
      setMintingStatus('Minting complete');
    }, 4000);
  }, [isMinting]);

  return (
    <div className='relative'>
      <div
        className={`${isMinting && 'flash-animation'
          } fixed inset-y-0 left-1/2 -translate-x-1/2 m-auto w-20 h-24 rounded-full bg-cyan-600 shadow-lg shadow-cyan-300 blur opacity-0`}
      ></div>

      {!ownsNft ? (
        <div className='sm:w-[33rem] sm:h-[33rem] w-full h-auto p-4 rounded-full bg-gray-900/30 flex items-center justify-center relative group animate__animated animate__zoomIn animate__faster'>
          <div className='absolute inset-0 m-auto sm:w-[32rem] sm:h-[32rem] w-full h-auto bg-gradient-to-br from-gray-200 via-cyan-300  to-gray-800 rounded-full animate-spin'></div>

          <img
            alt='Mint'
            src={mintBg}
            className='w-full h-full rounded-full ring ring-cyan-600/50 shadow-lg relative'
          />

          <div className='hidden sm:block absolute inset-0 m-auto w-3/4 h-3/4 rounded-full border-4 border-dashed border-white group-hover:animate-spin'></div>
          <div className='hidden sm:block absolute inset-0 m-auto w-[21rem] h-[21rem] rounded-full border-4 border-dashed border-teal-950 group-hover:animate-spin duration-150'></div>

          <button
            type='button'
            onClick={() => mint()}
            className='absolute inset-0 -top-2 m-auto flex items-center justify-center w-40 h-40 rounded-full bg-gradient-to-b from-cyan-200 via-cyan-900 to-cyan-900 text-cyan-100 font-brand ring ring-cyan-100/10 font-semibold tracking-wider'
          >
            <span>{mintingStatus}</span>
          </button>
        </div>
      ) : (
        <UserNft />
      )}
    </div>
  );
};

export default Minter;
