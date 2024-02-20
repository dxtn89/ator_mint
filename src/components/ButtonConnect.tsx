import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useAccount, useChainId } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";

import Modal from "@components/Modal";
import UserNft from "@components/UserNft";
import RedeemWizard from "@/components/redeem/RedeemWizard";
import { useGlobalState } from "@/stores/app.store";
import useUserNftInfo from "@/hooks/useUserNftInfo";

export default function ButtonConnect({
  children,
}: {
  children?: React.ReactNode;
}) {
  const chainId = useChainId();
  const { open } = useWeb3Modal();
  const { address, status } = useAccount();
  const [{ ownsNft }] = useGlobalState("nftInfo");
  const [isModalNftOpen, setIsModalNftOpen] = useState(false);
  const [isModalOrderOpen, setIsModalOrderOpen] = useState(false);
  const [hasCommencedReservation] = useGlobalState("hasCommencedReservation");

  // Get user NFT info
  useUserNftInfo(chainId, address as `0x${string}`);

  // Report on wrong chain
  useEffect(() => {
    if (!address) return;
    if (chainId !== 1) {
      open({ view: "Networks" });
      console.error("wrong chain - you must be on mainnet");
      return;
    }
  }, [address, chainId, open]);

  const truncatedAddress = (address: `0x${string}`) =>
    `${address.substring(0, 10)}...${address.substring(address.length - 4)}`;

  return (
    <>
      {status !== "connected" && (
        <button type="button" className="btn" onClick={() => open()}>
          {children || "Connect"}
        </button>
      )}

      {status === "connected" && (
        <div className="join join-horizontal">
          <button
            type="button"
            className="btn join-item"
            onClick={() => open({ view: "Account" })}
          >
            {truncatedAddress(address)}
          </button>
          {ownsNft && (
            <>
              <button
                type="button"
                className="btn join-item"
                onClick={() => setIsModalNftOpen(true)}
              >
                <Icon
                  icon="eos-icons:data-scientist-outlined"
                  className="w-5 h-5"
                />
              </button>
              <Modal
                id="user_nft_modal"
                isOpen={isModalNftOpen}
                onClose={() => setIsModalNftOpen(false)}
              >
                <div className="flex flex-col space-y-2">
                  <UserNft />
                </div>
              </Modal>
            </>
          )}
          {hasCommencedReservation && (
            <>
              <button
                type="button"
                className="btn join-item"
                onClick={() => setIsModalOrderOpen(true)}
              >
                <Icon icon="eos-icons:volume-outlined" className="w-5 h-5" />
              </button>

              <Modal
                id="user_order_modal"
                isOpen={isModalOrderOpen}
                onClose={() => setIsModalOrderOpen(false)}
              >
                <div className="flex flex-col space-y-2">
                  <RedeemWizard />
                </div>
              </Modal>
            </>
          )}
        </div>
      )}
    </>
  );
}
