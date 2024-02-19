import NavbarComponent from "@/components/NavbarComponent";
import {useRouter} from "next/router";
import {ClipboardCopy, Check} from "lucide-react";
import {useEffect, useState} from "react";
import {ethers} from "ethers";
import {abi} from "@/lib/merchant";

export default function IntegrationId() {
  const router = useRouter();
  const [isCopySuccessful, setIsCopySuccessful] = useState(false);
  const [isCopySuccessful1, setIsCopySuccessful1] = useState(false);

  const contractAddress = "0xcea3f55B9f65Ac24fBaCBf9516c3f291F9DFd1D6";

  const ETHERSJS_PROVIDERS = new ethers.providers.Web3Provider(window.ethereum);
  const signer = ETHERSJS_PROVIDERS.getSigner();
  const contract = new ethers.Contract(contractAddress, abi, signer);

  useEffect(() => {
    (async function retrieveAddress() {
      const results = await contract.getAddressById(router.query.id);
      console.log("address", results);
    })();
  }, []);

  useEffect(() => {
    if (router.isReady) {
      // Code using query
      console.log(router.query);
    }
  }, [router.isReady]);

  const codeString = `
  import {IronFishButton} from "ironpay-sdk";

  export default function YourApp() {
    return (
      <IronFishButton
        id={${router.query.id}}
        text="Pay with Iron"
          amount={100000000}
          // example product object
          product={{
            name: "Ironfish",
            price: 100000000,
            qty: 2,
            productId: "002",
            timestamp: "0",
          }}
      />
    );
  }
  `;

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(codeString);
      setIsCopySuccessful(true);

      // Reset the success state after 1.5 seconds
      setTimeout(() => {
        setIsCopySuccessful(false);
      }, 1500);
    } catch (error) {
      console.error("Error copying to clipboard:", error);
    }
  };

  const handleCopyClick1 = async (codestring) => {
    try {
      await navigator.clipboard.writeText(codestring);
      setIsCopySuccessful1(true);

      // Reset the success state after 1.5 seconds
      setTimeout(() => {
        setIsCopySuccessful1(false);
      }, 1500);
    } catch (error) {
      console.error("Error copying to clipboard:", error);
    }
  };

  // if (!router.isReady) return <div>Loading...</div>;
  return (
    <div className="h-screen w-full">
      <NavbarComponent />
      <div className="h-[90%] flex p-5 flex-col gap-3">
        <div className="flex gap-3 h-full">
          <div className="w-1/2 h-full flex flex-col p-10 font-ironFont md:h-full border-2 border-black shadow-[2px_2px_0_0_#000] text-2xl">
            <p className="font-semibold">Iron Fish Account</p>
            <p className="truncate mt-4">{router.query.integration[1]}</p>
          </div>
          <div className="w-1/2 relative h-full flex flex-col p-10 font-ironFont md:h-full border-2 border-black shadow-[2px_2px_0_0_#000] text-2xl">
            {isCopySuccessful1 ? (
              <Check className="duration-100 ease-in-out absolute right-4 top-4 text-slate-600 hover:bg-slate-300 rounded-sm cursor-pointer p-1 h-[30px] w-[30px]" />
            ) : (
              <ClipboardCopy
                onClick={() => handleCopyClick1(router.query.id)}
                className="duration-100 ease-in-out absolute right-4 top-4 text-slate-600 hover:bg-slate-300 rounded-sm cursor-pointer p-1 h-[30px] w-[30px]"
              />
            )}
            <p className="font-semibold">API Key</p>
            <p className="truncate mt-4">{router.query.id}</p>
          </div>
        </div>

        <div className="w-full flex justify-center items-center h-2/3 md:h-full relative">
          <div className="border-2 border-black rounded-[0.1rem] h-full w-full relative z-10 bg-white overflow-y-scroll box-code">
            {isCopySuccessful ? (
              <Check className="duration-100 ease-in-out absolute right-4 top-4 text-slate-600 hover:bg-slate-300 rounded-sm cursor-pointer p-1 h-[30px] w-[30px]" />
            ) : (
              <ClipboardCopy
                onClick={() => handleCopyClick(codeString)}
                className="duration-100 ease-in-out absolute right-4 top-4 text-slate-600 hover:bg-slate-300 rounded-sm cursor-pointer p-1 h-[30px] w-[30px]"
              />
            )}
            <h1 className="text-2xl font-bold mx-10 mt-10">Copy the snippet</h1>
            <pre className="p-4 flex h-full text-xs md:text-lg">
              {codeString}
            </pre>
          </div>
          <div
            className={`h-full w-full border absolute border-black translate-x-[4px] translate-y-[4px] z-0 rounded-[0.1rem] group-hover:translate-x-[3px] group-hover:translate-y-[3px] duration-100 ease-in bg-pink-500`}
          />
        </div>
      </div>
    </div>
  );
}
