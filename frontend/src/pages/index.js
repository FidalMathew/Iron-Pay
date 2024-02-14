import { ConnectKitProvider } from "@/utils/ConnectKitProvider";
import { ConnectKitButton } from "connectkit";

export default function Home() {
  return (
    <ConnectKitProvider>
      <ConnectKitButton />
    </ConnectKitProvider>
  );
}
