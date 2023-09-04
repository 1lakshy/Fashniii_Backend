const express = require("express");
const app = express();
const dotenv = require("dotenv");
const DbConnect = require("./database.js");
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");

dotenv.config();
DbConnect()
app.use(express.json())
app.use(cookieParser())

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