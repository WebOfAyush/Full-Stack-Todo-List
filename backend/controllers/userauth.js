import user from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {config} from "dotenv"
config({
  path : "../utils/config.env",
})
export const serverStart = (req, res) => {
  res.send("Server is running on port 3000");
  console.log(`Server is running on port 3000`);
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const User = await user.findOne({ email });
    if (!User) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, User.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    const token = jwt.sign({ userId : User._id }, process.env.JWT_SECRET);

    res.cookie("token", token);
    res.status(200).json({
      User,
      message: "User logged in successfully",
    });
    console.log("User logged in");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await user.create({
      username,
      email,
      password: hashedPassword,
    });

    const User = await user.findOne({email})
    const token = jwt.sign({ userId :  User._id }, process.env.JWT_SECRET);
    res.cookie("token", token);
    res.status(201).json({
      User : User,
      message: "User created successfully",
    });
    console.log("User registered");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

export const logout = async (req, res) => {
  res.cookie("token", "");
  res.status(200).json({ message: "Logout successful" });
};
