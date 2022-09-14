const MealType=require('../model/mealType')


exports.getAllmealType=(req,res)=>{
    MealType.find()
    .then(
        result=>
        res.status(200).json({
            message:"MealType fetches succssefully",
            data:result
        }))
        .catch(error=>
            res.status(500).json({
                message:"error occured in DB",
                error:error
            }))
    }
    