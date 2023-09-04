const ErrorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken")
const asyncErrorFunction = require("./asyncErrorFunction");
const userModel = require("../models/userModel");

exports.isAuthenticatedUser = asyncErrorFunction(async(req,res,next)=>{
    const {token} = req.cookies;

    if(!token){
        return next(new ErrorHandler("Please Login",400))
    }

    const cookieData = jwt.verify(token,process.env.JWT_SECRET);
    // console.log(cookieData)
    
    req.user = await userModel.findOne({id:cookieData.id});
    // console.log("auth"+req.user.id)
    next()

});

exports.isAutherisedRoles = (...roles)=>{
    return async(req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(
                new ErrorHandler("User is NOT a ADMIN",403)
            )
        }

        next()
    }
}

