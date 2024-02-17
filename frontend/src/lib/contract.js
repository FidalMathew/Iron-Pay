import contractABI from "@/lib/merchant.json";
const contractAddress = "0x92b325558bf2838436Cd3aa7fE7D0E8a0840Ab72";

import { useReadContract } from "wagmi";

const viewTransactions = () => {
  const result = useReadContract({
    abi,
    address: contractAddress,
    functionName: "viewTransactions",
  });

  return result;
};

const registerShop = () => {
  writeContract({
    abi,
    address: contractAddress,
    functionName: "registerShop",
    args: [
      "0xd2135CfB216b74109775236E36d4b433F1DF507B",
      "0xA0Cf798816D4b9b9866b5330EEa46a18382f251e",
      123n,
    ],
  });
};
