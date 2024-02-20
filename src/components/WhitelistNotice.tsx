import { useGlobalState } from '@/stores/app.store';

const WhitelistNotice = () => {
  const [{ isWhitelist }] = useGlobalState('nftInfo');
  const [{ isEnableWhitelistMint }] = useGlobalState('collectionInfo');

  if (!isEnableWhitelistMint) return null;

  return (
    <div className='sm:mb-8 sm:flex sm:justify-center text-center mb-2'>
      {!isWhitelist && (
        <div className='relative rounded-full px-3 py-1 text-sm leading-6 text-gray-400 ring-1 ring-white/10 hover:ring-white/20'>
          Whitelist phase:
          <span className='font-semibold text-white ml-1'>
            <span className='absolute inset-0' aria-hidden='true'></span>
            You are not one of them!
            <span aria-hidden='true'>&rarr;</span>
          </span>
        </div>
      )}

      {isWhitelist && (
        <div className='relative rounded-full px-3 py-1 text-sm leading-6 text-gray-400 ring-1 ring-white/10 hover:ring-white/20'>
          Whitelist phase running.
          <span className='font-semibold text-white ml-1'>
            <span className='absolute inset-0' aria-hidden='true'></span>
            You are one of them!
            <span aria-hidden='true'>&rarr;</span>
          </span>
        </div>
      )}
    </div>
  );
};

export default WhitelistNotice;
