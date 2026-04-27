
const express = require("express");
const {adminAuth} = require("./middlewares/auth");
const connectDb = require("./config/database");
const app = express();
const User = require("./models/user");

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

// app.use("/admin", adminAuth);

app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(200).send("User registered successfully");
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find({email: req.body.email}); // Fetch users with non-null email
    if (users.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }else{
      res.status(200).json(users);
    }

  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  }
});

app.patch("/users", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.body.id, req.body, { new: true, runValidators: true });
    res.status(200).json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  }
});

app.delete("/users", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.body.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error", message: error.message });
  }
});
//Always connect to the database before starting the server
connectDb().then(() => {
  console.log("Connected to the database successfully");
  app.listen(7777, () => {
  console.log("DevTinder Backend is running on port 7777");
});
}).catch((error) => {
  console.error("Error connecting to the database:", error);
});

// app.get("/admin", (req, res) => {
//   console.log("Received a request getData");
//   res.send("Welcome to the Admin Panel!");
// });

// app.use("/", (req, res) => {
//   res.send("Hello from DevTinder Backend!");
// });


