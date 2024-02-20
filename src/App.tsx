import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import Navigation from "@components/Navigation";
import SectionHero from "@components/SectionHero";
import SectionAbout from "@components/SectionAbout";
import SectionTerms from "@components/SectionTerms";
import useCollectionInfo from "@/hooks/useCollectionInfo";

function App() {
  // Retrieves general NFT collection info
  // For user specific info, look at ButtonConnect.tsx
  useCollectionInfo();

  return (
    <>
      <Navigation />
      <SectionHero />
      <main>
        <SectionAbout />
        <SectionTerms />
      </main>
      <ToastContainer theme="dark" />
    </>
  );
}

export default App;
