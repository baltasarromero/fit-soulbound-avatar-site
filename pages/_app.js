import "../styles/globals.css";
import MainLayout from "../layout/mainLayout";

//import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
//import { configureChains, createClient, WagmiConfig } from "wagmi";
//import { polygon, sepolia, polygonMumbai } from "wagmi/chains";
//import { alchemyProvider } from "wagmi/providers/alchemy";
//import { publicProvider } from "wagmi/providers/public";

/* const { chains, provider } = configureChains(
  [sepolia, polygon, polygonMumbai],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_API_KEY }), publicProvider()]
); */

/* const { connectors } = getDefaultWallets({
  appName: "FIT NFT DApp",
  chains,
}); */

/* const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
}); */

//export { WagmiConfig, RainbowKitProvider };

function MyApp({ Component, pageProps }) {
  return (
    /*  <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        modalSize="compact"
        initialChain={process.env.NEXT_PUBLIC_DEFAULT_CHAIN}
        chains={chains}
      >
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </RainbowKitProvider>
    </WagmiConfig> */
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  );
}

export default MyApp;
