import {AllowAndDepositButton} from "ironpay-sdk";

const Deposit = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AllowAndDepositButton
        text="Allow and Deposit wIRON"
        amount="100000000"
      />
    </div>
  );
};

export default Deposit;
