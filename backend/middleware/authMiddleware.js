const jwt = require("jsonwebtoken");
const ExpressError = require("../utils/ExpressError");

module.exports.protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {

    throw new ExpressError (
      401,
      "NO_TOKEN",
      "Athueraization required",
      {
        authorization : "Authorization header is missing"
      }
    )
}

if (!authHeader.startsWith("Bearer ")) {
  
  throw new ExpressError(
    401,
    "INVALID_FORMAT",
    "Invalid Authorization format",
    {
      authorization : "Authorization header must start with bearer"
    }
  )
}

const token = authHeader.split(" ")[1];

if (!token) {
  throw new ExpressError(
  401,
  "INVALID_TOKEN_FORMAT",
  "inavlid token format",
  {
    authorization : "Beare token is missing"
  }
  );
};

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
    next();
  } catch (error) {
    throw new ExpressError(
      401,
      "NO_REFRSH_TOKEN"
    )
  }
};