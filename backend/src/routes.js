import { Router } from "express";
import { ironfishClient, ironfishNode } from "./ironfish-sdk-connector";
import { createAccount, getWalletBalance } from "./middlewares.js";

const ironfishRouter = Router();

ironfishRouter.post("/wallet/createAccount", createAccount);
ironfishRouter.get("/wallet/accountBalance", getWalletBalance);
// ironfishRouter.post("");

export default ironfishRouter;
