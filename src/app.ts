import express, { Application } from "express";
import dotenv from "dotenv";
import apiRoutes from "./routes/apiRoutes";

dotenv.config();

const app: Application = express();

app.use(express.json());

app.use("/api", apiRoutes);

export default app;
