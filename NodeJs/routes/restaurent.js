const express=require('express')
const restaurantController=require('../controller/restaurent')

const router=express.Router()


router.get("",restaurantController.getAllRestaurent)

router.get("/:cID",restaurantController.getRestaurantByCityID)

router.get('/details/:rName',restaurantController.getRestaurantByName)



// register all the routes

router.post("",restaurantController.addRestaurant)
router.post("/filter/:pageNo",restaurantController.getRestaurantByFilter)

router.put("",restaurantController.updateRestaurant)

router.delete("",(req,res)=>{
    res.send("You Have called restaurant route DELETE method")
})
 

module.exports=router;
