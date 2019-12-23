const mongoose = require("mongoose"); 

const pupSchema = mongoose.Schema({
    name: {type:String, required: true}, 
    breed: {type:String, required: true},
    quote: {type:String, required: true}, 
    imagePath: {type:String, required:true}, 
    rates: {type:Number, default: 0}
}); 

module.exports = mongoose.model("Pup", pupSchema); 