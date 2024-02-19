import {useEffect, useState} from "react";
import {IronfishButton} from "ironpay-sdk";
import {useNavigate} from "react-router-dom";
import "./Home.css";
export default function Home() {
  const [data, setData] = useState(null);
  const [currentAccount, setCurrentAccount] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkIfWalletIsConnected = async () => {
      try {
        if (window.ethereum) {
          const ethereum = window.ethereum;

          const accounts = await ethereum.request({method: "eth_accounts"}); //check if there are accounts connected to the site

          if (accounts.length !== 0) {
            const account = accounts[0];
            console.log("Found an authorized account:", account);
            setCurrentAccount(account);
            navigate("/");
          } else {
            setCurrentAccount("");
            navigate("/connectwallet");
            console.log("No authorized accounts found!");
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkIfWalletIsConnected();
  }, [currentAccount, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://65d228d2987977636bfc0629.mockapi.io/products/allproducts"
        );
        const result = await response.json();
        setData(result);
        console.log(result, "res");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div className="p-5 flex gap-3">
        {data &&
          data.map((val, indx) => (
            <div className="flex-1" key={indx}>
              {console.log()}
              <div>
                <duv>{val.name}</duv>
              </div>
              <div>
                <p>Price: {val.price / 10000}</p>
              </div>
              <div>
                <IronfishButton
                  text="Pay with IRON"
                  amount={
                    (val.price / 10000) * 1 * 100000000
                    // 100000000
                  }
                  id="bb32dcb3-a8c8-47f4-aab0-3bcf9af3b778"
                  product={{
                    productId: parseInt(val.productId),
                    price: (val.price / 10000) * 100000000,
                    name: val.name,
                    qty: 1,
                    timestamp: Date.now(),
                  }}
                />
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
