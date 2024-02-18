import NavbarComponent from "@/components/NavbarComponent";
import {useRouter} from "next/router";
import {useEffect, useRef, useState} from "react";
import {useAccount} from "wagmi";
import {useDisconnect} from "wagmi";
import {useChains} from "wagmi";
import {ethers} from "ethers";
import {Bar, BarChart, ResponsiveContainer, XAxis, YAxis} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ShoppingBag,
  ShoppingCart,
  ScanBarcode,
  ShoppingBasket,
  BaggageClaim,
} from "lucide-react";
import {abi} from "@/lib/merchant";

const data = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Apr",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jul",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Aug",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Sep",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Oct",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Nov",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Dec",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
];

export default function DashabordHomepage() {
  const account = useAccount();
  console.log(account, "acc");
  const router = useRouter();
  const {disconnect} = useDisconnect();
  const chains = useChains();
  console.log(chains, "chain");
  const ref = useRef();
  const [revenue, setRevenue] = useState(0);

  const contractAddress = "0x8f2806160077e9cd6532DBC6F1886082479290f6";

  const ETHERSJS_PROVIDERS = new ethers.providers.Web3Provider(window.ethereum);
  const signer = ETHERSJS_PROVIDERS.getSigner();
  const contract = new ethers.Contract(contractAddress, abi, signer);

  useEffect(() => {
    (async function revenuefunc() {
      const results = await contract.totalRevenue();
      console.log("revenue", Number(results));
      setRevenue(Number(results));
    })();
  }, []);

  useEffect(() => {
    if (!account.address) {
      router.push("/connectwallet");
    }
  }, [account.address]);

  return (
    <>
      <NavbarComponent />
      <div className="w-full h-full font-ironFont flex flex-col space-y-6">
        {/* <CustomButton
          backBg="bg-pink-500"
          className="mt-3"
          onClick={() => setOpenIntegrationModal((prev) => !prev)}
        /> */}

        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">
              Hi, Welcome back 👋
            </h2>
            <div className="hidden md:flex items-center space-x-2">
              {/* <CalendarDateRangePicker /> */}
            </div>
          </div>
          <div className="flex justify-center">
            <Card className="w-[500px] border-2 border-black shadow-[2px_2px_0_0_#000] text-xl">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg> */}

                <img
                  src="https://ironfish.network/_next/static/media/hex-fish.ceace82e.svg"
                  alt="iron"
                  style={{width: "24px", height: "15px"}}
                />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {revenue && revenue} IRON
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="flex gap-5 h-full w-full flex-col md:flex-row">
            <Card className="w-full md:w-2/3 border-2 border-black shadow-[2px_2px_0_0_#000]">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={data}>
                    <XAxis
                      dataKey="name"
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Bar dataKey="total" fill="#FFC2E8" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="w-full md:w-1/3 border-2 border-black shadow-[2px_2px_0_0_#000]">
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>
                  You made 265 sales this month.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="flex items-center">
                    {/* <Avatar className="h-9 w-9">
                      <AvatarImage src="/avatars/01.png" alt="Avatar" />
                      <AvatarFallback>OM</AvatarFallback>
                    </Avatar> */}
                    <div className="rounded-full bg-slate-100 p-2">
                      <ShoppingBag />
                    </div>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Ergonomic Metal Towels
                      </p>
                      <p className="text-sm text-muted-foreground">3 Qty</p>
                    </div>
                    <div className="ml-auto font-medium">+$1,999.00</div>
                  </div>
                  <div className="flex items-center">
                    <div className="rounded-full bg-slate-100 p-2">
                      <ShoppingCart />
                    </div>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Luxurious Bronze Hat
                      </p>
                      <p className="text-sm text-muted-foreground">3 Qty</p>
                    </div>
                    <div className="ml-auto font-medium">+$39.00</div>
                  </div>
                  <div className="flex items-center">
                    <div className="rounded-full bg-slate-100 p-2">
                      <ShoppingBasket />
                    </div>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Oriental Steel Towels
                      </p>
                      <p className="text-sm text-muted-foreground">3 Qty</p>
                    </div>
                    <div className="ml-auto font-medium">+$299.00</div>
                  </div>
                  <div className="flex items-center">
                    <div className="rounded-full bg-slate-100 p-2">
                      <BaggageClaim />
                    </div>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Handmade Soft Chair
                      </p>
                      <p className="text-sm text-muted-foreground">3 Qty</p>
                    </div>
                    <div className="ml-auto font-medium">+$99.00</div>
                  </div>
                  <div className="flex items-center">
                    <div className="rounded-full bg-slate-100 p-2">
                      <ScanBarcode />
                    </div>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Luxurious Plastic Shirt
                      </p>
                      <p className="text-sm text-muted-foreground">3 Qty</p>
                    </div>
                    <div className="ml-auto font-medium">+$39.00</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
