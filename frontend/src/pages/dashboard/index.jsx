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

export default function DashabordHomepage() {
  const account = useAccount();
  console.log(account, "acc");
  const router = useRouter();
  const {disconnect} = useDisconnect();
  const chains = useChains();
  console.log(chains, "chain");
  const ref = useRef();
  const [revenue, setRevenue] = useState(0);

  const contractAddress = "0xcea3f55B9f65Ac24fBaCBf9516c3f291F9DFd1D6";

  const ETHERSJS_PROVIDERS = new ethers.providers.Web3Provider(window.ethereum);
  const signer = ETHERSJS_PROVIDERS.getSigner();
  const contract = new ethers.Contract(contractAddress, abi, signer);

  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    (async function viewTransactions() {
      console.log(contract);
      const results = await contract.viewTransactions();
      console.log("resultttttttts ", results);

      let temp = [];

      let amt = 0;

      results.map((result) => {
        temp.push({
          name: result.name,
          owner: result.owner,
          price: result.price,
          quantity: result.quantity,
          timestamp: result.timestamp,
        });
        amt += result.price * result.quantity;
      });
      setRevenue(amt);
      setTransactions(temp);
      // setRevenue(Number(results));
    })();
  }, []);

  useEffect(() => {
    if (!account.address) {
      router.push("/connectwallet");
    }
  }, [account.address]);

  const [sales, setSales] = useState([]);

  const getMonthName = (idx) => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return monthNames[idx];
  };
  useEffect(() => {
    const monthlySales = () => {
      let temp = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

      transactions.forEach((transaction) => {
        let timestampValue = parseInt(transaction.timestamp.toString(), 16);
        let date = new Date(timestampValue);
        let month = date.getMonth();

        // Log the results for testing
        console.log("Original Timestamp:", transaction.timestamp._hex);
        console.log("Converted Date:", date);
        console.log("Month:", month);

        temp[month] +=
          (parseInt(transaction.price) * parseInt(transaction.quantity)) / 1e8;
      });

      let tempData = [];
      temp.forEach((val, idx) => {
        tempData.push({
          name: getMonthName(idx),
          total: val,
        });
      });
      setSales(tempData);
    };
    monthlySales();
  }, [transactions]);

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
                  {parseInt(revenue) / 1e8} IRON
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
                  <BarChart data={sales}>
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
                      tickFormatter={(value) => `${value}`}
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
                  You made {transactions.length} sales this month.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {transactions.map((transaction) => {
                    return (
                      <div className="flex items-center">
                        <div className="rounded-full bg-slate-100 p-2">
                          <ShoppingBag />
                        </div>
                        <div className="ml-4 space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {transaction.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {parseInt(transaction.quantity)} Qty
                          </p>
                        </div>
                        <div className="ml-auto font-medium">
                          {parseInt(transaction.price) / 100000000}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
