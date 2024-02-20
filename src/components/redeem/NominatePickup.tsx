import { useGlobalState, setHasNominatedPickup } from "@/stores/app.store";

const NominatePickup = () => {
  const [{ hasNominatedPickup }] = useGlobalState("userInfo");

  return (
    <div className="form-control rounded-2xl p-6 ring ring-teal-600 ml-1 mr-8 my-12">
      <label className="label cursor-pointer">
        <span className="label-text">
          I'll be picking up the relay at ETH Denver 2024.
        </span>
        <input
          type="checkbox"
          checked={hasNominatedPickup}
          onChange={() => setHasNominatedPickup(!hasNominatedPickup)}
          className="checkbox"
        />
      </label>
      <span className="w-full text-xs mt-2 text-gray-300 max-w-sm">
        By clicking this box you acknowledge that you will be picking up your
        relay at ETH Denver 2024, 23 February - 03 March.
      </span>
    </div>
  );
};

export default NominatePickup;
