import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

import messagesRoutes from "./routes/messageRoutes";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/message", messagesRoutes);

export default app;
