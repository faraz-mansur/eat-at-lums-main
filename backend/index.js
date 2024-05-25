const express = require("express");
const app = express();
const port = 3001;
const m_db = require("./mydb");
var cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const { findOne } = require("./models/Order");
const Order = require("./models/Order");
const JWT_SECRET = require("./secrets/JWTsecret");
const jwt = require("jsonwebtoken");

m_db();

app.use(express.json());

app.use(cors());

// app.use((req, res, next) => {
//   // res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });

app.use("/", require("./Routes/Pdcmenu"));
app.use("/api", require("./Routes/UserRoute"));
app.use("/api", require("./Routes/EateriesRoute"));
app.use("/api/orders", require("./Routes/OrderRoute"));
app.use("/api", require("./Routes/ReportRider"));
app.use("/api/reviews", require("./Routes/ReviewRoute"));

// socket setup
let userMap = {};

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("newUser", (data) => {
    let userId = data.userId;
    // retrieving userId from jwt token
    jwt.verify(userId, JWT_SECRET, (err, decode) => {
      if (err) {
        throw err
      } else {
        userId = decode.user.id;
      }
    });
    userMap[userId] = socket;
  });

  // In case a order is delivered
  socket.on("Delivered", async (data) => {
    let orderId = data.order_id;
    let customerId = data.customer_id;
    let query = { order_id: orderId };
    let values = { $set: { orderstatus: "Delivered" } };
    Order.updateOne(query, values, (err, data) => {
      if (err) throw err;
      else {
        const myBody = {
          status: "Delivered",
        };
        if (customerId in userMap) {
          io.to(userMap[customerId].id).emit("track", myBody);
        }
      }
    });
  });
  // In case a order is delivered
  socket.on("Picked", async (data) => {
    let orderId = data.order_id;
    let customerId = data.customer_id;
    let query = { order_id: orderId };
    let values = { $set: { orderstatus: "Picked" } };
    Order.updateOne(query, values, (err, data) => {
      if (err) throw err;
      else {
        const myBody = {
          status: "Picked",
        };
        if (customerId in userMap) {
          io.to(userMap[customerId].id).emit("track", myBody);
        }
      }
    });
  });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
