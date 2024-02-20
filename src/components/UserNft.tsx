import { useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import GlitchWords from "@components/GlitchWords";
import { useGlobalState } from "@/stores/app.store";
import genericNft from "@/assets/generic-nft.jpg";

const pinataBase =
  "https://gateway.pinata.cloud/ipfs/QmRH6ii5sNdcqpgm8edDkVvGrD1rvSgG1haR8jnJf2tAUa/";

const UserNft = () => {
  const [{ tokens }] = useGlobalState("nftInfo");
  const [hasDoneNftReveal] = useGlobalState("hasDoneNftReveal");
  const [imgPath, setImgPath] = useState(genericNft);

  const allTokenIds = useMemo(() => {
    if (!tokens) return;
    // Set image path
    setImgPath(
      `${pinataBase}nft_${String(tokens[0]).padStart(4, "0") + ".jpg"}`
    );
    // Get NFT Id
    let a: string = "";
    tokens.forEach((e, index) => {
      if (index == 0) a = a + `#${e}`;
      else a = a + ` #${e}`;
    });
    return a;
  }, [tokens]);

  return (
    <div className="flex flex-col items-center gap-8 animate__animated animate__zoomIn animate__faster">
      <h2 className="sm:text-4xl text-2xl font-bold tracking-tight text-gray-100 flex flex-wrap items-center justify-center gap-2 font-brand">
        <GlitchWords
          parts={["Well done!", `You own Atornaut NFT ${allTokenIds}`]}
        />
      </h2>

      <div className="bg-gradient-to-br from-gray-500 to-white rounded-lg overflow-hidden p-1 shadow shadow-gray-900 w-96 h-96">
        {hasDoneNftReveal ? (
          <img
            src={`https://gateway.pinata.cloud/ipfs/QmRH6ii5sNdcqpgm8edDkVvGrD1rvSgG1haR8jnJf2tAUa/${imgPath}`}
          />
        ) : (
          <img src={genericNft} />
        )}
      </div>

      {!hasDoneNftReveal && (
        <p className="text-cyan-100 text-center">
          Stay tuned for the reveal. Check our socials for updates.
        </p>
      )}
      <div className="flex justify-center items-center dark:text-cyan-300 gap-4 mt-auto">
        <a href="http://discord.gg/ator" target="_blank">
          <Icon icon="simple-icons:discord" className="h-5 w-auto"></Icon>
        </a>
        <a href="https://twitter.com/atorprotocol" target="_blank">
          <Icon icon="simple-icons:x" className="h-5 w-auto"></Icon>
        </a>
        <a href="https://t.me/atorcommunityportal" target="_blank">
          <Icon icon="simple-icons:telegram" className="h-5 w-auto"></Icon>
        </a>
        <a href="http://youtube.com/@atorprotocol" target="_blank">
          <Icon icon="simple-icons:youtube" className="h-5 w-auto"></Icon>
        </a>
      </div>
    </div>
  );
};

export default UserNft;
