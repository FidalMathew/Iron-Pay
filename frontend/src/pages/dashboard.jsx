import CustomButton from "@/components/customComponent/CustomButton";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {useRouter} from "next/router";
import {useEffect, useRef, useState} from "react";
import {useAccount} from "wagmi";
import {useDisconnect} from "wagmi";
import {useChains} from "wagmi";
import Link from "next/link";

export default function Dashboard() {
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

  const [openIntegrationModal, setOpenIntegrationModal] = useState(false);

  return (
    <div className="h-screen w-full font-ironFont pt-2 px-5">
      <Dialog
        open={openIntegrationModal}
        onOpenChange={setOpenIntegrationModal}
      >
        <DialogContent className="border-[2.5px] border-black">
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
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
              href="/"
              className="hover:underline underline-offset-8 cursor-pointer"
            >
              Dashboard
            </Link>
            <Link
              href="/"
              className="hover:underline underline-offset-8 cursor-pointer"
            >
              Integration
            </Link>
            <Link
              href="/"
              className="hover:underline underline-offset-8 cursor-pointer"
            >
              Analytics
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
      <div className="w-full h-[90%] flex justify-end items-start">
        <CustomButton
          backBg="bg-pink-500"
          className="mt-3"
          onClick={() => setOpenIntegrationModal((prev) => !prev)}
        />
      </div>
    </div>
  );
}
