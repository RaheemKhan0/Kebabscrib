import {
  Schema,
  model,
  models,
  Document,
  Types,
} from "mongoose";

export interface VerificationTokenDocument extends Document {
  userId: Types.ObjectId;
  token: string;
  expiresAt: Date;
  lastSentAt: Date;
}

const verificationTokenSchema = new Schema<VerificationTokenDocument>({
  userId: {
    type: Schema.Types.ObjectId,
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
  lastSentAt: {
    type: Date,
    required: true,
  },
});

verificationTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const VerificationToken =
  models.VerificationToken ||
  model<VerificationTokenDocument>("VerificationToken", verificationTokenSchema);

export default VerificationToken;
