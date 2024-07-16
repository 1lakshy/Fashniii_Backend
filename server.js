const express = require("express");
const app = express();
const dotenv = require("dotenv");
const DbConnect = require("./database.js");
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require('cors');

dotenv.config();
DbConnect()
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload())

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

// uncaugth exception error (undefined error)
process.on("uncaughtException",(err)=>{
console.log(`Error:${err.message}`);
console.log("sutting down the server due to the uncaugthError ");
server.close(()=>{
    process.exit(1)
})
})



app.use(errorMiddleware);
const PORT = process.env.PORT;

// routing
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");


app.use("/api/v1",product);
app.use("/api/v1",user);

app.get("/",(req,res)=>{
    res.send("hello")
})

const server = app.listen(PORT,()=>{
    console.log(`listening at port ${PORT}`)
})

// unhandled promise rejection
process.on("unhandledRejection",(err)=>{
    console.log("closing server due to unhandled promise rejection ")
    console.log(`Error:${err.message}`)

    server.close(()=>{
        process.exit(1)
    })
})