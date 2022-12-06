const path = require('path');
require("dotenv").config({ path: path.resolve(__dirname, './config.env') })


const express = require('express');
const cors = require('cors');
// const { createServer } = require("http");
// const { Server } = require("socket.io");
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet')
const connectDB = require('./src/db/mongoose');

const app = express();

const port = process.env.PORT || '3001';
connectDB();


//middlewares
app.use(helmet())
app.use(express.json())
app.use(cors());

app.use(morgan("tiny"));

//creating socket.io server
// const httpServer = createServer(app);
// const io = new Server(httpServer, {
//     allowRequest: (req, cb) => {
//         const isAllowed = req.headers.origin === 'https://wedocleaning.com.au';
//         cb(null, isAllowed);
//     }


// });

// let onlineUsers = []

// const addNewUser = (userId, socketId) => {
//     !onlineUsers.some((user) => user.userId === userId) &&
//         onlineUsers.push({ userId, socketId })
//     console.log(onlineUsers)
// }

// const removeUser = (socketId) => {
//     onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId)

// }

// const getUser = (userId) => {
//     return onlineUsers.find((user) => user.userId === userId)
// }

// io.on("connection", (socket) => {

//     socket.on("newUser", (userId) => {
//         console.log('hello puja')
//         addNewUser(userId, socket.id)
//     })
//     socket.on("sendNotification", ({ senderName, type }) => {
//         console.log(senderName, type)
//         io.emit("getNotification", {
//             senderName,
//             type
//         })
//     })

//     socket.on("sendEvent", ({ senderName, type, receiverName, socket }) => {
//         console.log('Event based', type, socket)
//     })

//     socket.on("disconnect", () => {
//         console.log('disconnect hudai cha', socket.id)
//         removeUser(socket.id)
//     })
// });



//set body bodyParser

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//load routers
const bookingRouter = require("./src/routers/booking.router")
const customerRouter = require("./src/routers/customer.router")
const tokensRouter = require("./src/routers/tokens.router.js");
const paymentRouter = require("./src/routers/stripe.router")
const spaceRouter = require("./src/routers/space.router")
const quoteRouter = require("./src/routers/quote.router")
const productRouter = require("./src/routers/product.router")
const notificationRouter = require("./src/routers/notifications.router")

app.use("/v1/space", spaceRouter);
app.use("/v1/booking", bookingRouter);
app.use("/v1/customer", customerRouter)
app.use("/v1/tokens", tokensRouter);
app.use("/v1/payment", paymentRouter);
app.use("/v1/quote", quoteRouter)
app.use("/v1/product", productRouter)
app.use("/v1/notifications", notificationRouter)





app.use((req, res, next) => {
    const error = new Error("Resources not found")
    error.status = 404
    next(error)
})


app.use((error, req, res, next) => {
    handleError(error, res)
})

//Error handler 

const handleError = require("./src/utils/errorHandler")
app.listen(port, () => console.log(`listening on localhost:${port}`))

// httpServer.listen(port, () => console.log(`listening on localhost:${port}`))