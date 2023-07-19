const express = require("express");
const rraController=require("../controllers/rraController");
const router=express.Router()
router.get('/doc-id-validation/:rra_doc_id',rraController.docIdDetails);

module.exports = router;