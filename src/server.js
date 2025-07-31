import express from "express";
import { serverConfig } from "./config.js";
import mongoose from "mongoose";
import { mainRouter } from "./routes/main.routes.js";

const app = express();
app.use(express.json());

app.use("/api", mainRouter);

async function bootstrap() {
  try {
    await mongoose.connect(process.env.dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const { PORT } = serverConfig;
    app.listen(PORT, () => console.log(`Server is running on ${PORT}-port`));
  } catch (err) {
    console.error("Database connection error:", err);
  }
}

bootstrap();