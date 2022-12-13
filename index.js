const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const productRoute = require("./routes/product.routes");

dotenv.config();
const app = express();

//conecting to db
require("./db/dbConn");

//middleware
app.use(cors());
app.use(express.json());
app.use("/api/product", productRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running! on http://localhost:${process.env.PORT}`);
});
