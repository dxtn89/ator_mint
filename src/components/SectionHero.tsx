import { Icon } from "@iconify/react";
import heroImage from "@assets/hero-bg.webp";

import MintCount from "@components/MintCount";
import ButtonView from "@components/ButtonView";
import ButtonOrder from "@components/ButtonOrder";
import GlitchWords from "@components/GlitchWords";
import WhitelistNotice from "@components/WhitelistNotice";
import ButtonViewCollection from "@components/ButtonViewCollection";

const SectionHero = () => (
  <div className="relative isolate pt-14 font-brand min-h-screen">
    <img
      src={heroImage}
      alt="background image"
      className="absolute inset-0 -z-10 h-full w-full object-cover opacity-10 [mask-image:linear-gradient(to_bottom,black_60%,transparent)]"
    />
    <div
      className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      aria-hidden="true"
    >
      <div
        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-teal-300 to-cyan-200 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        style={{
          clipPath:
            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
        }}
      ></div>
    </div>
    <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 px-6">
      <WhitelistNotice />

      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-6xl flex items-center justify-center gap-2 font-brand">
          <GlitchWords parts={["Mint.", "Reserve.", "Receive."]} />
        </h1>
        <p className="mt-6 sm:text-lg text-sm leading-8 text-gray-300">
          The ATOR Relay NFT Mint is upon us! Mint an ATOR Relay Whitelist NFT
          now for 0.1 ETH. In Phase II, once your shipping batch is eligible,
          exchange for a relay with 250 ATOR.
        </p>
        <div className="mx-auto w-fit relative my-8">
          <MintCount />

          <a href="#terms-and-conditions" className="absolute -top-4 -right-8">
            <Icon icon="mdi:information-outline" className="w-5 h-5" />
          </a>
        </div>

        <div className="mt-10 flex justify-center gap-x-6">
          <ButtonView />
          <ButtonOrder />
          <ButtonViewCollection />
        </div>
      </div>
    </div>
    <div
      className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      aria-hidden="true"
    >
      <div
        className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-cyan-300 to-teal-600 opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
        style={{
          clipPath:
            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
        }}
      ></div>
    </div>
  </div>
);
export default SectionHero;
