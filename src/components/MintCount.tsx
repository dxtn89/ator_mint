import { useGlobalState } from "@/stores/app.store";

const MintCount = () => {
  const [{ totalSupply, totalMintedCount }] = useGlobalState("collectionInfo");

  const total = Number(totalSupply || "1000");
  const mintCount = Number(totalMintedCount || "0");

  return (
    <div className="font-brand flex flex-col gap-4">
      <h2 className="countdown sm:text-3xl text-2xl text-gray-300 font-bold underline">
        {mintCount} of {total} minted
      </h2>

      {mintCount === 0 && (
        <p className="text-xl text-gray-400">Be the first to mint!</p>
      )}

      {mintCount > 0 && mintCount < 50 && (
        <p className="text-xl text-gray-400">
          Already minted. Only {total - Number(mintCount)} remain.
        </p>
      )}

      {mintCount > 50 && mintCount < 1000 && (
        <p className="sm:text-xl text-base text-gray-400">
          Hurry, only {total - Number(mintCount)} left.
        </p>
      )}

      {mintCount === 1000 && (
        <p className="sm:text-xl text-base text-gray-400">
          All have sold! Thank you!
        </p>
      )}
    </div>
  );
};

export default MintCount;
