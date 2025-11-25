const mongoose = require("mongoose");
const initData  =  require("./data.js");
const Listing = require("../models/listing.js");


const MONGO_URL = "mongodb+srv://algobitcoder_db_user:zJS9qKPYheJpDZFR@cluster0.9nh0tut.mongodb.net/wanderlust?retryWrites=true&w=majority&appName=Cluster0"

main()
.then(()=>{
    console.log("connect to DB");
}).catch(()=>{
    console.log(err)
})

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB = async ()=>{
    await Listing.deleteMany({});
   initData.data = initData.data.map((obj)=>({
    ...obj, owner:"6772b9b0869bbcd596e7d950",
   }))
//    console.log(initData.data);
    await Listing.insertMany(initData.data);
    console.log("data was initialized ");
}
initDB();