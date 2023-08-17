
const usersDetails=require("../dammyData/usersData");
const { decode, encode } = require("../helpers/jsonwebToken");
class authController{
    static async signIn(req, res) {
        //const {username,password}=req.body
        const authheader = req.headers.authorization;
        const auth = new Buffer.from(authheader.split(' ')[1],
        'base64').toString().split(':');
        const username = auth[0];
        const password = auth[1];
       
        
        let checkedEmail,checkedPassword;
        let fullname,role,user,phone,isActive,emailLabel,brokering,group;
        
        try {
         usersDetails.map((p)=>{
             if(p.username==username){
               checkedEmail=p.username,
               checkedPassword=p.password,
               emailLabel=p.email,
               fullname=p.fullName,
               role=p.role,
               user=p.username,
               phone=p.phoneNumber,
               isActive=p.isActive
               brokering=p.brokering
               group=p.group
              }
          })
          if(checkedEmail){
            if(checkedPassword==password){
                return res.status(200).json({
                    statusCode: 200,
                    status:"SUCCESS",
                    message: "Successfull logged",
                    data:{
                      fullName:fullname,
                      role:role,
                      email:emailLabel,
                      username:user,
                      phoneNumber:phone,
                      brokering:brokering,
                      group:group,
                      isActive:isActive,
                      token:encode({emailLabel,role})
                    }

                  });
            }
            return res.status(400).json({
                statusCode: 400,
                status:"FAILED",
                message: "Please enter a correct Password"
              });
           
          } return res.status(404).json({
            statusCode: 404,
            status:"FAILED",
            message: "Please enter a correct Username"
          });
            
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                status:"FAILED",
                message: error.message,
              });  
        }
   
    }
   
}
module.exports =authController