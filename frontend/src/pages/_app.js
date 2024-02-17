import { IronfishAccountContextProvider } from "@/context/ironfish-context-provider";
import "@/styles/globals.css";
import { ConnectKitProviderComponent } from "@/utils/ConnectKitProvider";
import { useEffect, useState } from "react";
import IronfishContextProvider from "@/context/ironfishContextProvider";

export default function App({ Component, pageProps }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    console.log(process.env.ACCOUNT_KEY);
  }, []);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
<<<<<<< HEAD
    <IronfishAccountContextProvider>
=======
    <IronfishContextProvider>
>>>>>>> afcf9ac5fc535c5e15e899fd5e6b5c984c09dd93
      <ConnectKitProviderComponent
        attribute="class"
        defaultTheme="light"
        enableSystem
<<<<<<< HEAD
        disableTransitionOnChange
      >
        <Component {...pageProps} />
      </ConnectKitProviderComponent>
    </IronfishAccountContextProvider>
  );
=======
        disableTransitionOnChange>
        <Component {...pageProps} />
      </ConnectKitProviderComponent>
    </IronfishContextProvider>
  )
>>>>>>> afcf9ac5fc535c5e15e899fd5e6b5c984c09dd93
}
