import {
  Schema,
  model,
  models,
  Document,
  Types,
} from "mongoose";

export type UserRole = "admin" | "staff" | "user";

export interface KebabscribUserDocument extends Document {
  user_name: string;
  email: string;
  password: string;
  isVerified: boolean;
  role: UserRole;
  verified: boolean;
  lastlogin: Date;
  orders: Types.ObjectId[];
}

const kebabscribUserSchema = new Schema<KebabscribUserDocument>({
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
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

const KebabscribUser =
  models.KebabscribUser ||
  model<KebabscribUserDocument>("KebabscribUser", kebabscribUserSchema);

export default KebabscribUser;
