const express = require('express');
const app = express();
const cors = require("cors");
const DB = require("./config/db");
const Emitter = require('events');
const eventEmitter = new Emitter();

// middlewares
app.use("/uploads", express.static("uploads"));
app.use(cors());
app.set('eventEmitter', eventEmitter);

// starting route
app.get("/", (req, res) => {
    res.json("Server Running Successfully");
});

// database connection
DB();

// routes
app.use(express.json({ extended: false }));
app.use("/api/user", require("./routes/userRoute"));
app.use("/api/driver", require("./routes/driverRoute"));
app.use("/api/vendor", require("./routes/vendorRoute"));
app.use("/api/product", require("./routes/productRoute"));
app.use("/api/order", require("./routes/orderRoute"));

// server listen
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, console.log('Server listening on port ' + PORT));

// socket
const io = require('socket.io')(server);
io.on('connection', (socket) => {
    socket.on('join', (clientID) => {
        socket.join(clientID);
    });
});

// emit events