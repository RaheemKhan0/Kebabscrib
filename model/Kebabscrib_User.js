import mongoose from "mongoose";

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
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
  lastlogin: {
    type: Date,
    default: Date.now,
  },
});

const KebabscribUser = mongoose.models.KebabscribUser || mongoose.model("KebabscribUser", kebabscribUserSchema)

export default KebabscribUser;
