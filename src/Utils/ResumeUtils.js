const Joi = require("joi");

/**
 *@function ValidateResumeSchema: used for validation of the resume Schema
 */
 const ValidateResumeSchema = (resume) => {
    const resumeSchema = Joi.object({
       
        name: Joi.string().required().pattern(/^[a-zA-Z0-9.-]+ [A-Za-z]+$/).messages({
            'string.pattern.base': 'name must be in "<First Name> <Last Name>" format with a single space.',
            'any.required': 'name is required.'
          }),
        ip:Joi.string(),
        job_title: Joi.string(),
        job_description: Joi.string(),
        job_company: Joi.string(),
    });
    return resumeSchema.validate(resume);

};

module.exports ={
    ValidateResumeSchema
}