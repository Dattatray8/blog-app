import express from "express";
import dotenv from "dotenv";
import { dbConnect } from "./config/dbConnect.js";
import userRouter from "./routes/user.routes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/v1/users", userRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT}`);
  dbConnect();
});
