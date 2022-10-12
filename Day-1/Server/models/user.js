/* 
 * IMPORTS
 */
const mongoose = require("mongoose");

/* 
 * USER SCHEMA
 */
const userSchema = new mongoose.Schema({
    name: { type: String, required: true, },
    email: { type: String, required: true, },
    password: { type: String, required: true, },
    address: { type: Object, required: true, },
    phone: { type: String, maxlength: 10, required: true, },
    role: { type: Number, default: 0 },
}, {
    timestamps: true,
});

/* 
 * CREATING THE USER MODEL 
 */
const User = mongoose.model("User", userSchema);
module.exports = { User };