
console.log('Starting DevTinder Backend...');

const express = require('express');

const app = express();

app.use("/", (req, res) => {
    res.send("Hello from DevTinder Backend!");
});

app.listen(7777, () => {
  console.log('DevTinder Backend is running on port 7777');
});



