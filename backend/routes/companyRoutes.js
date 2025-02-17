import express from "express"
import { changeJobApplicationStatus, changeVisibility, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from "../controllers/companyController.js"
import upload from "../config/multer.js"
import { protectCompany } from "../middlewares/authMiddleware.js"

const router = express.Router()

//register a company
router.post("/register-company",upload.single("image"),registerCompany)

//login company
router.post("/login-company",loginCompany)

// get company data
router.get("/company", protectCompany, getCompanyData)

//post job
router.post("/post-job", protectCompany, postJob)

//get applicants data of company
router.get("/applicants", protectCompany, getCompanyJobApplicants)

//get company job list
router.get("/list-jobs", protectCompany, getCompanyPostedJobs)

//change application status
router.post("/change-status",protectCompany, changeJobApplicationStatus)

//change applications visibility
router.post("/change-visibility", protectCompany, changeVisibility)

export default router