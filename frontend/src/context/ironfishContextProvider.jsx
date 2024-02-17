import {useEffect, useState} from "react";
import IronfishContext from "./ironfishContext";
// import {IronfishSdk} from "@ironfish/sdk";

export default function IronfishContextProvider({children}) {
  const [client, setClient] = useState({});

  // useEffect(() => {
  //   async function main() {
  //     const sdk = await IronfishSdk.init({dataDir: "~/.dev0"});
  //     const client = await sdk.connectRpc("http://localhost:9001");
  //     setClient(client);
  //   }

  //   main();
  // }, []);

  return (
    <IronfishContext.Provider value={{ironfishClient: client}}>
      {children}
    </IronfishContext.Provider>
  );
}
