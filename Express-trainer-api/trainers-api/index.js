import express from "express";
import { trainerRouter } from "./routes/trainers.routes.js";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const staticFilesPath = path.join(__dirname, "public");

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

const app = express();

app.use(express.json());

app.use("/home", express.static(staticFilesPath));

app.use("/trainers", trainerRouter);

app.listen(PORT, HOST, () => {
  console.log(`Server is up at ${PORT}`);
});
