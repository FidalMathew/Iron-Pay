import { ironfishClient, ironfishNode } from "./ironfish-sdk-connector";

async function createAccount(req, res) {
  const { name } = req.name;
  if (name) {
    let account = ironfishClient.wallet.createAccount({
      name: name,
    });
    return res.json({ status: 200, data: account });
  } else {
    return res.json({ status: 402, data: "need an account name" });
  }
}

async function getWalletBalance(req, res, next) {
  const { account, assetId, confirmations } = req.name;

  let walletBalance = ironfishClient.wallet.getWalletBalances({
    account: account || "",
    assetId: assetId || "",
    confirmations: confirmations || "",
  });

  return res.json({ status: 200, data: walletBalance });
}

export { createAccount, getWalletBalance };
