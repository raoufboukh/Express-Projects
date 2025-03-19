import { generateToken } from "../lib/utils.js";
import { User } from "../models/auth.models.js";
import bcrypt from 'bcrypt';


export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.status(400).json({
        message: `${
          !username
            ? "username is required"
            : !email
            ? "email is required"
            : "password is required"
        }`,
      });
    if (!/\w+@\w{5,}\.\w{2,}/.test(email))
      return res.status(400).json({ message: "Invalid email" });
    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });
    const hashedPass = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPass });
    if (user) {
      generateToken(user._id, res);
      await user.save();
    }
    res.status(201).json({ message: "Register success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({
        message: `${!email ? "email is required" : "password is required"}`,
      });
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    generateToken(user._id, res);
    res.status(200).json({ message: "Login success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = async(req, res) => {
    try {
        res.cookie("token", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const check = async(req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}