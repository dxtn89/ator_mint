import ethDenverMascot from "@assets/ethdenver.png";
import ethDenverLogo from "@assets/ethdenver-logo.png";

const Banner = () => {
  return (
    <div className="w-full  bg-gradient-to-br from-pink-400 to to-blue-500 border-b-4 border-pink-500 sm:h-36 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className=" flex items-center gap-4 justify-center sm:pt-6 py-4">
          <div className=" bg-white rounded-full w-24 h-24 p-5 ring ring-purple-500 sm:flex items-center justify-center hidden">
            <img
              src={ethDenverLogo}
              alt="ETH Denver mascot"
              className="w-16 h-auto "
            />
          </div>
          <div>
            <h4 className="text-white sm:text-3xl text-xl font-bold text-center">
              Pick up your relay at ETHDenver 2024
            </h4>
            <p className="text-white sm:text-base text-xs text-center">
              We are excited to announce that we will be at ETHDenver 2024.
              Eligible participants can pick up their relay at the event.
            </p>
          </div>
        </div>

        <img
          src={ethDenverMascot}
          alt="ETH Denver mascot"
          className="w-32 h-auto absolute right-0 top-3 rotate-12 hidden sm:block"
        />
      </div>
    </div>
  );
};

export default Banner;
