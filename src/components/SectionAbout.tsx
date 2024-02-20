import { useAccount } from "wagmi";
import { Icon } from "@iconify/react";
import relayImage from "@assets/relays.png";

import "@/styles/glow.css";
import Card from "@components/Card";
import NftStack from "@components/NftStack";
import GlowEffect from "@components/GlowEffect";
import useGlowEffect from "@/hooks/useGlowEffect";
import { useGlobalState } from "@/stores/app.store";

const SectionAbout = () => {
  const { isConnected } = useAccount();
  const [{ ownsNft }] = useGlobalState("nftInfo");
  const [hasPurchasedRelay] = useGlobalState("hasPurchasedRelay");

  // Glow border effect
  useGlowEffect(
    "#how-it-works .glow-card-container",
    "#how-it-works .glow-card"
  );

  const TaskCompleted = ({
    number,
    isCompeted,
  }: {
    number: string;
    isCompeted: boolean;
  }) => (
    <div className="absolute rounded-2xl overflow-hidden -top-px -right-px">
      {isCompeted ? (
        <Icon
          icon="mdi:check"
          className="text-cyan-300 w-8 h-8 p-1 bg-gray-900"
        />
      ) : (
        <div className="bg-gray-600 px-2 text-cyan-300">{number}</div>
      )}
    </div>
  );

  return (
    <div className="relative">
      <img
        src={relayImage}
        alt="ATOR Relays"
        className="absolute top-0 right-0 -z-10 w-2/3 h-auto opacity-20 mix-blend-screen"
      />

      <div
        id="how-it-works"
        className="mx-auto mt-32 max-w-7xl px-6 pb-36 sm:mt-40 lg:px-8 font-brand"
      >
        <GlowEffect />

        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-cyan-400 sm:text-4xl">
            Reserve a relay by minting an NFT, then* purchase a relay using
            $ATOR.
          </h2>
          <p className="mt-6 text-base leading-7 text-gray-400">
            Be the first to own a relay and start earning $ATOR while
            contributing to a new world of anonymous browsing with unprecedented
            speed.
          </p>
          <p className="text-xs mt-4">
            *Stage two of the release starts in January 2024
          </p>
        </div>

        <div className="glow-card-container mx-auto mt-16 flex max-w-2xl flex-col gap-8 lg:mx-0 lg:mt-20 lg:max-w-none lg:flex-row lg:items-end">
          <Card>
            <div className="glows"></div>

            <TaskCompleted number="1" isCompeted={isConnected} />

            <p
              className={`flex-none text-3xl font-bold tracking-tight ${
                isConnected ? "text-cyan-500" : "text-white"
              }`}
            >
              Connect your wallet
            </p>
            <div className="sm:w-80 sm:shrink lg:w-auto lg:flex-none">
              <p className="text-lg font-semibold tracking-tight text-white">
                Multi wallet support
              </p>
              <p className="mt-2 text-base leading-7 text-indigo-200">
                We support MetaMask, Brave Wallet, Trust wallet and many many
                more.
              </p>
            </div>
          </Card>

          <Card>
            <div className="glows"></div>
            <TaskCompleted number="2" isCompeted={ownsNft} />

            <p
              className={`flex-none text-3xl font-bold tracking-tight ${
                ownsNft ? "text-cyan-500" : "text-white"
              }`}
            >
              Mint your NFT<span className="text-xs">(0.1 ETH)</span>
            </p>

            <NftStack />

            <div className="sm:w-80 sm:shrink lg:w-auto lg:flex-none">
              <p className="text-lg font-semibold tracking-tight text-white">
                There will be 1000 NFTs available for minting.
              </p>
              <p className="mt-2 text-base leading-7 text-indigo-200">
                One mint per wallet. The NFT will be used to claim your relay in
                stage two.
              </p>
            </div>
          </Card>

          <Card>
            <div className="glows"></div>
            <TaskCompleted number="3" isCompeted={hasPurchasedRelay} />
            <p className="flex-none text-3xl font-bold tracking-tight text-white">
              Purchase a relay
            </p>
            <div className="sm:w-80 sm:shrink lg:w-auto lg:flex-none">
              <p className="text-lg font-semibold tracking-tight text-white">
                A relay will be sent to your provided postal address.
              </p>
              <p className="mt-2 text-base leading-7 text-indigo-200">
                Provided you secured a relay in step one, users will be able to
                purchase a hardware relay using $ATOR.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SectionAbout;
