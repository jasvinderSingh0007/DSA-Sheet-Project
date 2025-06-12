import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import User from "../models/User.js";

// Register Controller
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed });

    await user.save();

    res.status(201).send('User created');
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Login Controller
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid credentials');

    const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60m' });

    res.cookie('accessToken', accessToken, { httpOnly: true, secure: true, sameSite: 'None' });

    res.json({ id: user._id, email: user.email });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

// Logout controller
export const logoutUser = (req, res) => {
  try {
    res.clearCookie('accessToken', {
      httpOnly: true
    });
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

