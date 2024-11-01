import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";

import messageRoutes from "./routes/messageRoutes";
import swaggerDocs from "./swagger";
import { io } from "./server";
import { socketService } from "./services/socketService";

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

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/message", messageRoutes);

export default app;
