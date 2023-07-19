const express = require("express");

const rraRoute=require("./rra.routes");
const authRoute=require("./auth.routes")


const router=express.Router()

//authentication
 router.use('/api/authentication',authRoute);
//goverment services
router.use('/api/goverment-service/rra-service',rraRoute)

module.exports = router;