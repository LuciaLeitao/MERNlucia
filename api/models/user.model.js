import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://pergola-agava.si/wp-content/uploads/2020/08/profile-icon-png-898.png",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);

export default User;
