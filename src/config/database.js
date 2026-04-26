const mongoose = require('mongoose');


const connectDatabase = async () => {
    await mongoose.connect("mongodb+srv://basalingappaDev:wX3rWQF4WdvrFUeK@cluster0.mkykue8.mongodb.net/devtinder")
}

module.exports = connectDatabase;