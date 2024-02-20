import { useCallback, useState } from "react";
import { useAccount, useChainId } from "wagmi";
import { formatUnits, parseEther } from "viem";
import { useGlobalState } from "@/stores/app.store";
import approveAtor from "@/web3/erc20";

import CriteriaWrapper from "@components/redeem/CriteriaWrapper";
// import { setHasPaidRelayFee } from "@/stores/app.store";
import EmailProvider from "./EmailProvider";

// Wallet connected
export const CriteriaOne = () => {
  const { isConnected, isConnecting, isReconnecting } = useAccount();

  return (
    <CriteriaWrapper status={isConnected ? "passed" : "failed"}>
      <span className="text-sm font-medium text-cyan-100">
        Wallet Connected
      </span>
      <span className="text-sm text-gray-500">
        {isConnecting || isReconnecting
          ? "Connecting..."
          : "Wallet is connected"}
      </span>
    </CriteriaWrapper>
  );
};

// Owns NFT
export const CriteriaTwo = () => {
  const { status } = useAccount();
  const [{ ownsNft }] = useGlobalState("nftInfo");

  return (
    <CriteriaWrapper
      disabled={status !== "connected"}
      status={ownsNft ? "passed" : "failed"}
    >
      <span className="text-sm font-medium text-cyan-100">
        Owns Atornauts NFT
      </span>
      {ownsNft ? (
        <p className="text-sm text-gray-500">Owned</p>
      ) : (
        <>
          <p className="text-sm text-gray-500">
            You do not own an Atornauts NFT.
          </p>
          <p className="text-sm text-gray-500">
            View the collection on{" "}
            <a
              target="_blank"
              rel="noreferrer"
              className="underline"
              href="https://opensea.io/collection/ator-relay-nft"
            >
              OpenSea
            </a>
            .
          </p>
        </>
      )}
    </CriteriaWrapper>
  );
};

// Hold enough ATOR
export const CriteriaThree = () => {
  const { isConnected } = useAccount();

  const [{ hasSufficientBalance, atorBalance, ownsNft }] =
    useGlobalState("nftInfo");
  return (
    <CriteriaWrapper
      disabled={!ownsNft}
      status={hasSufficientBalance ? "passed" : "failed"}
    >
      <span className="text-sm font-medium text-cyan-100">
        Sufficient ATOR balance
      </span>
      <span className="text-sm text-gray-500">
        {hasSufficientBalance
          ? "Sufficient ATOR Balance"
          : "Insufficient ATOR balance"}
      </span>
      {isConnected ? (
        <>
          <p className="text-sm text-gray-500">
            Your $ATOR balance is:{" "}
            <span className="text-cyan-200">
              {Number(formatUnits(atorBalance, 18))?.toFixed(2)}.
            </span>{" "}
          </p>

          <p className="text-sm text-gray-500">
            You can{" "}
            <a
              className="underline"
              href="https://earn.brewlabs.info/swap"
              target="_blank"
            >
              swap ETH for ATOR token here.
            </a>
          </p>
        </>
      ) : (
        <p className="w-20 h-3 skeleton"></p>
      )}
    </CriteriaWrapper>
  );
};

// Has paid relay fee
export const CriteriaFour = () => {
  const chainId = useChainId();
  const [isWorking, setIsWorking] = useState(false);
  const [{ isApproved, hasSufficientBalance, ownsNft }] =
    useGlobalState("nftInfo");
  const [phase, setPhase] = useState<
    "approval" | "payment" | "complete" | null
  >(null);

  const approve = useCallback(async () => {
    setIsWorking(true);
    setPhase("approval");
    await approveAtor(chainId, parseEther("250"));
    setPhase("complete");
    setIsWorking(false);
  }, [chainId]);

  return (
    <CriteriaWrapper
      disabled={!ownsNft || !hasSufficientBalance}
      status={isApproved ? "passed" : "failed"}
    >
      <span className="text-sm font-medium text-cyan-100">Redeem and pay</span>
      <span className="text-sm text-gray-500">
        This step requires approval and then payment is take.
      </span>

      <button
        type="button"
        className="btn btn-sm btn-ghost btn-outline mt-4"
        onClick={approve}
        disabled={isApproved || phase === "complete" || isWorking}
      >
        {isApproved && "Approved"}

        {!isApproved && phase === null && "Start approval and payment process"}

        {phase === "approval" && "Approving..."}

        {phase === "payment" && "Processing payment..."}

        {phase === "complete" && "Done! Ready for next step"}

        {isWorking && (
          <span className="loading loading-spinner loading-sm"></span>
        )}
      </button>
    </CriteriaWrapper>
  );
};

// Has supplied postal address
export const CriteriaFive = () => {
  const [{ hasSuppliedPostalAddress, hasPaidRelayFee }] =
    useGlobalState("userInfo");

  return (
    <CriteriaWrapper
      isLastItem={true}
      disabled={!hasPaidRelayFee}
      status={hasSuppliedPostalAddress ? "passed" : "failed"}
    >
      <span className="text-sm font-medium text-cyan-100">
        Supplied postal address
      </span>
      <p className="text-sm text-gray-500">
        {hasSuppliedPostalAddress
          ? "We have your postal details"
          : "Please supply your postal details so we can send you your Relay."}
      </p>
      <a href="#" className="btn btn-sm btn-ghost btn-outline w-fit mt-4">
        Add postal address
      </a>
      <small className="text-xs text-gray-300 mt-6">
        Your address details are stored with a third party, privacy is
        important.
      </small>
    </CriteriaWrapper>
  );
};

// Has supplied email address for pickup
export const CriteriaSix = () => {
  const [{ hasPaidRelayFee, hasSuppliedEmailAddress }] =
    useGlobalState("userInfo");
  const [{ hasSufficientBalance, ownsNft, isApproved }] =
    useGlobalState("nftInfo");

  return (
    <CriteriaWrapper
      isLastItem={true}
      disabled={
        !ownsNft || !hasSufficientBalance || !hasPaidRelayFee || !isApproved
      }
      status={hasSuppliedEmailAddress ? "passed" : "failed"}
    >
      <span className="text-sm font-medium text-cyan-100">
        Supply email address for pick up
      </span>
      <p className="text-sm text-gray-500">
        {hasSuppliedEmailAddress
          ? "We have your email address for pickup"
          : "We will send you a unique code to your email for pickup. Keep this safe and secure."}
      </p>
      <EmailProvider />
    </CriteriaWrapper>
  );
};
