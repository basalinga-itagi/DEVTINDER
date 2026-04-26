
const express = require("express");
const {adminAuth} = require("./middlewares/auth");
const app = express();
// METHOD : 1 , Middleware to log incoming requests and check authentication for admin routes
// app.use("/admin", (req, res, next) => {
//   console.log("Received a request");
//   const token = "xyzb";
//   const isAuthenticated = token === "xyz";
//   if (!isAuthenticated) {
//     return res.status(401).send("Unauthorized");
//   }
//   next();
// });

// METHOD : 2 , Middleware to log incoming requests and check authentication for specific method for admin routes

app.use("/admin", adminAuth);

app.get("/admin", (req, res) => {
  console.log("Received a request getData");
  res.send("Welcome to the Admin Panel!");
});

app.use("/", (req, res) => {
  res.send("Hello from DevTinder Backend!");
});

app.listen(7777, () => {
  console.log("DevTinder Backend is running on port 7777");
});
