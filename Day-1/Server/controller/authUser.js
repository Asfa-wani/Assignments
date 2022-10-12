/* 
 * USER LOGIN AND REGISTER FUNCTIONS
 */

//IMPORTS
const { User } = require("../models/user");
const { validateRegister, validateLogin } = require("../middlewares/validator");
const { genAuthToken } = require("../middlewares/genToken");
const bcrypt = require("bcrypt");



//FUNCTION TO REGISTER/SAVE USERS TO THE DB
const registerUser = async(req, res) => {
    try {
        //VALIDATE THE INPUT DATA
        const { error } = validateRegister(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        const user = await User.findOne({ email: req.body.email });
        if (user)
            return res.status(409).send({ message: "User with this email already exists!" });


        //GENERATE SALT FOR HASHING THE PASSWORD USING BCRYPT
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        //ENCRYPT THE PASSWORD
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        //SAVE THE USER IN THE DB
        await new User({...req.body, password: hashPassword }).save();
        return res.status(201).send({ message: "Registered successfully!" });

    } catch (error) {

        res.status(500).send({ message: "server error" });
    }
};



//CREATED LOGIN FUNCTION
const loginUser = async(req, res) => {
    try {
        //VALIDATE LOGIN CREDENTIALS
        const { error } = validateLogin(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        //SEARCH USER IN DB
        const user = await User.findOne({ email: req.body.email });

        if (!user)
            return res.status(401).send({ message: "Invalid email  or password!" });

        const validPassword = await bcrypt.compare(req.body.password, user.password);

        if (!validPassword)
            return res.status(401).send({ message: "Email and password do not match!" });
        console.log("hello")
        const token = genAuthToken();
        res.status(200).send({ data: token, message: "Logged in Successfully!" });
    } catch (error) {
        return res.status(500).send({ message: "Internal server error!" });
    }
};



module.exports = {
    loginUser,
    registerUser,
};