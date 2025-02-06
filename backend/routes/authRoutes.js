import express from "express"
import { loginUser, registerUser } from "../controllers/authController.js"

const router = express.Router()

//register user
router.post("/register-user",registerUser)

//login user
router.post("/login-user",loginUser)

export default router