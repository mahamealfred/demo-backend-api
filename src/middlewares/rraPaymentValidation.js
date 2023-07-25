const Joi=require("joi")

const rraPaymentValidation = (req, res, next) => {
  const Schemas = Joi.object().keys({

    bankName:Joi.string().min(2).required().messages({
        "string.empty": "Bank name is not allowed to be empty",
        "string.required": "Bank name is required lar",
        "string.min": "Bank name must be at least 2 characters long",
      }),
    rraRef:Joi.number().required().messages({
        "string.empty": "RRA refrence is not allowed to be empty",
        "string.required": "RRA refrence is required ",
        "string.number": "RRA refrence  must be a numiric value",
      }),
    tin:Joi.number().required(),
    taxPayerName:Joi.string().required(),
    taxTypeDesc:Joi.string().required(),
    taxCenterNo:Joi.number().required(),
    taxTypeNo:Joi.number().required(),
    assessNo:Joi.number().required(),
    rraOriginNo:Joi.number().required(),
    amountToPay:Joi.number().required(),
    descId:Joi.number().required(),
    payerPhone:Joi.string().required(),
    // "agentIdentify"=>'required',
    brokering:Joi.string().required()    
    
   
   
  });

  const { error } = Schemas.validate(req.body);

  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports=rraPaymentValidation;