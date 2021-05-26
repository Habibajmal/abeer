
var mongoose=require("mongoose");
const router = require("../routes/api/degrees");
var degreeSchema=mongoose.Schema({
    degreeid:Number,
    degreename: String,
    uniname: String,
    rank: Number,
    department:String,
    
});

  
var Degrees=mongoose.model("Degree",degreeSchema);


module.exports=Degrees;
