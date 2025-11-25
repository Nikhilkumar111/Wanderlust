// const express = require("express");
// const router = express.Router();
// const wrapAsync = require("../init/utils/wrapAsync.js");
// const ExpressError = require("../init/utils/ExpressError.js");
// const {listingSchema } = require("../schema.js");
// const Listing = require("../models/Listing");
// const {isLoggedIn} = require("../middleware.js");


// const validateListing = (req,res,next)=>{
//     let {error} = listingSchema.validate(req.body);

// if(error){
//     let errMsg = error.details.map((el)=>el.message).join(",") ;
//     throw new ExpressError(400, errMsg  );
// } else{
//     next();
// }
// };

// //THIS IS CALLED THE INDEX ROUTE 
// router.get("/",wrapAsync(async(req,res)=>{
//     const allListings =  await  Listing.find({});
//     res.render("./listings/index",{allListings});
//        }));
   
//    //NEW ROUTE
//    router.get("/new",isLoggedIn,(req,res)=>{
    
  
//        res.render("listings/new.ejs");
//    })
   
   
//    //SHOW ROUTE
   
//    router.get("/:id",wrapAsync(async(req,res)=>{
//        let {id} = req.params;
//     const  listing = await  Listing.findById(id).populate("reviews").populate("owner");
//   if(!listing){
//     req.flash("error","Listing you requested does not exist!");
//     return res.redirect("/listings");
//   }
//       res.render("listings/show.ejs",{listing});
//    }));
   
//    ///create Route
//    router.post("/",isLoggedIn,validateListing,wrapAsync(async(req,res,next)=>{
//     const newListing = new Listing(req.body.listing);
//     newListing.owner = req.user._id;
//         await newListing.save();
//         req.flash("success","New Listing Created!");
//         res.redirect("/listings"); 
   
//    })
//    );
   
//    //edit ROute
   
//    router.get("/:id/edit",isLoggedIn,wrapAsync(async(req,res)=>{
//        let {id} = req.params;
//        const  listing = await  Listing.findById(id);
//        if(!listing){
//         req.flash("error","Listing you requested does not exist!");
//         res.redirect("/listings");
//       }    
//      res.render("listings/edit.ejs",{listing});
//    }));
   
//    //update route
//    router.put("/:id", isLoggedIn, validateListing, wrapAsync(async (req, res) => {
//     const { id } = req.params;
//     const listing = await Listing.findById(id);
// // IF THE LISTING IS DOES NOT EXIST THAN WE REDIRECT TO THE SAME PAGE 
//     if (!listing) {
//         req.flash("error", "Listing not found!");
//         return res.redirect("/listings");
//     }
// // FOR CHECKING PURPOSE THAT THE USER IS THE OWNER OF THE LISTING OR NOT 
//     console.log(res.locals.currUser._id); // Logged-in user ID
//     console.log(listing.owner); // Owner of the listing

//     // Convert both IDs to strings for comparison
//     // LISTING.OWNER IS A ARRAY OF OBJECTS SO WE NEED TO CONVERT IT INTO STRING 
//     if (String(listing.owner) !== String(res.locals.currUser._id)) {
//         req.flash("error", "You are not the owner of this listing!");
//         return res.redirect(`/listings/${id}`);
//     }

//     // Update the listing if the user is the owner
//     await Listing.findByIdAndUpdate(id, { ...req.body.listing });
//     req.flash("success", "Listing Updated!");
//     res.redirect(`/listings/${id}`);
// }));



//    //EDIT ROUTE
   
//    router.delete("/:id",isLoggedIn,wrapAsync(async(req,res)=>{
//        let {id} = req.params;
//        const  listing = await  Listing.findById(id);

//        if(!listing){
//         req.flash("error","Listing you requested does not exist!");
//         res.redirect("/listings");
//       }    
//      res.render("listings/edit.ejs",{listing});
//    }));
   
//    //DELETE  ROUTE
//    router.delete("/:id", isLoggedIn, validateListing, wrapAsync(async (req, res) => {
//     const { id } = req.params;
//     // ******************THIS IS THE PART OF MIDDLEWARE AND IT IS NOT
//     const listing = await Listing.findById(id);
// // IF THE LISTING IS DOES NOT EXIST THAN WE REDIRECT TO THE SAME PAGE 
//     if (!listing) {
//         req.flash("error", "Listing not found!");
//         return res.redirect("/listings");
//     }
// // FOR CHECKING PURPOSE THAT THE USER IS THE OWNER OF THE LISTING OR NOT 
//     // console.log(res.locals.currUser._id); // Logged-in user ID
//     // console.log(listing.owner); // Owner of the listing

//     // Convert both IDs to strings for comparison
//     // LISTING.OWNER IS A ARRAY OF OBJECTS SO WE NEED TO CONVERT IT INTO STRING 
//     if (String(listing.owner) !== String(res.locals.currUser._id)) {
//         req.flash("error", "You are not the owner of this listing!");
//         return res.redirect(`/listings/${id}`);
//     }
//        let deleteListing = await Listing.findByIdAndDelete(id);
//        console.log(deleteListing);
//        req.flash("success","Listing Deleted!");
//        res.redirect("/listings");
//    }));
   
//    module.exports = router;


// **************WORKING CODE WILL BE THIS **********************


const express = require("express");
const router = express.Router();
const wrapAsync = require("../init/utils/wrapAsync.js");
const ExpressError = require("../init/utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const Listing = require("../models/listing");
const { isLoggedIn,isOwner,validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");



const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({storage })

// THIS IS CALLED THE INDEX ROUTE  AND CREATE ROUTE
router.route("/").get( wrapAsync(listingController.index))
// .post( isLoggedIn, validateListing, wrapAsync(listingController.createListing));
.post(upload.single('listing[image]'),(req,res)=>{
    console.log("ab to send krna h cloudiary ko");
    res.send(req.file);
})



// NEW ROUTE
router.get("/new", isLoggedIn,listingController.renderNewForm );
// SHOW ROUTE AND // UPDATE ROUTE // DELETE ROUTE
router.route("/:id")
.get( wrapAsync(listingController.showListing))
.put( isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing))
.delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing ));



// EDIT ROUTE
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));


module.exports = router;
