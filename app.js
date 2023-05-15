
const express = require("express")
const app = express()
const mongoose = require("mongoose")

const authRouter = require("./routes/auth.js")


app.use(express.json())

app.use(express.urlencoded({extended:true}))



const mongoUrl = "mongodb+srv://ramakrishna:Rama535145@cluster0.2vklru1.mongodb.net/"

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connection established"))
  .catch((err) => console.error(err));
// mongoose.connection.on("open",()=>{
//     console.log("database connected successfully")
// })

app.listen(3000,(err)=>{
    if(err){
        console.log(err)
    }
})

app.use("/auth", authRouter)
