const express = require("express")

const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken")

const authModel = require("../models/authModels")

const verifiedMiddleWare = require("./tokenVerification")

const router = express.Router()

const secreatKey = "alsdjfhgjsqwertyui789!@#$%CVB$%^74125ghjk"

router.post("/login" , async (req,res) => {
       try{
        const username = req.body.username
        const password = req.body.password
        
        await authModel.findOne({username:username}).then(user =>{
            if (user && user._id){
                bcrypt.compare(password,user.password,(error,response)=>{
                    if (!error){
                        const payload = {username,password}
                        if(response){
                            
                            const authToken = jwt.sign(payload,secreatKey,{expiresIn:"1h"})

                            res.json({status:"ok",data:{authToken , payload}})
                        }else{
                            res.json({status:"error", data:{payload}})
                        }
                    }
                })
            }
        })
       }catch(error){
        res.json({status:"error", data:{error}})
       }
})


router.get("/", verifiedMiddleWare, (req,res)=>{
        const jwtToken = req.jwtToken
        if (jwtToken !== undefined){
            res.json({status:"successfully accessed "})
        }
})

router.post("/register" , async (req,res)=>{

    try{
        const userDetails = {
            username:req.body.username 
        }
    
       console.log(req.body)
        const salt = await bcrypt.genSalt(10)

         await bcrypt.hash(req.body.password, salt).then(hashedPassword =>{
                if (hashedPassword){
                    userDetails.password=hashedPassword
                    console.log(hashedPassword)
                    res.json({
                        status:hashedPassword
                    })
                }
        })
    
     await authModel.create(userDetails).then(hashed =>{
        if (hashed && hashed._id){
            res.json({
                status:"Success",
                data:hashed
             })
        }
    })
    

    }catch(err) {
        console.log(err)
        res.json({status:"error",data:err})
    }

    
    
    
})

module.exports = router