import { defaultWagmiConfig } from '@web3modal/wagmi/react';
import { mainnet, sepolia} from 'viem/chains';

export const projectId = '1060848234005efa11f5c458e84146aa';

const metadata = {
  name: 'ATOR',
  description: 'Mint Reserve Receive',
  url: 'https://mint.ator.io',
  icons: [
    'https://ator-mint-relay-nft.netlify.app/assets/ator-logo-FtDP5bot.png',
  ],
};

export const chains = [mainnet, sepolia];
export const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });
