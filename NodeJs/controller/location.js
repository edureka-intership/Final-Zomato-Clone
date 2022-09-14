const Location=require('../model/location')


exports.getAllLocations=(req,res)=>{
    Location.find()
    .then(
        result=>
        res.status(200).json({
            message:"Location fetches succssefully",
            data:result
        }))
        .catch(error=>
            res.status(500).json({
                message:"error occured in DB",
                error:error
            }))
    }
    