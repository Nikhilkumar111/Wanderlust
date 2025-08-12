const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email:{
        type:String,
        required:true,
    }
});

//USERNAME , HASHING AND SALTING ALL THE 
// THINGS WILL BE INCLUDE AUTOMATICALLY
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",userSchema);
