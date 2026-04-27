const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
  },
  age: {
    type: Number,
    required: true,
    min: 18,
    max: 100,
  },
  gender: {
    type: String,
    lowercase: true,
    validate(value) {
      const validGenders = ["male", "female", "other"];
      if (!validGenders.includes(value.toLowerCase())) {
        throw new Error("Gender must be either male, female, or other");
      }
    },
  },
  bio: {
    type: String,
    maxlength: 500,
    default: "This user prefers to keep an air of mystery about them.",
  },
  profilePicture: {
    type: String,
    default: "https://example.com/default-profile-picture.jpg",
  },
  interests: {
    type: [String],
  },
},{ timestamps: true });

module.exports = mongoose.model("User", userSchema);
