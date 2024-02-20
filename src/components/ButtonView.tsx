import { useState } from "react";
import { useAccount } from "wagmi";
import Modal from "@components/Modal";
import ButtonConnect from "@components/ButtonConnect";
import { useGlobalState } from "@/stores/app.store";
import UserNft from "./UserNft";

const ButtonView = () => {
  const { isConnected } = useAccount();
  const [{ ownsNft }] = useGlobalState("nftInfo");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {!isConnected ? (
        <ButtonConnect>Connect</ButtonConnect>
      ) : (
        <>
          {ownsNft ? (
            <button
              type="button"
              disabled={!ownsNft}
              className="btn border border-cyan-300 hover:bg-cyan-300 hover:text-black"
              onClick={() => setIsModalOpen(true)}
            >
              {ownsNft ? "View my NFT" : "Sold out!"}
            </button>
          ) : (
            <a
              target="_blank"
              rel="noreferrer"
              href="https://opensea.io/collection/ator-relay-nft"
              className="btn border border-cyan-300 hover:bg-cyan-300 hover:text-black"
            >
              View on OpenSea
            </a>
          )}

          <Modal
            id="nft_modal"
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          >
            <div className="flex flex-col space-y-2">
              <div className="relative">
                <UserNft />
              </div>
            </div>
          </Modal>
        </>
      )}
    </>
  );
};

export default ButtonView;
