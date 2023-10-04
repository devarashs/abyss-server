import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import corsMiddleware from "./cors.js";
import userRouter from "./routes/userRoutes.js";
import uploadRouter from "./routes/uploadRoutes.js";
import cardRouter from "./routes/cardRoutes.js";

dotenv.config();
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

app.use(corsMiddleware);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/check", (req, res) => {
  res.send("ok");
});

app.use("/users", userRouter);
app.use("/upload", uploadRouter);
app.use("/cards", cardRouter);

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
