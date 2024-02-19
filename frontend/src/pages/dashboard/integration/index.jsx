import NavbarComponent from "@/components/NavbarComponent";
import {Plus} from "lucide-react";
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {Field, Form, Formik} from "formik";
import {Input} from "@/components/ui/input";
import {Label} from "@radix-ui/react-dropdown-menu";
import {abi} from "@/lib/merchant";
import {ethers} from "ethers";
import {useRouter} from "next/router";
import {v4 as uuidv4} from "uuid";

export default function Integration() {
  const [openIntegrationModal, setOpenIntegrationModal] = useState(false);
  const router = useRouter();
  const [allIntegrations, setAllIntegrations] = useState([]);
  const contractAddress = "0xcea3f55B9f65Ac24fBaCBf9516c3f291F9DFd1D6";

  const ETHERSJS_PROVIDERS = new ethers.providers.Web3Provider(window.ethereum);
  const signer = ETHERSJS_PROVIDERS.getSigner();
  const contract = new ethers.Contract(contractAddress, abi, signer);

  async function registerShop(val) {
    // console.log(uuidv4());
    try {
      const result = await contract.registerShop(
        val.nameOfShop,
        val.ironFishAddress,
        uuidv4()
      );
      console.log("result", result);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    (async function getAllAccountAddresses() {
      const results = await contract.retrieveAllIntegrations();
      console.log("results", results);
      setAllIntegrations(results);
    })();
  }, []);

  return (
    <>
      <NavbarComponent />

      <Dialog
        open={openIntegrationModal}
        onOpenChange={setOpenIntegrationModal}
      >
        <DialogContent className="border-[2.5px] border-black">
          <DialogHeader>
            <DialogTitle>Add Iron Fish Address to your Integration</DialogTitle>
            <DialogDescription>
              <Formik
                initialValues={{
                  nameOfShop: "",
                  ironFishAddress: "",
                }}
                onSubmit={(val) => registerShop(val)}
              >
                {(formik) => (
                  <Form className="py-4 flex flex-col space-y-5">
                    <div className="flex flex-col space-y-2">
                      <Label className="ml-1" htmlFor="nameOfShop">
                        Name of Shop
                      </Label>
                      <Field
                        as={Input}
                        name="nameOfShop"
                        label="nameOfShop"
                        className="border-2 border-black focus-visible:ring-0"
                        placeholder="Name of Shop"
                      />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Label className="ml-1" htmlFor="ironFishAddress">
                        Iron Fish account address
                      </Label>
                      <Field
                        as={Input}
                        name="ironFishAddress"
                        label="ironFishAddress"
                        className="border-2 border-black focus-visible:ring-0"
                        placeholder="Enter Iron Fish Address..."
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="outline"
                      className="mt-4 border-2 border-black w-full shadow-[2px_2px_0_0_#000] hover:shadow-0 duration-100 ease-in-out"
                    >
                      Connect
                    </Button>
                  </Form>
                )}
              </Formik>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <div className="h-full w-full font-ironFont p-7 flex gap-3">
        {allIntegrations.length !== 0 &&
          allIntegrations.map((integration) => (
            <div
              className="relative group cursor-pointer"
              onClick={() =>
                router.push({
                  pathname: `/dashboard/integration/${integration.id}`,
                  query: {
                    integration: integration,
                  },
                })
              }
            >
              <div className="h-[200px] w-[350px] rounded-[0.1rem] border-2 border-black flex flex-col p-5 gap-3 bg-white absolute z-10 font-semibold text-lg">
                <p>
                  <span className="font-normal">Name: </span>
                  <span>{integration.name}</span>
                </p>
                <p>
                  <span className="font-normal">Iron Fish Address: </span>
                  <span>
                    {integration.Address.slice(2, 10) +
                      "..." +
                      integration.Address.slice(-5)}
                  </span>
                </p>
              </div>
              <div
                className={`border border-black h-[200px] w-[350px] translate-x-[4px] translate-y-[4px] z-0 rounded-[0.1rem] group-hover:translate-x-[3px] group-hover:translate-y-[3px] duration-100 ease-in bg-pink-500`}
              />
            </div>
          ))}
        <div
          className="relative group cursor-pointer"
          onClick={() => setOpenIntegrationModal((prev) => !prev)}
        >
          <div className="h-[200px] w-[350px] rounded-[0.1rem] border-2 border-black flex flex-col justify-center items-center gap-3 bg-white absolute z-10 font-semibold text-lg">
            <div className="relative group">
              <Plus className="border-2 border-black rounded-full p-[3px] h-10 w-10 text-gray-600 absolute z-10 bg-white" />
              <div className="h-10 w-10 translate-x-[1px] translate-y-[1px] bg-pink-500 rounded-full z-0" />
            </div>
            <p>New Integration</p>
          </div>
          <div
            className={`border border-black h-[200px] w-[350px] translate-x-[4px] translate-y-[4px] z-0 rounded-[0.1rem] group-hover:translate-x-[3px] group-hover:translate-y-[3px] duration-100 ease-in bg-pink-500`}
          />
        </div>
      </div>
    </>
  );
}
