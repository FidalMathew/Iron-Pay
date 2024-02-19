import {Routes, Route} from "react-router-dom";
import Home from "./components/Home";
import ConnectWallet from "./components/ConnectWallet";
import Deposit from "./components/Deposit";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/connectwallet" element={<ConnectWallet />} />
      <Route path="/deposit" element={<Deposit />} />
    </Routes>
  );
}
