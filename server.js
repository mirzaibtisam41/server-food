const express = require('express');
const app = express();
const cors = require("cors");
const DB = require("./config/db");
const Emitter = require('events');
const eventEmitter = new Emitter();
const stripe = require('stripe');
const messageModel = require('./models/messageModel');

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

// stripe payment
app.post('/api/payment', async (req, res) => {
    const customer = await stripe.customers.create();
    const ephemeralKey = await stripe.ephemeralKeys.create(
        { customer: customer.id },
        { apiVersion: '2020-08-27' }
    );
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 1099,
        currency: 'usd',
        customer: customer.id,
    });
    res.json({
        paymentIntent: paymentIntent.client_secret,
        ephemeralKey: ephemeralKey.secret,
        customer: customer.id
    });
});

// get message
app.post("/api/messages", async (req, res) => {
    const { user1, user2 } = req.body;
    try {
        const newMessage = await MessageModel.find({
            $or: [{ sender: user1, receiver: user2 },
                { sender: user2, receiver: user1 }]
        });
        return res.json(newMessage);
    } catch (error) {
        console.log(error);
    }
});

// server listen
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, console.log('Server listening on port ' + PORT));

const io = require("socket.io")(server);

io.on('connection', socket => {
    socket.on('join', clientID => {
        socket.join(clientID);
    });

    socket.on('message', (senderID, receiverID, message) => {
        const _message = new messageModel({ sender: senderID, receiver: receiverID, message });
        _message.save((error, user) => {
            if (error) return res.json({
                message: "Something went wrong"
            });
            if (user) {
                io.to(senderID).emit('getMessage', message);
                io.to(receiverID).emit('getMessage', message);
            }
        });
    });
});