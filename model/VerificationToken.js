// models/VerificationToken.ts
import mongoose from "mongoose";

const VerificationTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "KebabscribUser",
  },
  token: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  lastSentAt : {
    type : Date,
    required: true,
  }
});
VerificationTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const VerificationTokens = mongoose.models.VerificationToken ||
  mongoose.model("VerificationToken", VerificationTokenSchema);

export default VerificationTokens;
