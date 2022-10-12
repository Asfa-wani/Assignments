const jwt = require("jsonwebtoken");
exports.genAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SEC, { expiresIn: "7days" });
    return token;
};