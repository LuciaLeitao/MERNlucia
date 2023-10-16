import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import dotenv from "dotenv";
import listingRouter from "./routes/listing.route.js";
import cookieParser from "cookie-parser";
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
app.use(cookieParser());

const port = 3000;
app.listen(port, () => {
  console.log(`server running on port ${3000}!`);
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

/* middleware to handle errors */
app.use((err, req, res, next) => {
  const satusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(satusCode).json({
    success: false,
    satusCode,
    message,
  });
});
