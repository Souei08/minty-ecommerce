import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import productRoutes from "./routes/product.js";
import salesRoutes from "./routes/sales.js";

//CONFIGURATION
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("commnon"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// ROUTES
app.use("/product", productRoutes);
app.use("/sales", salesRoutes);

// MONGO SETUP
const PORT = process.env.port || 9000;
mongoose.connect(process.env.MONGO_URL, {}).then(() => {
  app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

  /* ONLY ADD DATA ONE TIME*/
  // Product.insertMany(dataProduct)
  // ProductStat.insertMany(dataProductStat)
  // User.insertMany(dataUser);

  console.log("Pinged your deployment. You successfully connected to MongoDB!");
});
