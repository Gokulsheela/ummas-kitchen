const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require ("../models/userModel.js");

module.exports.createSignupUser = async(req,res)=> {
    const { email, password } = req.body;
    console.log(email, password);
    
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
    console.log(user);
    const response = await user.save();
    console.log(response,"response");
    res.status(201).json({
      message: "User created successfully",
    });
    
};

module.exports.log = async(req,res)=> {
    const {email, password } = req.body;
    
    const user = await User.findOne({ email }).select("+passwordHash");


    if(!user || !(await user.comparePassword(password))) {
    return res.status(401).json({
        message:"Inavlid Credentials"
    })
   }
    const token = jwt.sign(
    {id: user._id, role:user.role},
    "SECRET_KEY",
    { expiresIn:"7d"}
     )
    res.status(200).json({
    message:"login successfull",
    token
   });
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
    if (!user) {
      return res.status(401).json({
        code: "INVALID_CREDENTIALS",
        message: "Invalid email or password"
      });
    }

    // 3. Check password
    const isMatch = await bcrypt.compare(password, user.passwordH);
    if (!isMatch) {
      return res.status(401).json({
        code: "INVALID_CREDENTIALS",
        message: "Invalid email or password"
      });
    }

    // 4. Generate tokens

    // Access Token (short-lived)
    const accessToken = jwt.sign(
      { id: user._id },
      "ACCESS_SECRET",
      { expiresIn: "15m" }
    );

    // Refresh Token (long-lived)
    const refreshToken = jwt.sign(
      { id: user._id },
      "REFRESH_SECRET",
      { expiresIn: "7d" }
    );

    // 5. Send response
    return res.json({
      accessToken,
      refreshToken
    });

  } catch (error) {
    return res.status(500).json({
      code: "SERVER_ERROR",
      message: "Something went wrong"
    });
  }
};