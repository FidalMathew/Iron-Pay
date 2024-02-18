import NavbarComponent from "@/components/NavbarComponent";
import {useRouter} from "next/router";
import {ClipboardCopy, Check} from "lucide-react";
import {useEffect, useState} from "react";
import {ethers} from "ethers";
import {abi} from "@/lib/merchant";

export default function IntegrationId() {
  const router = useRouter();
  const [isCopySuccessful, setIsCopySuccessful] = useState(false);

  const contractAddress = "0x8f2806160077e9cd6532DBC6F1886082479290f6";

  const ETHERSJS_PROVIDERS = new ethers.providers.Web3Provider(window.ethereum);
  const signer = ETHERSJS_PROVIDERS.getSigner();
  const contract = new ethers.Contract(contractAddress, abi, signer);

  useEffect(() => {
    (async function retrieveAddress() {
      const results = await contract.getAddressById(router.query.id);
      console.log("address", results);
    })();
  }, []);

  const codeString = `
  import {IronFishButton} from "ironpay-sdk";

  export default function YourApp() {
    return (
      <IronFishButton
        id={${router.query.id}}
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

  return (
    <div className="h-screen w-full">
      <NavbarComponent />
      <div className="h-[90%] flex p-5 flex-col md:flex-row">
        <div className="w-full md:w-1/3 flex flex-col p-10 font-ironFont h-1/3 md:h-full">
          <p>Iron Fish Account</p>
        </div>

        <div className="w-full flex justify-center items-center h-2/3 md:h-full relative">
          <div className="border-2 border-black rounded-[0.1rem] h-full w-full relative z-10 bg-white">
            {isCopySuccessful ? (
              <Check className="duration-100 ease-in-out absolute right-4 top-4 text-slate-600 hover:bg-slate-300 rounded-sm cursor-pointer p-1 h-[30px] w-[30px]" />
            ) : (
              <ClipboardCopy
                onClick={handleCopyClick}
                className="duration-100 ease-in-out absolute right-4 top-4 text-slate-600 hover:bg-slate-300 rounded-sm cursor-pointer p-1 h-[30px] w-[30px]"
              />
            )}
            <h1 className="text-2xl font-bold mx-10 mt-10">Copy the snippet</h1>
            <pre className="p-4 flex h-full text-lg">{codeString}</pre>
          </div>
          <div
            className={`h-full w-full border absolute border-black translate-x-[4px] translate-y-[4px] z-0 rounded-[0.1rem] group-hover:translate-x-[3px] group-hover:translate-y-[3px] duration-100 ease-in bg-pink-500`}
          />
        </div>
      </div>
    </div>
  );
}
