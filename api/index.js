import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import dotenv from "dotenv";
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("connected to MONGODB!");
  })
  .catch((err) => {
    console.log(err);
  });

  const app = express();

  app.use(express.json()); // we are not allowed to send any Json to the server, so this is going to alloe Json as input of the server.

const port = 3000;
app.listen(port, () => {
  console.log(`server running on port ${3000}!`);
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
