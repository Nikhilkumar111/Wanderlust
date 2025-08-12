const express = require("express");
const { route } = require("./listing");
const router = express.Router();
const User = require('../models/user'); // Adjust the path as needed
const wrapAsync = require("../init/utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");


const  userController = require("../controllers/users.js");
router.route("/signup").get(userController.renderSignup).post(wrapAsync(userController.signup));

router.route("/login").get(userController.renderLoginForm).post(saveRedirectUrl,passport.authenticate("local",{
    //IF THE FAILURE IS COME THEN REDIRECT TO AGAIN LOGIN 
   
       failureRedirect:"/login",
     //FLASH THAT USER NAME NOT EXIST OR NOT MATCHED  
       failureFlash:true,
   }), userController.login
   );


router.get("/logout",userController.logout)




module.exports = router;
