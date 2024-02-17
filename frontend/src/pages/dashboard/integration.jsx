import NavbarComponent from "@/components/NavbarComponent";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, Form, Formik } from "formik";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import abi from "@/lib/merchant.json";
import { useReadContract, useWriteContract } from 'wagmi'

export default function Integration() {
  const [openIntegrationModal, setOpenIntegrationModal] = useState(false);
  const [addressAccounts, setAddressAccounts] = useState([]);

  const { writeContract } = useWriteContract()
  const contractAddress = "0x1e263d1073CF8879FfFfa2ce2d36Ff897bcaF382";

  // const getAddressAccounts = () => {


  //   if (0)
  //     setAddressAccounts(result.data)
  //   console.log(result.data, "result");
  // }

  const result = useReadContract({
    abi,
    address: contractAddress,
    functionName: "addressAccounts",
  });

  console.log(result.data, 'result')

  return (
    <>
      <NavbarComponent />

      <Dialog
        open={openIntegrationModal}
        onOpenChange={setOpenIntegrationModal}
      >
        <DialogContent className="border-[2.5px] border-black">
          <DialogHeader>
            <DialogTitle>Connect your Iron Fish Account</DialogTitle>
            <DialogDescription>
              <Formik
                initialValues={{
                  ironFishAddress: "",
                }}
                onSubmit={(val) => {
                  console.log(val)
                  // writeContract({
                  //   abi,
                  //   address: contractAddress,
                  //   functionName: "registerShop",
                  //   args: [
                  //     val.ironFishAddress
                  //   ],
                  // });
                }}
              >
                {(formik) => (
                  <Form className="py-4">
                    <div className="flex flex-col space-y-3">
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
      <div className="h-[90%] w-full font-ironFont p-7">
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
