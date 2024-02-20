import React from "react";
import ReactDOM from "react-dom/client";

import "animate.css";
import "@/styles/index.css";
import App from "@/App.tsx";

import { WagmiConfig } from "wagmi";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { projectId, chains, wagmiConfig } from "@/config/walletConnect.config";
import Banner from "./components/Banner";

createWeb3Modal({
  chains,
  projectId,
  wagmiConfig,
  themeVariables: {
    "--w3m-accent": "#22d3ee",
    "--w3m-font-family": "Almarena Mono Display",
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <Banner />
      <div className="relative">
        <App />
      </div>
    </WagmiConfig>
  </React.StrictMode>
);
