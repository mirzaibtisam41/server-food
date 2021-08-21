const express = require('express');
const app = express();
const cors = require("cors");
const DB = require("./config/db");
app.use(cors());

app.get("/", (req, res) => {
    res.json("Server Running Successfully");
});

DB();

app.use(express.json({ extended: false }));
app.use("/api/user", require("./routes/userRoute"));
app.use("/api/driver", require("./routes/driverRoute"));
app.use("/api/vendor", require("./routes/vendorRoute"));
app.use("/api/product", require("./routes/productRoute"));
app.use("/api/order", require("./routes/orderRoute"));

const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log('Server listening on port ' + PORT));