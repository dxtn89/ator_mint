import { useGlobalState } from '@/stores/app.store';
import { Icon } from '@iconify/react/dist/iconify.js';

const ButtonBuy = () => {
  const [{ isEnableMint, isEnableWhitelistMint }] =
    useGlobalState('collectionInfo');
  const [{ atorBalance, hasSufficientBalance, isWhitelist }] =
    useGlobalState('nftInfo');

  // No one can mint if this is false
  if (!isEnableMint && !(isEnableWhitelistMint && isWhitelist)) return null;
  // Check they hold sufficient ATOR
  if (hasSufficientBalance && Number(atorBalance) >= 250) return null;

  return (
    <div className='flex flex-col gap-2'>
      <a
        className='btn btn-primary'
        target='_blank'
        href='https://earn.brewlabs.info/swap'
      >
        You need $ATOR - Balance {Number(atorBalance)}
      </a>
      <p className='text-xs'>
        <Icon icon='mdi:alert-circle-outline' className='inline-block mr-1' />
        You need 250 ATOR in your wallet to proceed.
      </p>
    </div>
  );
};

export default ButtonBuy;
