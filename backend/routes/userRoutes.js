import express from "express"
import { applyForJob, getUserData, getUserJobApplications, updateUserResume } from "../controllers/userController.js"
import upload from "../config/multer.js"
import { protectUser } from "../middlewares/authMiddleware.js"

const router = express.Router()

//get user data
router.get("/user",protectUser,getUserData)

//apply for a job
router.post("/apply",protectUser,applyForJob)

//get applied jobs data
router.get("/applications",protectUser,getUserJobApplications)

//update user profile
router.post("/update-resume",upload.single("resume"),protectUser,updateUserResume)

export default router