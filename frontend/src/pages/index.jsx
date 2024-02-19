import {Button} from "@/components/ui/button";
import {useRouter} from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <div className="h-screen flex items-center justify-center p-4 font-ironFont">
      <div className="bg-[#FFC2E8] h-full w-full rounded-lg flex justify-start items-center p-5">
        <div className="w-1/2 h-full flex flex-col justify-center items-center">
          <p className="text-6xl">
            <p className="text-7xl mb-4">IRON Pay</p>
            <span>Paying with IRON</span>
            <br />
            <span>Simplfied</span>
            <Button
              className="w-full border-2 border-black shadow-[2px_2px_0_0_#000]"
              variant="outline"
              onClick={() => router.push("/connectwallet")}
            >
              Go to Dashboard
            </Button>
          </p>
        </div>
        <div className="w-1/2 h-full flex flex-col justify-center items-center">
          <img src="/illustrations/15.png" alt="img" className="h-1/2" />
        </div>
      </div>
    </div>
  );
}
