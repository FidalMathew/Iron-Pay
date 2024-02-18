import {WagmiConfig, createConfig} from "wagmi";
import {sepolia} from "wagmi/chains";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ConnectKitProvider, getDefaultConfig} from "connectkit";
import {ThemeProvider as NextThemesProvider} from "next-themes";

const config = createConfig(
  getDefaultConfig({
    appName: "LFGHO hackathon",
    //infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
    alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_ID,
    chains: [sepolia],
    autoConnect: true,
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  })
);

const queryClient = new QueryClient();

export const ConnectKitProviderComponent = ({children, ...props}) => {
  return (
    <WagmiConfig config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider
          customTheme={{
            "--ck-connectbutton-font-size": "15px",
            "--ck-connectbutton-border-radius": "16px",
            "--ck-connectbutton-color": "#000000",
            "--ck-connectbutton-background": "#F6F7F9",
            "--ck-connectbutton-box-shadow": "3px 3px 0px 0px ",
            "--ck-connectbutton-hover-color": "#000000",
            "--ck-connectbutton-hover-background": "#F0F2F5",
            "--ck-connectbutton-hover-box-shadow": "2px 2px 0px 0px #000000",
            "--ck-connectbutton-active-color": "#373737",
            "--ck-connectbutton-active-background": "#f2ebf2",
            "--ck-connectbutton-active-box-shadow": "2px 2px 0px 0px #000000",
          }}
        >
          <NextThemesProvider {...props}>{children}</NextThemesProvider>
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiConfig>
  );
};
