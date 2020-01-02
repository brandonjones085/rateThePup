const path = require("path")
const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
mongoose.set('debug', true);
const pupsRoutes = require("./routes/pups")
const rateRoutes = require("./routes/rate")


const app = express();



const dbHost = 'mongodb+srv://brandon:Bj959211@cluster0-pfblm.mongodb.net/pups?retryWrites=true&w=majority'




mongoose.connect(dbHost)
.then(()=>{
    console.log("Connected to database")
}).catch(()=>{
    console.log("Connection failed"); 
}); 


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use("/images", express.static(path.join("images")));


app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT, OPTIONS")
    next(); 
});

app.use("/pups", pupsRoutes)
app.use("/rate", rateRoutes); 

module.exports = app; 