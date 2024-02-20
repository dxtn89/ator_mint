import { useState } from 'react';
import { useAccount } from 'wagmi';
import Modal from '@components/Modal';
import Minter from '@components/Minter';
import ButtonConnect from '@components/ButtonConnect';
import { useGlobalState } from '@/stores/app.store';

const ButtonMint = () => {
  const { isConnected } = useAccount();
  const [{ ownsNft }] = useGlobalState('nftInfo');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [{ isEnableMint, isEnableWhitelistMint }] =
    useGlobalState('collectionInfo');
  const [{ atorBalance, hasSufficientBalance, isWhitelist }] =
    useGlobalState('nftInfo');

  // No one can mint if this is false
  if (!isEnableMint && !(isEnableWhitelistMint && isWhitelist)) return null;
  // Check they hold sufficient ATOR
  if (!hasSufficientBalance && Number(atorBalance) < 250) return null;

  return (
    <>
      {!isConnected ? (
        <ButtonConnect>Connect to mint</ButtonConnect>
      ) : (
        <>
          <button
            type='button'
            className='btn border border-cyan-300 hover:bg-cyan-300 hover:text-black'
            onClick={() => setIsModalOpen(true)}
          >
            {ownsNft ? 'View my NFT' : 'Mint to reserve (0.1 ETH)'}
          </button>
          <Modal
            id='minter_modal'
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          >
            <div className='flex flex-col space-y-2'>
              <Minter />
            </div>
          </Modal>
        </>
      )}
    </>
  );
};

export default ButtonMint;
