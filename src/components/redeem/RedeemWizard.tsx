import "@/styles/redeemWizard.css";
import { twMerge } from "tailwind-merge";
import {
  CriteriaOne,
  CriteriaTwo,
  CriteriaThree,
  CriteriaFour,
  CriteriaSix,
} from "@/components/redeem/RedeemCriteria";
import useGlowEffect from "@/hooks/useGlowEffect";
import DelayRender from "@/components/DelayRender";
import NominatePickup from "@/components/redeem/NominatePickup";
import { useGlobalState } from "@/stores/app.store";

const RedeemWizard = () => {
  const [{ hasNominatedPickup }] = useGlobalState("userInfo");

  const criteria = [
    {
      id: 1,
      component: CriteriaOne,
    },
    {
      id: 2,
      component: CriteriaTwo,
    },
    {
      id: 3,
      component: CriteriaThree,
    },
    {
      id: 4,
      component: CriteriaFour,
    },
    {
      id: 5,
      component: CriteriaSix,
    },
  ];

  useGlowEffect("#redeem.glow-card-container", "#redeem .glow-card");

  return (
    <div id="redeem" className="font-brand glow-card-container sm:p-8">
      <div className="glow-card bg-zinc-900/95 rounded-3xl px-6 py-8 sm:h-[900px] h-[calc(100svh-4rem)] relative">
        <h2 className="text-xl text-teal-200 pt-2 pb-1">
          Redeem your NFT for a Relay
        </h2>
        <p className="text-sm text-teal-200 pb-2 [text-wrap:balance]">
          We are only taking orders to be picked up at ETH Denver. Shipping will
          be available early March.
        </p>
        <div className="glows opacity-20 blur"></div>
        <div className="overflow-auto h-[93%] no-scrollbar relative">
          <NominatePickup />

          <nav aria-label="Progress">
            <ol
              role="list"
              className={twMerge(
                "overflow-hidden py-4",
                hasNominatedPickup ? "opacity-100" : "opacity-25"
              )}
            >
              {criteria.map((step, stepIdx) => (
                <li
                  key={step.id}
                  className={twMerge(
                    "relative",
                    stepIdx !== criteria.length - 1 && "pb-10"
                  )}
                >
                  <DelayRender waitBeforeShow={500 * stepIdx}>
                    {step.component()}
                  </DelayRender>
                </li>
              ))}
            </ol>
          </nav>
        </div>
        <div className="absolute bottom-0 w-full bg-gradient-to-t from-zinc-900 h-12 inset-x-0 rounded-b-2xl"></div>
      </div>
    </div>
  );
};

export default RedeemWizard;
