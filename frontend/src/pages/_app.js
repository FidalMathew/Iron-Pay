import "@/styles/globals.css";
import { ConnectKitProviderComponent } from "@/utils/ConnectKitProvider";
import { useEffect, useState } from "react";
import IronfishContextProvider from "@/context/ironfishContextProvider";

export default function App({ Component, pageProps }) {

  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;


  return (
    <IronfishContextProvider>
      <ConnectKitProviderComponent
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange>
        <Component {...pageProps} />
      </ConnectKitProviderComponent>
    </IronfishContextProvider>
  )
}
