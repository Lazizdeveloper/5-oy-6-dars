import { model, Schema } from "mongoose";

export const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    match: [/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, "email is invalid!"],
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: [8, "Password has to be at least 8 characters"],
  },
  age: {
    type: Number,
    required: true,
    min: [18, "User has to be at least 18 y.o"],
  },
  gender: {
    type: String,
    enum: {
      values: ["male", "female"],
      message: "Invalid gender!",
    },
    required: true,
  },
});

export default model("users", userSchema);