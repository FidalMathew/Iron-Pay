import {WagmiProvider, createConfig, http} from "wagmi";
import {sepolia} from "wagmi/chains";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ConnectKitProvider, getDefaultConfig} from "connectkit";
import {ThemeProvider as NextThemesProvider} from "next-themes";
const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [sepolia],
    transports: {
      // RPC URL for each chain
      [sepolia.id]: http(),
    },

    // Required API Keys
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,

    // Required App Info
    appName: "Your App Name",

    // Optional App Info
    appDescription: "Your App Description",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  })
);

const queryClient = new QueryClient();

export const ConnectKitProviderComponent = ({children, ...props}) => {
  return (
    <WagmiProvider config={config}>
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
    </WagmiProvider>
  );
};
