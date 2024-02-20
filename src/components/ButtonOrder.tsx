import { useState } from "react";
import { useAccount } from "wagmi";
import { Icon } from "@iconify/react";
import Modal from "@components/Modal";
import RedeemWizard from "@/components/redeem/RedeemWizard";
import { useGlobalState } from "@/stores/app.store";

const ButtonOrder = () => {
  const { status } = useAccount();
  const [isModalOrderOpen, setIsModalOrderOpen] = useState(false);
  const [hasCommencedReservation] = useGlobalState("hasCommencedReservation");

  if (!hasCommencedReservation || status !== "connected") {
    return null;
  }

  return (
    <>
      <button
        type="button"
        className="btn join-item"
        onClick={() => setIsModalOrderOpen(true)}
      >
        Redeem NFT for Relay
        <Icon icon="eos-icons:volume-outlined" className="w-5 h-5" />
      </button>

      <Modal
        id="user_redeem_modal"
        isOpen={isModalOrderOpen}
        onClose={() => setIsModalOrderOpen(false)}
      >
        <div className="flex flex-col space-y-2 w-full">
          <RedeemWizard />
        </div>
      </Modal>
    </>
  );
};

export default ButtonOrder;
