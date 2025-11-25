const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../init/utils/wrapAsync.js");
const ExpressError = require("../init/utils/ExpressError.js");

const Review = require("../models/review.js");
const Listing = require("../models/listing");
const {validateReview, isLoggedIn} = require("../middleware.js");

const reviewController = require("../controllers/review.js");
//REVIEWS
// POST ROUTE
router.post("/",isLoggedIn,validateReview ,wrapAsync(reviewController.createReview));
    //REVIEWS
    // DELETE ROUTE
    router.delete("/:reviewId",wrapAsync(reviewController.destroyReview));
    
    module.exports = router;
    
    
    