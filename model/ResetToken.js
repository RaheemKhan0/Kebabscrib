import mongoose from "mongoose";

const ResetTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  token: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  lastSentAt: {
    type: Date,
    required: true,
  },
});
ResetTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const ResetToken =
  mongoose.models.ResetToken || mongoose.model("ResetToken", ResetTokenSchema);

export default ResetToken;
