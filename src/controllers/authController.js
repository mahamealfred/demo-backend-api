
const usersDetails=require("../dammyData/usersData");

class authController{
    static async signIn(req, res) {
        const {email,password}=req.body
        let checkedEmail,checkedPassword
        try {
         usersDetails.map((p)=>{
             if(p.email==email){
               checkedEmail=p.email,
               checkedPassword=p.password
              }
          })
          if(checkedEmail){
            if(checkedPassword==password){
                return res.status(200).json({
                    statusCode: 200,
                    status:"SUCCESS",
                    message: "Successfull logged",
                    data:{}

                  });
            }
            return res.status(400).json({
                statusCode: 400,
                status:"FAILED",
                message: "Invalid password"
              });
           
          } return res.status(404).json({
            statusCode: 404,
            status:"FAILED",
            message: "User does'not exist"
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