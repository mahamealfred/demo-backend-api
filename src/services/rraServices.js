const axios = require('axios');

const rraTaxPaymentIndependentAgent=async(taxPayerName,taxTypeDesc,amountToPay,descId,tin,payerPhone,authheader)=>{
    const auth = new Buffer.from(authheader.split(' ')[1],
'base64').toString().split(':');
const user = auth[0];
const pass = auth[1];
const auths=user+pass


    let data = JSON.stringify({
        "amount": amountToPay,
        "description": "T10: RRA Tax Payment(Independent Agent - Level 2 Testing)",
        "currency": "RW",
        "type": "agents_account.rra_agent_tax_payment_by_independent_agent",
        "customValues": {
          "transaction_reference_type": "rra_tax",
          "rra_tax_description": taxTypeDesc,
          "tax_document_id": descId,
          "tax_identification_number":tin,
          "payer_name": taxPayerName,
          "payer_phone": payerPhone
        },
        "subject": "'400401665710193"
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://testbox.mobicash.rw/CoreBank/test_box/api/self/payments',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Basic ${authheader}`
        },
        data : data
      };
      
      axios.request(config)
      .then((response) => {
     
       
       return JSON.stringify(response.data)
      })
      .catch((error) => {
        console.log(error);
        return JSON.stringify(error)
      });
      
}

module.exports={rraTaxPaymentIndependentAgent}