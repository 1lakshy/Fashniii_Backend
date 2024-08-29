// const { findById } = require('../models/productModel');
const productModel = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const asyncErrorFunction = require("../middleware/asyncErrorFunction");
const ApiFeatures = require("../utils/apiFeatures")

// Admin can Access
//////////////////////////////////////////////////////////////////////////////////////
// get All Products
exports.getAllProducts = asyncErrorFunction(async (req, res,next) => {

  const resultPerPage= 10;
 const apiFeatures= new ApiFeatures(productModel.find(),req.query).search().filter();
  const products = await apiFeatures.query;
  const productCount = await productModel.countDocuments()

    res.status(200).json({
        success:true,
        message:"ok",
        productCount,
        products,
        resultPerPage
    })
})

// get perticular product details
exports.getProductDetails = asyncErrorFunction(async(req,res,next)=>{
    const product = await productModel.findById(req.params["id"]);
    if (!product) {
      res.status(500).json({
        success: false,
        message: 'product not found',
      });
    }else{
      res.status(200).json({
        success: true,
        message: 'product found with details successfully',
        product
      });
    }
})

// Update Product
exports.updateProduct = asyncErrorFunction(async (req, res, next) => {
  const product = await productModel.findById(req.params.id);

  if (!product) {
    // res.status(500).json({
    //   success: false,
    //   message: 'product not found',
    // });
    return next(new ErrorHandler("Product not found",505))
  }
  product = await productModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidator: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: 'product updated successfully',
  });
})

// Delete product
exports.deleteProduct = asyncErrorFunction(async (req, res, next) => {
  const product = await productModel.findById(req.params.id);
  if (!product) {
    res.status(500).json({
      success: false,
      message: 'product not found',
    });

    await product.remove;
    res.status(200).json({
      success: true,
      message: 'product deleted successfully',
    });
  }
})

// create Product
exports.createProduct = asyncErrorFunction(async (req, res, next) => {

  req.body.user = "6593b5e0035d1c1d14b8fe92";
  // console.log("abcd"+req.user)
  const product = await productModel.create(req.body);
  res.status(200).json({
    success: true,
    message: 'product created',
    product
  });
})

// create Review
exports.createReview = asyncErrorFunction(async (req, res, next) => {
const {rating,comment,productId} = req.body;

const review ={
  user:req.user._id,
  name:req.user.name,
  rating:Number(rating),
  comment,
}

const product = await productModel.findById(productId);

const isReviewed = product.reviews.find(
  (rev)=> rev.user.toString() === req.user._id.toString()
);

if(isReviewed){
  product.reviews.forEach((rev)=>{
    if(rev.user.toString() === req.user._id.toString())
    (rev.rating = rating),(rev.comment = comment);
  })
}else{
  product.reviews.push(review);
  product.numOfReviews = product.reviews.length;
}

let avg = 0;
product.reviews.forEach((rev)=>{
  avg += rev.rating;
})

product.rating = avg/product.reviews.length;

await product.save({ validateBeforeSave:false})

res.status(200).json({
  success:true
})


})


// get AllProduct Reviews
exports.getAllReviews = asyncErrorFunction(async (req, res, next) => {
  const product = await productModel.findById(req.query.productId);

  if(!product){
    return next(new ErrorHandler("invalid product",404));
  
  }
  res.status(200).json({
    success:true,
    reviews:product.reviews
  })

})


// Delete Any Review
exports.deleteReview = asyncErrorFunction(async (req, res, next) => {
  const product = await productModel.findById(req.query.productId);

  if(!product){
    return next(new ErrorHandler("invalid product",404));
  
  }

  const reviews = product.filter((rev)=> rev._id.toString() !== req.query.id.toString());

  let avg =0;
  reviews.forEach((rev)=>{
    avg+= rev.rating;
  })

  const rating = avg / reviews.lenght;
  const numOfReviews = reviews.length;
  await productModel.findByIdAndUpdate(req.query.productId,{
    reviews,rating,numOfReviews
  },{
    new:true,
    runValidators:true,
    useFindAndModify:false
  })
  res.status(200).json({
    success:true,
    reviews:product.reviews
  })

})