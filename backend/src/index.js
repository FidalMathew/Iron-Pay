import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { ironfishClient, ironfishNode } from "./ironfish-sdk-connector.js";
import ironfishRouter from "./routes.js";

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", ironfishRouter);

app.all("*", (req, res, next) => {
  next(new AppError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { message = "Something went wrong", statusCode = 500 } = err;
  res.status(statusCode).send(message);
});

app.listen(port, () => {
  console.log("app listening on port", port);
});
