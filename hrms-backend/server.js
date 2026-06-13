import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import connectDB from "./src/config/db.js";

connectDB();

app.listen(process.env.PORT, () => {
  console.log(
    `Server Running On Port ${process.env.PORT}`
  );
});