"use client";
import { useState, useEffect } from "react";
import { IronfishAccountContext } from "./ironfish-context";
import { IronfishSdk } from "@ironfish/sdk";

export function IronfishAccountContextProvider({ children }) {
  const [response, setResponse] = useState();

  useEffect(() => {
    (async function main() {
      const sdk = await IronfishSdk.init({ dataDir: "~/.dev0" });
      const client = await sdk.connectRpc();

      const response = await client.wallet.getAccountPublicKey({
        account: process.env.ACCOUNT_KEY,
      });
      console.log(response);
      setResponse(response);
    })();
  });

  return (
    <IronfishAccountContext.Provider value={{ ironfishAccount: response }}>
      {children}
    </IronfishAccountContext.Provider>
  );
}
