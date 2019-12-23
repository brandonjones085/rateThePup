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

        cb(error, "images"); 
    }, 
    filename: (req,file,cb)=>{
        const name = file.originalname.toLowerCase().split(" ").join('-')
        const ext = MIME_TYPE_MAP[file.mimetype]; 
        cb(null, name + '-' + Date.now() + '.' + ext); 
    }
}); 


router.post("", multer({storage:storage}).single("image"), (req,res,next)=>{
    const url = req.protocol + "://" + req.get("host")
    const pups = new Pup({
        
        name: req.body.name, 
        breed: req.body.breed, 
        quote: req.body.quote, 
        imagePath: url + "/images/" + req.file.filename
    }); 
    pups.save().then(createdPup=>{
        res.status(201).json({
            message:"Pup added successfully", 
            pup:{
                ...createdPup, 
                id: createdPup._id
                // title: createdPup.name, 
                // breed: createdPup.breed, 
                // quote: createdPup.quote, 
                // imagePath: createdPup.imagePath
            }
            
        }); 
       

    }); 
    
})


router.get("" ,(req,res,next)=>{
    Pup.find().sort({rates: -1}).limit(10)
    .then(documents=>{
        res.status(200).json({
            message:"Pup fetched successfully", 
            pups:documents
          
    });
    });
}); 



module.exports = router; 