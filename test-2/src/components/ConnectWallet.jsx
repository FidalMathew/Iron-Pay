import {useNavigate} from "react-router-dom";
export default function ConnectWallet() {
  //   const [currentAccount, setCurrentAccount] = useState("");
  const navigate = useNavigate();
  const connectWallet = async () => {
    try {
      const ethereum = window.ethereum;

      await ethereum.request({method: "eth_requestAccounts"}); // request connection with accounts
      // console.log("Connected", accounts[0]);
      //   setCurrentAccount(accounts[0]);
      navigate("/");
      // const chainId = await ethereum.request({ method: 'eth_chainId' });
    } catch (e) {
      console.log(e);
    }
  };

  return <button onClick={connectWallet}>connect wallet</button>;
}
