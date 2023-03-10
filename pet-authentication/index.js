import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

import { router } from "./src/router/index.js";
import { errorMiddleware } from "./src/middlewares/index.js";

dotenv.config();

const MONGODB = process.env.MONGODB;
const PORT = process.env.PORT || 5001;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use("/api", router);
app.use(errorMiddleware);

const start = async () => {
  try {
    console.log(MONGODB);
    await mongoose.connect(MONGODB, { useNewUrlParser: true });
    app.listen(PORT, () =>
      console.log(`Server ready at http://localhost:${PORT}`)
    );
  } catch (e) {
    console.log(e);
  }
};

start();
