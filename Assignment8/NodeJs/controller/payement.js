const Razorpay = require('razorpay');
const shortId = require('shortid');
const Transactions=require('../model/transaction');
const crypto=require('crypto');

var instance = new Razorpay({
    key_id: 'rzp_test_bfPUFMRsFHrlFB',
    key_secret: 'Rz9kTUVrwmv5vOYnITNrfsqO'
})
exports.createOrder = async (req, res) => {

    let options = {
        amount: req.body.amount * 100,
        currency: "INR",
        receipt: shortId.generate(),
        notes: {
            key1: "value3",
            key2: "value2"
        }
    }

    try {
        const response = await instance.orders.create(options);
        console.log(response);
        res.json(response);
    } catch (error) {
        console.log(error);
    }


}

exports.saveTransaction=(req,res)=>{
    console.log("saving transactions!!!",req.body);
    //making signature ready at the backend
    const generated_signature=crypto.createHmac('sha256',instance.key_secret);
    generated_signature.update(req.body.razorpay_orderid+"|"+req.body.razorpay_paymentid);

    //comparing frontend and backend signature
    if(req.body.razorpay_signature == generated_signature.digest('hex')){
        console.log("create transaction Object");
        const transaction=new Transactions({
            transaction_id: req.body.razorpay_paymentid,
            transaction_amount: req.body.razorpay_amount
        })
        transaction.save(function(err,saveTransaction){
            if(err)
            {
                console.log("error occurred while saving transaction");
                return res.status(500).send("some error occurred",err); 
            }
            req.status(200).send({transaction: transaction})
        })
    }
}



// const Razorpay=require('razorpay')
// const shortid = require("shortid");
// const crypto = require('crypto')
// const Transaction=require('../model/transaction')
// var instance =new Razorpay({
//     key_id: 'rzp_test_bfPUFMRsFHrlFB',
//     key_secret: 'Rz9kTUVrwmv5vOYnITNrfsqO'
//   })

//   exports.createOrder=async(req, res)=>{
//     let options={
//       amount:req.body.amount*100,
//       currency: "INR",
//       receipt: shortid.generate(),
//       notes: {
//         key1: "value3",
//         key: "value2"
//       }
//     }
//   try{
//     const response= await instance.orders.create(options)
//   console.log(response)
//   res.json(response)}

//   catch(error){
//     console.log(error)
//   }
  
// }
// exports.saveTransaction =(req,res)=>{
//   console.log("saving Transaction....",req.body);
//   const generated_signature = crypto.createHmac('sha256',razorpay.key_secret)
    
//     generated_signature.update(req.body.razorpay_orderid+"|"+ req.body.razorpay_paymentid)
//      if (req.body.razorpay_signature == req.body.razorpay_signature.digest('hex')){
//            console.log("XCreate Transaction object")
//             const transaction = new Transaction({
//               transaction_id:req.body.razorpay_paymentid,
//               transactio_namount:req.body.razorpay_amount,
//           });
//           console.log(transaction)
//           transaction.save(function(err, savedtransac){
//             if(err){
//                 console.log(err);
//                 return res.status(500).send("Some Problem Occured",err);
//             }
//             res.send({transaction: savedtransac});
  
//         });
//       return res.send('success');
//     }
//     else{
//       return res.send('failed');
//     }
// }