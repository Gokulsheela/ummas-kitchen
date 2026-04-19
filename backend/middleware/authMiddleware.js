const jwt = require("jsonwebtoken");

module.exports.protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
  

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
  code: "NO_TOKEN",
  message: "No token provided",
});
    }

    const token = authHeader.split(" ")[1];
    console.log("TOKEN", token);

    if (!token) {
      return res.status(401).json({ code: "TOKEN_EXPIRED" });
    }

    const decoded = jwt.verify(token, "ACCESS_SECRET");
    console.log(decoded);

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Not authorized", 
      code:"TOKEN_EXPIRED",

    });
  }
};