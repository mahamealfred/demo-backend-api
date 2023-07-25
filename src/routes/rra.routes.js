const express = require("express");
const rraController=require("../controllers/rraController");
const rraPaymentValidation=require("../middlewares/rraPaymentValidation")
const router=express.Router()
router.get('/doc-id-validation/:rra_doc_id',rraController.docIdDetails);
router.post('/rra-payment',rraPaymentValidation,rraController.rraPayment);

module.exports = router;