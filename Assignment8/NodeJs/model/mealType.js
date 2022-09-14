const mongoose=require('mongoose')

const mealTypeSchema =mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    content:{
        type:String,
        require:true
    },
    imgae:{
        type:String,
        require:true
    },
    meal_type:{
        type:Number,
        require:true
    }
})
module.exports=mongoose.model("MealType",mealTypeSchema,"mealtype")