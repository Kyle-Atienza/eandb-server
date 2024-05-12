import express from "express";
const router = express.Router();

const { protect } = require("../middlewares/auth");
const { getCart } = require("../middlewares/order");
const { signUp, signIn, getMe, updateMe } = require("../controllers/user");

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/profile", protect, getMe);

router.put("/profile", protect, updateMe);

module.exports = router;
