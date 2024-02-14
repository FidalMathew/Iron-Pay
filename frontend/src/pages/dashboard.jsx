import {ModeToggle} from "@/components/ui/Toggletheme";
import {Button} from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {useAccount} from "wagmi";
export default function Dashboard() {
  const account = useAccount();
  console.log(account, "acc");
  const router = useRouter();

  useEffect(() => {
    if (!account.address) {
      router.push("/connectwallet");
    }
  }, [account.address]);
  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col">
      <div className="absolute top-5 right-10">
        <div className="flex space-x-5">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline">
                {/* {address && address.slice(0, 5) + "...." + address.slice(-4)} */}
                address
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  //   if (chain && chain.id === 43113) {
                  //     switchNetwork(80001);
                  //   } else if (chain && chain.id === 80001) {
                  //     switchNetwork(43113);
                  //   }
                }}
              >
                Switch to{" "}
                {/* {chain && chain.id === 43113
                  ? "Mumbai"
                  : chain && chain.id === 80001 && "Avalanche"} */}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  // disconnect
                }}
              >
                <p className="text-red-400">Disconnect</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* <ModeToggle /> */}
        </div>
      </div>
      <div>{"chain && chain.name"}</div>
    </div>
  );
}
