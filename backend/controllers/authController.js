const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require ("../models/userModel.js");
const RefreshToken = require("../models/refreshTokenModel.js");
const { generateAccessToken, generateRefreshToken, hashToken } = require("../utils/tokenUtils.js");

module.exports.createSignupUser = async(req,res)=> {
    const { email, password } = req.body;
    
    if(!email || !password) {
        return res.status(400).json({
            message:"Email and password are required"
        }); 
    }
    if(password.length < 6) {
        return res.status(400).json({
            message : "password must be at least 6 character"
        });
    }
    const existingUser = await User.findOne({ email });
    if(existingUser){
        return res.status(400).json({
            message: "email already exist"
        });
    }
    const user = new User({
        email:email,
        passwordHash:password
    });
    const response = await user.save();
    res.status(201).json({
      message: "User created successfully",
    });
    
};


module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate input
    if (!email || !password) {
      return res.status(400).json({
        code: "INVALID_INPUT",
        message: "Email and password are required"
      });
    }

    // 2. Find user
    const user = await User.findOne({ email }).select("+passwordHash");
    const compareResult = await bcrypt.compare(password, user.passwordHash);

      if(!user || !(await bcrypt.compare(password, user.passwordHash))){
        return res.status(401).json({
        code: "INVALID_CREDENTIALS",
        message: "Invalid email or password"
      }
      )};
    // if (!user) {
    //   return res.status(401).json({
    //     code: "INVALID_CREDENTIALS",
    //     message: "Invalid email or password"
    //   });
    // }

    // // 3. Check password
    // const isMatch = await bcrypt.compare(password, user.passwordHash);
    // if (!isMatch) {
    //   return res.status(401).json({
    //     code: "INVALID_CREDENTIALS",
    //     message: "Invalid email or password"
    //   });
    // }

    // 4. Generate tokens

   const accessToken = generateAccessToken(user);
   const refreshTokenValue = generateRefreshToken();
   const hashed = hashToken(refreshTokenValue);

  
   // save in db
    const newToken = await RefreshToken.create({
      user: user._id,
      tokenHash: hashed ,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    // 5. Send response
    return res.json({
      accessToken,
      refreshToken: refreshTokenValue

    });

  } catch (error) {

  return res.status(500).json({
    code: "SERVER_ERROR",
    message: error.message // 👈 send actual error
  });
}
  }


// POST /auth/refresh

module.exports.refreshToken = (req, res) => {
  const { refreshToken } = req.body;
  
  if (!refreshToken) {
    return res.status(401).json({
      code: "NO_REFRESH_TOKEN",
      message: "Refresh token missing"
    });
  }

  try {
    const decoded = jwt.verify(refreshToken, "REFRESH_SECRET");

    const newAccessToken = jwt.sign(
      { id: decoded.id },
      "ACCESS_SECRET",
      { expiresIn: "15m" }
    );

    return res.json({
      accessToken: newAccessToken
    });

  } catch (err) {
    return res.status(401).json({
      code: "INVALID_REFRESH",
      message: "Invalid refresh token"
    });
  }
};




