import "./config/instrument.js";
import express from "express";
import "dotenv/config";
import connectDb from "./config/db.js";
import * as Sentry from "@sentry/node";
import authRoutes from "./routes/authRoutes.js"
import companyRoutes from "./routes/companyRoutes.js"
import connectCloudinary from "./config/cloudinary.js";

//Initialize express
const app = express()

const PORT = process.env.PORT || 3000

// connecting database
connectDb();

//connection cloudinay
connectCloudinary();

//middlerwares
// This parses incoming JSON requests and makes the data available in req.body.
app.use(express.json()); 

//routes
app.get("/",(req,res) => {
    res.send("Hello ")
})
app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
});
app.use("/api/auth",authRoutes)
app.use("/api/company",companyRoutes)
  

Sentry.setupExpressErrorHandler(app);

app.listen(PORT,() => {
    console.log(`Server is running on PORT ${PORT}`)
})

