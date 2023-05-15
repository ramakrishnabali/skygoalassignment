const jwt = require("jsonwebtoken")

const secreatKey = "alsdjfhgjsqwertyui789!@#$%CVB$%^74125ghjk"


const tokenVerification = (req,res,next)=>{
    const jwtToken = req.headers.Authorization[1]

    if (jwtToken !== undefined){
        try{
            const comparedToken = jwt.compare(jwtToken,secreatKey)
            req.jwtToken = comparedToken
           
        }catch(err){
            res.json({status:"jwt token not valid"})
        }
    }else{
        res.json({status:"token is not valid one"})
    }
    return next()
}

module.exports = tokenVerification