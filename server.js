import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/connectDB.js";
import AuthRouter from "./routes/authRoute.js";
import CategoryRouter from "./routes/categoryRoute.js";
import ProductRoute from "./routes/productRoute.js";
import cors from "cors";
import fileupload from "express-fileupload";

let app = express();

dotenv.config();

app.use(express.json());
app.use(
  fileupload({
    useTempFiles: true,
  })
);
app.use(cors());

app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/category", CategoryRouter);
app.use("/api/v1/product", ProductRoute);

connectDB();

app.get("/", (req, res) => {
  res.send("Ecommerce Web");
});

app.listen(process.env.PORT, () => {
  console.log(
    `Server running at port ${process.env.PORT} on mode ${process.env.DEV_MODE}`
  );
});
