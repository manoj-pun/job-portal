import express from "express"
import { changeJobApplicationStatus, changeVisibility, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from "../controllers/companyController.js"

const router = express.Router()

//register a company
router.post("/register-company",registerCompany)

//login company
router.post("/login-company",loginCompany)

// get company data
router.get("/company",getCompanyData)

//post job
router.post("/post-job",postJob)

//get applicants data of company
router.get("/applicants",getCompanyJobApplicants)

//get company job list
router.get("/list-jobs",getCompanyPostedJobs)

//change application status
router.post("/change-status",changeJobApplicationStatus)

//change applications visibility
router.post("/change-visibility",changeVisibility)

export default router