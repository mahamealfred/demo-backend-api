const axios = require('axios');

const rraTaxPaymentIndependentAgent=async(taxPayerName,taxTypeDesc,amountToPay,descId,tin,payerPhone,authheader,res)=>{
    const auth = new Buffer.from(authheader.split(' ')[1],
'base64').toString().split(':');
const user = auth[0];
const pass = auth[1];
const auths=user+pass

    let data = JSON.stringify({
          "amount": amountToPay,
          "description": "T1: RRA Tax Payment(Client - Level 1 Testing)",
          "currency": "RW",
          "type": "client_client_account.rra_tax_payment",
          "customValues": {
              "transaction_reference_type":"rra_tax",
              "rra_tax_description":taxTypeDesc,
              "tax_document_id": descId,
              "tax_identification_number":tin,
              "client_name":"Remy"
          },
          "subject": "'400401665710193"
     
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://test.0360.money/0360Test/GH/api/self/payments',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': authheader
        },
        data : data
      };
      
      axios.request(config)
      .then((response) => {
       if(!response.data.id){
        return res.status(401).json({
          statusCode: 401,
          status:"FAILED",
          message:"Something went wrong!"
        }); 
      }
      return res.status(200).json({
        statusCode: 200,
        status:"SUCCESS",
        data:{
          transactionId:response.data.id,
          amount:response.data.amount,
          date:response.data.date
        }
      }); 
      })
      .catch((error) => {
        if(error.status==401){
          return res.status(401).json({
            statusCode: 401,
            status:"FAILED",
            message:"Invalid Authentication"
          }); 
        }
        else if(error.status==422){
          return res.status(422).json({
            statusCode: 422,
            status:"FAILED",
            message:"Tax Document Id must be unique"
          }); 
        }
        return res.status(500).json({
          statusCode: 500,
          status:"FAILED",
          message:error.message
        }); 
      });
      
}

module.exports={rraTaxPaymentIndependentAgent}