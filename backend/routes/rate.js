const express = require("express")
const multer = require('multer')
const Pup = require("../models/pups")
const router = express.Router(); 



const MIME_TYPE_MAP = {
    'image/png':'png', 
    'image/jpeg':'jpg', 
    'image/jpg':'jpg'
}

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        const isValid = MIME_TYPE_MAP[file.mimetype]; 
        let error = new Error('Invalid mime type'); 
        if(isValid){
            error = null; 
        }

        cb(error, "backend/images"); 
    }, 
    filename: (req,file,cb)=>{
        const name = file.originalname.toLowerCase().split(" ").join('-')
        const ext = MIME_TYPE_MAP[file.mimetype]; 
        cb(null, name + '-' + Date.now() + '.' + ext); 
    }
}); 


router.put("/:id", (req,res,next)=>{

  

    const pup = new Pup({
        _id: req.body.id, 
        name: req.body.name, 
        breed: req.body.breed, 
        quote: req.body.quote, 
        rates: req.body.rates + 1
       
    })
   
    Pup.updateOne({_id:req.params.id}, pup).then(documents=>{
        console.log("From the backend" + pup)
        res.status(200).json({
            message:"Update Successful", 
            pups:documents
            
        })
    })
})


router.get("" ,(req,res,next)=>{


    Pup.aggregate([{$sample:{size:2}}])
    .then(documents=>{
       //console.log(documents)
 
        res.status(200).json({ 
            message:"Pup fetched successfully", 
            pups:documents
          
    });
    });
}); 



module.exports = router; 