import {
  Schema,
  model,
  models,
  Document,
  Types,
} from "mongoose";

export interface ResetTokenDocument extends Document {
  userId: Types.ObjectId;
  token: string;
  expiresAt: Date;
  lastSentAt: Date;
}

const resetTokenSchema = new Schema<ResetTokenDocument>({
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

resetTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const ResetToken =
  models.ResetToken || model<ResetTokenDocument>("ResetToken", resetTokenSchema);

export default ResetToken;
