// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const User = require ("../models/userModel.js");
// const RefreshToken = require("../models/refreshTokenModel.js");
// const { generateAccessToken, generateRefreshToken, hashToken } = require("../utils/tokenUtils.js");
// const ExpressError = require("../utils/ExpressError.js");

// module.exports.createSignupUser = async(req,res)=> {
//     const { email=undefined, password=undefined } = req.body;
    
//     if(!email || !password) {
//        throw new ExpressError(
//             400,
//             "VALIDATION_ERROR",
//             "invalid input",
//             {
//               email: !email ? "Email is required" : undefined,
//               password: !password ? "Password is required" : undefined
//             }
//     ); 
//     }
//     if(password.length < 6) {
//         throw new ExpressError(
//           400,
//             "VALIDATION_ERROR",
//           "Invalid input",
//           {
//              password:"password must be at least 6 characters"
//             }
//         );
//     }
//     const existingUser = await User.findOne({ email });
//     if(existingUser){
//         throw new ExpressError(
//             400,
//             "VALIDATION_ERROR",
//             "Invalid Input",
//             {
//               email:"Email is alredady registered"
//             }
//         );
//     }
//     const user = new User({
//         email:email,
//         passwordHash:password
//     });
//     const response = await user.save();
//     res.status(201).json({
//       success: true,
//       message: "User created successfully",
//     });
    
// };


// module.exports.loginUser = async (req, res) => {
//     const { email, password } = req.body;

//     // 1. Validate input
//     if (!email || !password) {
//       throw new ExpressError(
//         400,
//         "VALIDATION_ERROR",
//         "Invalid Input",
//         {
//         email: !email?"email is required":undefined,
//         password: !password?"password is required":undefined,
//         }

//       )
//     }

//     // 2. Find user
//     const user = await User.findOne({ email }).select("+passwordHash");

//       if(!user || !(await bcrypt.compare(password, user.passwordHash))){

//             throw new ExpressError(
//               400,
//               "VALIDATION_ERROR",
//               "Invalid input",
//               {
//                 errorMessage:"INVALID EMAIL OR PASSWORD"
//               }
//             )
//         };
//     // 4. Generate tokens

//    const accessToken = generateAccessToken(user);
//    const refreshTokenValue = generateRefreshToken();
//    const hashed = hashToken(refreshTokenValue);

  
//    // save in db
//     const newToken = await RefreshToken.create({
//       user: user._id,
//       tokenHash: hashed ,
//       expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
//     });
//       console.log("sendig token",refreshTokenValue);
//     // 5. Send response
//     res.cookie("refreshToken", refreshTokenValue, {
//       httpOnly: true,
//       secure: true,
//       sameSite: "Strict"
//     });
//     return res.json({
//       accessToken,

//     });

//   } 


// // POST /auth/refresh


// //loghoout

// module.exports.logoutUser = async (req, res) => {

//   try {

//     const refreshToken = req.cookies.refreshToken;

//     if (refreshToken) {

//       const hashed = hashToken(refreshToken);

//       await RefreshToken.findOneAndDelete({
//         tokenHash: hashed
//       });

//     }

//     res.clearCookie("refreshToken", {
//       httpOnly: true,
//       secure: true,
//       sameSite: "Strict",
//     });

//     return res.status(200).json({
//       success: true,
//       message: "Logged out successfully"
//     });

//   } catch (err) {

//     throw new ExpressError(
//       500,
//       "SOMETHING_WENT_WRONG",
//       "SOMETHING WENT WRONG",
//       {
//        errorMessage: "Login failed",
//       }
//     )

//   }
// };

// module.exports.refreshToken = async (req, res) => {
//   console.log("refresh route");
//   const token = req.cookies.refreshToken; 

//   console.log("refreshToken",token);
//   if (!refreshToken) {
//     return res.status(401).json({
//       code: "NO_REFRESH_TOKEN",
//       message: "Refresh token missing"
//     });
//   }

//   try {
//     // 1. hash incoming token
//     const hashed = hashToken(refreshToken);

//     // 2. find token in DB
//     const tokenDoc = await RefreshToken.findOne({ tokenHash: hashed });

//     if (!tokenDoc) {
//       throw new  ExpressError(

//       )

//     }

//     // 3. check expiry
//     if (tokenDoc.expiresAt < new Date()) {
//       return res.status(401).json({
//         code: "EXPIRED_REFRESH",
//         message: "Refresh token expired"
//       });
//     }

//     // 4. get user
//     const user = await User.findById(tokenDoc.user);

//     if (!user) {
//       return res.status(401).json({
//         code: "USER_NOT_FOUND",
//         message: "User not found"
//       });
//     }

//     // 5. generate new access token
//     const newAccessToken = generateAccessToken(user);
//     console.log("newAccessToken",newAccessToken);
//     return res.json({
//       accessToken: newAccessToken
//     });

//   } catch (err) {
//     return res.status(500).json({
//       code: "SERVER_ERROR",
//       message: err.message
//     });
//   }
// };

// module.exports.getCurrentUser = async(req,res)=> {
//   const token = req.cookies.refreshToken;
//   console.log(req.user.id);
//   const user = await User.findById(
//   req.user.id
// ).select("-password");
// console.log(user);
// return res.status(200).json({
//   user
// });
// };



const bcrypt = require("bcrypt");

const User = require("../models/userModel.js");
const RefreshToken = require("../models/refreshTokenModel.js");

const {
  generateAccessToken,
  generateRefreshToken,
  hashToken
} = require("../utils/tokenUtils.js");

const ExpressError = require("../utils/ExpressError.js");



// =========================
// SIGNUP
// =========================

module.exports.createSignupUser = async (req, res) => {

  const { email = "", password = "" } = req.body;

  // validation
  if (!email || !password) {

    throw new ExpressError(
      400,
      "VALIDATION_ERROR",
      "Invalid input",
      {
        email: !email ? "Email is required" : undefined,
        password: !password ? "Password is required" : undefined
      }
    );

  }

  if (password.length < 6) {

    throw new ExpressError(
      400,
      "VALIDATION_ERROR",
      "Invalid input",
      {
        password: "Password must be at least 6 characters"
      }
    );

  }

  // existing user
  const existingUser = await User.findOne({ email });

  if (existingUser) {

    throw new ExpressError(
      400,
      "VALIDATION_ERROR",
      "Invalid input",
      {
        email: "Email is already registered"
      }
    );

  }

  // create user
  const user = new User({
    email,
    passwordHash: password
  });

  await user.save();

  return res.status(201).json({
    success: true,
    message: "User created successfully"
  });

};



// =========================
// LOGIN
// =========================

module.exports.loginUser = async (req, res) => {

  const { email = "", password = "" } = req.body;

  // validation
  if (!email || !password) {

    throw new ExpressError(
      400,
      "VALIDATION_ERROR",
      "Invalid input",
      {
        email: !email ? "Email is required" : undefined,
        password: !password ? "Password is required" : undefined
      }
    );

  }

  // find user
  const user = await User
    .findOne({ email })
    .select("+passwordHash");

  // invalid credentials
  if (
    !user ||
    !(await bcrypt.compare(password, user.passwordHash))
  ) {

    throw new ExpressError(
      401,
      "INVALID_CREDENTIALS",
      "Invalid email or password",
      {
        email: "Invalid email or password"
      }
    );

  }

  // generate tokens
  const accessToken = generateAccessToken(user);

  const refreshTokenValue = generateRefreshToken();

  const hashedToken = hashToken(refreshTokenValue);

  // save refresh token
  await RefreshToken.create({
    user: user._id,
    tokenHash: hashedToken,
    expiresAt: new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    )
  });

  // cookie
  res.cookie("refreshToken", refreshTokenValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  return res.status(200).json({
    success: true,
    accessToken
  });

};



// =========================
// LOGOUT
// =========================

module.exports.logoutUser = async (req, res) => {

  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {

    throw new ExpressError(
      401,
      "NO_REFRESH_TOKEN",
      "Refresh token missing",
      {
        refreshToken: "Refresh token missing"
      }
    );

  }

  const hashedToken = hashToken(refreshToken);

  const tokenDoc = await RefreshToken.findOne({
    tokenHash: hashedToken
  });

  if (!tokenDoc) {

    throw new ExpressError(
      401,
      "INVALID_REFRESH_TOKEN",
      "Invalid refresh token",
      {
        refreshToken: "Invalid refresh token"
      }
    );

  }

  // delete token
  await RefreshToken.findByIdAndDelete(tokenDoc._id);

  // clear cookie
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax"
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully"
  });

};



// =========================
// REFRESH TOKEN
// =========================

module.exports.refreshToken = async (req, res) => {

  const refreshToken = req.cookies.refreshToken;

  // missing token
  if (!refreshToken) {

    throw new ExpressError(
      401,
      "NO_REFRESH_TOKEN",
      "Refresh token missing",
      {
        refreshToken: "Refresh token missing"
      }
    );

  }

  // hash token
  const hashedToken = hashToken(refreshToken);
  console.log("refreshToken",refreshToken);

  // find token
  const tokenDoc = await RefreshToken.findOne({
    tokenHash: hashedToken
  });

  if (!tokenDoc) {

    throw new ExpressError(
      401,
      "INVALID_REFRESH_TOKEN",
      "Invalid refresh token",
      {
        refreshToken: "Invalid refresh token"
      }
    );

  }

  // expired token
  if (tokenDoc.expiresAt < new Date()) {

    throw new ExpressError(
      401,
      "EXPIRED_REFRESH_TOKEN",
      "Refresh token expired",
      {
        refreshToken: "Refresh token expired"
      }
    );

  }

  // find user
  const user = await User.findById(tokenDoc.user);

  if (!user) {

    throw new ExpressError(
      404,
      "USER_NOT_FOUND",
      "User not found",
      {
        user: "User not found"
      }
    );

  }

  // generate new access token
  const newAccessToken = generateAccessToken(user);

  return res.status(200).json({
    success: true,
    accessToken: newAccessToken
  });

};



// =========================
// CURRENT USER
// =========================

module.exports.getCurrentUser = async (req, res) => {

  if (!req.user) {

    throw new ExpressError(
      401,
      "UNAUTHORIZED",
      "Unauthorized access",
      {
        auth: "Unauthorized access"
      }
    );

  }

  const user = await User.findById(req.user.id)
    .select("-passwordHash");
console.log(user,"-----8---");
  if (!user) {

    throw new ExpressError(
      404,
      "USER_NOT_FOUND",
      "User not found",
      {
        user: "User not found"
      }
    );

  }
  return res.status(200).json({
    success: true,
    user
  });

};

// module.exports.getCurrentUser = async (req, res) => {

//   const refreshToken = req.cookies.refreshToken;

//   if (!refreshToken) {

//     throw new ExpressError(
//       401,
//       "NO_REFRESH_TOKEN",
//       "Refresh token missing"
//     );

//   }

//   const hashedToken = hashToken(refreshToken);

//   const tokenDoc = await RefreshToken.findOne({
//     tokenHash: hashedToken
//   });

//   if (!tokenDoc) {

//     throw new ExpressError(
//       401,
//       "INVALID_REFRESH_TOKEN",
//       "Invalid refresh token"
//     );

//   }

//   if (tokenDoc.expiresAt < new Date()) {

//     throw new ExpressError(
//       401,
//       "EXPIRED_REFRESH_TOKEN",
//       "Refresh token expired"
//     );

//   }

//   const user = await User.findById(tokenDoc.user)
//     .select("-passwordHash");

//   if (!user) {

//     throw new ExpressError(
//       404,
//       "USER_NOT_FOUND",
//       "User not found"
//     );

//   }

//   return res.status(200).json({
//     success: true,
//     user
//   });

// };