const express=require('express')
const resturantRoutes=require('./routes/restaurent')
const locationRoutes=require('./routes/location')
const menuRoutes=require('./routes/menu')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
const paymentRoutes=require('./routes/payment')
const mealTypeRoutes=require('./routes/mealType')
const cors=require('cors')

const PORT=9090;

const DBSTRING="mongodb://localhost/zomato_44"



mongoose.connect(DBSTRING,()=>{
    console.log("mongoDB connnected successfully")
},
e=>console.log("error occured while connecting to DB:",e))


let app=express();

//configuration
app.use(cors())
app.use(bodyParser.json())

app.use('/restaurant',resturantRoutes)
app.use('/menu',menuRoutes)
app.use('/location',locationRoutes)
app.use('/mealType',mealTypeRoutes)
app.use('/payment',paymentRoutes)


//heroku configuration
// if(process.env.NODE_ENV=="production"){
//     console.log("In Production")
//     app.use(express.static("frontend/build"))
//     const path=require('path')
//     app.get('*',(req,res)=>{
//         res.sendFile(path.resolve(__dirname,"frontend","build","index.html"))

//     })
// }






app.listen(PORT,()=>{
    console.log(`The server is running on port: ${PORT}`)
})