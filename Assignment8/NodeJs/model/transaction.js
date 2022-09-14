const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
let transactionSchema = new mongoose.Schema({
    transaction_id:{
        type:String,
        require:true

    },
    transaction_amount:{
        type:String,
        require:true
    },
    razorpay_orderid:{
        type:"String",
        require:true
    },
    razorpay_signature:{
        type:"String",
        require:true
    },
    razorpay_amount:{
        type:Number,
        require:true
    }
});
module.exports = mongoose.model("Transaction",transactionSchema ,"transactions");