const mongoose= require('mongoose')

const menuSchema =mongoose.Schema({
    itemPrice:{
        type:Number,
        require:true
    },
    itemName:{
        type:String,
        require:true
    },
    itemDescription:{
        type:String,
        require:true
    },
    isVeg:{
        type:Boolean,
        require:true
    },
    restaurantName:{
        type:String,
        require:true
    }


})
module.exports=mongoose.model("Menu",menuSchema,"menu")