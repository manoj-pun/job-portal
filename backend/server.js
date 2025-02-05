import express from "express";
import "dotenv/config";
import connectDb from "./config/db.js";

//Initialize express
const app = express()

// connecting database
connectDb();

const PORT = process.env.PORT || 3000

app.get("/",(req,res) => {
    res.send("Hello ")
})

app.listen(PORT,() => {
    console.log(`Server is running on PORT ${PORT}`)
})

