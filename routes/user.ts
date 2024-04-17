import express from "express";
const router = express.Router();

const { protect } = require("../middlewares/auth");
const { getCart } = require("../middlewares/order");
const { signUp, signIn, getMe } = require("../controllers/user");

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/profile", protect, getMe);

module.exports = router;
