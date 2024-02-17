import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {useRouter} from "next/router";
import {useEffect, useRef, useState} from "react";
import {useAccount} from "wagmi";
import {useDisconnect} from "wagmi";
import {useChains} from "wagmi";
import {ModeToggle} from "./ui/Toggletheme";
import {Button} from "./ui/button";
import Link from "next/link";

export default function NavbarComponent() {
  const account = useAccount();
  console.log(account, "acc");
  const router = useRouter();
  const {disconnect} = useDisconnect();
  const chains = useChains();
  console.log(chains, "chain");
  const ref = useRef();

  useEffect(() => {
    if (!account.address) {
      router.push("/connectwallet");
    }
  }, [account.address]);

  return (
    <>
      <div className="flex justify-between p-5 h-[10%]">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <img
              src="/images/HexFIshLogo.png"
              alt="fishlogo"
              className="w-[1.7rem] h-[1rem] contrast-200 aspect-square"
            />
            <h1 className="text-lg">Iron Pay</h1>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/dashboard"
              className="hover:underline underline-offset-8 cursor-pointer"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/integration"
              className="hover:underline underline-offset-8 cursor-pointer"
            >
              Integration
            </Link>
          </div>
        </div>

        <div className="flex space-x-5">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button
                variant="outline"
                className="focus-visible:border-none focus-visible:outline-none focus-visible:ring-0"
                style={{boxShadow: "3px 3px black"}}
              >
                {account.address &&
                  account.address.slice(0, 5) +
                    "...." +
                    account.address.slice(-4)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => disconnect()}>
                <p className="text-red-400">Disconnect</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ModeToggle />
        </div>
      </div>
    </>
  );
}
