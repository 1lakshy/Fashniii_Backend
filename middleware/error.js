const ErrorHandler = require("../utils/errorHandler")

module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "internal Server Error";

    // mongooose dublicate key error
    if(err.name=== 11000){
        const message = `Dublicate ${object.keys(err.keyValue)} entered`    
        err= new ErrorHandler(message,400);    
    }


    // mongodb errors 

    if(err.name === "CastError"){
        const message = `Cast error found at ${err.path}`;
        err = new ErrorHandler(message,400);
    }
    res.status(err.statusCode).json({
        success:false,
        error:err.stack
    })
}
