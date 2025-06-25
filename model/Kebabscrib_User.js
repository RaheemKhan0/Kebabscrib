import mongoose from "mongoose";
import Order from "./orders";

const kebabscribUserSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ["admin", "staff", "user"],
    default: "user",
  },
  verified: {
    type: Boolean,
    default: false,
  },
  lastlogin: {
    type: Date,
    default: Date.now,
  },
  orders : [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref : Order
    }
  ]
});

const KebabscribUser =
  mongoose.models.KebabscribUser ||
  mongoose.model("KebabscribUser", kebabscribUserSchema);

export default KebabscribUser;
