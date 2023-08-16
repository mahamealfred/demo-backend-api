
const rraDetails=require("../dammyData/rraData");
const axios = require('axios');
const { rraTaxPaymentIndependentAgent } = require("../services/rraServices");
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
                DEC_ID=p.DEC_ID,
                DEC_DATE=p.DEC_ID,DEC_DATE
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

    static async rraPayment(req, res) {
const {bankName,rraRef,tin,taxPayerName,taxTypeDesc,taxCenterNo,taxTypeNo,assessNo,rraOriginNo,amountToPay,descId,payerPhone,brokering}=req.body
const authheader = req.headers.authorization;
if (!authheader) {
    return res.status(401).json({
      status: 401,
      message: "A token is required for authentication",
    });
}
let resp_payment
if(brokering!=='Independent'){
  return res.status(401).json({
    statusCode: 401,
    status:"FAILED",
    message: "You are not authorized to do this payment",
  });  
 
}
//here
try{
await rraTaxPaymentIndependentAgent(taxPayerName,taxTypeDesc,amountToPay,descId,tin,payerPhone,authheader,res)
  
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