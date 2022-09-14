const express=require('express')
const Router=express.Router()
const paymentcontroller= require('../controller/payement')

Router.post('', paymentcontroller.createOrder);
//Router.post('/razorpay', paymentcontroller.completePayment );
Router.post('/save', paymentcontroller.saveTransaction );
  
module.exports=Router