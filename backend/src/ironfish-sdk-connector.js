import { IronfishSdk } from "@ironfish/sdk";

let ironfish = {
  client: "",
  node: "",
};
let error = null;

async function main(req, res, next) {
  const sdk = await IronfishSdk.init({ dataDir: "./dev0" });
  const client = await sdk.connectRpc();
  const node = await sdk.node();
  console.log("node: ", node);
  return { client, node };
}

main()
  .then((res) => {
    ironfish.client = res.client;
    ironfish.node = res.node;
  })
  .catch((err) => {
    console.log(err);
  });

export const ironfishClient = ironfish.client;
export const ironfishNode = ironfish.node;
