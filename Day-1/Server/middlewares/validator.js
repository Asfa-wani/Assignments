const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");


/* 
 * VALIDATING USER INFO WITH JOI VALIDATION 
 */
const validateRegister = (data) => {
    const schema = joi.object({
        name: joi.string().required().label("Name"),
        email: joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password"), //USING JOI PASSWORD COMPLEXITY
        address: joi.object().required().label("Address"),
        phone: joi.string().length(10).required().label("Phone"),

    });
    return schema.validate(data);
};
//VALIDATION FUNCTION USING JOI TO VALIDATE LOGIN DETAILS
const validateLogin = (data) => {
    const schema = joi.object({
        email: joi.string().email().required().label("Email"),
        password: joi.string().required().label("Password"),
    });
    return schema.validate(data);
}
module.exports = { validateRegister, validateLogin };