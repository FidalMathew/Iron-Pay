import {ConnectKitButton} from "connectkit";
import {useEffect} from "react";
import {useAccount} from "wagmi";
import {useRouter} from "next/router";

export default function connectwallet() {
  const account = useAccount();
  const router = useRouter();
  useEffect(() => {
    // if (isConnected && chain.id != "80001" && chain.id != "43113") {
    //   router.push("/switchnetwork");
    // }
    if (account.address) {
      router.push("/dashboard");
    }
  }, [account]);
  return (
    <div className="h-screen w-full grid place-items-center">
      <ConnectKitButton />
    </div>
  );
}
