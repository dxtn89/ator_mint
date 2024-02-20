import { useAccount } from "wagmi";

const ButtonViewCollection = () => {
  const { isConnected } = useAccount();

  if (isConnected) {
    return null;
  }

  return (
    <a
      className="btn"
      target="_blank"
      href="https://opensea.io/collection/ator-relay-nft"
    >
      View Atornauts collection
    </a>
  );
};

export default ButtonViewCollection;
