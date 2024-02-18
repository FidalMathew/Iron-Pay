import {IronFishButton} from "ironpay-sdk";

export default function YourApp() {
  return (
    <IronFishButton
      text="helloworld"
      amount={100000000}
      address={address}
      style={{color: "red", fontSize: "40px"}}
    />
  );
}
