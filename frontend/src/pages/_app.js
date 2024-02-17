import "@/styles/globals.css";
import { ConnectKitProviderComponent } from "@/utils/ConnectKitProvider";
import { useEffect, useState } from "react"

export default function App({ Component, pageProps }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    console.log(process.env.ACCOUNT_KEY);
  }, []);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <ConnectKitProviderComponent
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <Component {...pageProps} />
    </ConnectKitProviderComponent>
  );
}
