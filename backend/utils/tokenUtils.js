const jwt = require("jsonwebtoken");
const crypto = require("crypto");
 
exports.generateAccessToken = (user)=> {
    console.log("inside accessToken controller");
    return jwt.sign(
        { id: user._id, role:user.role  },
        process.env.JWT_SECRET,
        { expiresIn: "1m" }
        );
};
exports.generateRefreshToken= ()=> {
    return crypto.randomBytes(64).toString("hex");
    };

exports.hashToken = (token)=> {
    return crypto.createHash("sha256").update(token).digest("hex");
};