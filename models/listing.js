const mongoose = require("mongoose");
const Review = require("./review");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title:{
       type: String,
      require:true,},
    description:String,

    image:{
        type:String,
        default:"https://images.unsplash.com/photo-1683491753112-604719ba1797?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8",
       set:(v)=> v === ""?"https://images.unsplash.com/photo-1683491753112-604719ba1797?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8":v ,
    },
    price:Number,
    location:String,
    country:String,
reviews:[
    {
        type:Schema.Types.ObjectId,
        ref:"Review",
    },
],
owner:[{
    type:Schema.Types.ObjectId,
    ref:"User",
}],
});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{ $in:listing.reviews}})
    }
});

const Listing = mongoose.models.Listing || mongoose.model("Listing", listingSchema);
module.exports = Listing;