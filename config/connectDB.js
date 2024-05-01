import mongoose from "mongoose";
import { hostname } from "os";

export const connectDB = async () => {
  mongoose
    .connect(process.env.MONGO_URL, { dbName: "EcommerceWebsite" })
    .then(() => {
      console.log(`Connected databse with host ${hostname}`);
    })
    .catch((error) => {
      console.log("Connection failed");
    });
};
