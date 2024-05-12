import { populate } from "dotenv";
import { Request, Response } from "express";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

const { findCart } = require("./order");

const User = require("../models/user");

const generateToken = (id: String) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const signUp = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    ...req.body,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const signIn = asyncHandler(async (req: AppRequest, res: Response) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });
  const cart = await findCart(user._id);

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      ...(cart && { cart: await cart }),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

const updateMe = asyncHandler(async (req: AppRequest, res: Response) => {
  const user = await User.findOneAndUpdate({ _id: req.user._id }, req.body, {
    new: true,
  });

  res.status(200).json(user);
});

const getMe = asyncHandler(async (req: AppRequest, res: Response) => {
  const user = await User.findOne({
    _id: req.user._id,
  }).populate(["defaults.address.billing", "defaults.address.shipping"]);

  res.status(200).json(user);
});

module.exports = {
  signUp,
  signIn,
  getMe,
  updateMe,
};
