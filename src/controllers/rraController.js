
const rraDetails=require("../dammyData/rraData");

class rraController{
    static async docIdDetails(req, res) {
        const rra_doc_id=req.params.rra_doc_id;
        let checkedId
        let bank_name,RRA_REF, TIN, TAX_PAYER_NAME,TAX_TYPE_DESC,TAX_CENTRE_NO
        let  TAX_TYPE_NO,ASSESS_NO,RRA_ORIGIN_NO,AMOUNT_TO_PAY, DEC_ID,DEC_DATE
        
        
        try {
         rraDetails.map((p)=>{
             if(p.RRA_REF==rra_doc_id){
                checkedId =p.RRA_REF
                bank_name=p.bank_name
                RRA_REF=p.RRA_REF
                TIN=p.TIN
                TAX_PAYER_NAME=p.TAX_PAYER_NAME
                TAX_TYPE_DESC=p.TAX_TYPE_DESC
                TAX_CENTRE_NO=p.TAX_CENTRE_NO
                TAX_TYPE_NO=p.TAX_TYPE_NO
                ASSESS_NO=p.ASSESS_NO
                RRA_ORIGIN_NO=p.RRA_ORIGIN_NO
                AMOUNT_TO_PAY=p.AMOUNT_TO_PAY
                DEC_ID,DEC_DATE=p.DEC_ID,DEC_DATE
              }
          })
          if(checkedId){
            return res.status(200).json({
                statusCode: 200,
                status:"SUCCESS",
                message: "Successfull",
                data:{
                  bank_name: bank_name,
                  RRA_REF: RRA_REF,
                  TIN:TIN,
                  TAX_PAYER_NAME: TAX_PAYER_NAME,
                  TAX_TYPE_DESC: TAX_TYPE_DESC,
                  TAX_CENTRE_NO: TAX_CENTRE_NO,
                  TAX_TYPE_NO: TAX_TYPE_NO,
                  ASSESS_NO: ASSESS_NO,
                  RRA_ORIGIN_NO: RRA_ORIGIN_NO,
                  AMOUNT_TO_PAY: AMOUNT_TO_PAY,
                  DEC_ID: DEC_ID,
                  DEC_DATE: DEC_DATE
                }
              });
          } return res.status(404).json({
            statusCode: 404,
            status:"FAILED",
            message: "RRA reference not fount"
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
module.exports =rraController