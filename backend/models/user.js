import mongoose from "mongoose";

let userSchema = mongoose.Schema({
  username: {
    type : String,
    required: true,
  },
  email: {
    type : String,
    required: true,
    unique: true
  },
  password: {
    type : String,
    required: true,
  },
});
export default mongoose.model("User", userSchema);