 require("dotenv").config({ debug: true });

const express=require('express');
const app=express();
const mongoose=require("mongoose");

const user = require("./models/userModel.js");
const product = require("./models/productModel.js");

const productRouter = require("./routes/productRoutes.js")
const authRouter = require("./routes/authRoutes.js")

const cors=require ("cors");
const cookieParser = require("cookie-parser");

const ExpressError = require("./utils/ExpressError.js");
const errorMiddleware = require("./middleware/errorMiddleware.js")

const dbUrl='mongodb://127.0.0.1:27017/ummas-kitchen';

main()
.then(()=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect(dbUrl);
};

//core Middlewares
// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true
// }));

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://hoppscotch.io"
  ],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

//logger optional
app.use((req, res, next) => {
  console.log("Incoming:", req.method, req.url);
  next();
});

//Routes
app.get("/", (req, res) => {
  res.send("Server working");
});

 app.use("/",productRouter);
 app.use("/auth",authRouter);





main()
.then(()=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect(dbUrl);
};


// app.get("/save", async (req,res)=>{
    
        // const user1 = new user({
        //     username : "gokulMo",
        //     email   : 'gokulMo@gmail.com',
        //     password : "gokulMohanMO"
        // })
        // user1.save();
//         const product1= new product({
//             title : "phones",
//             price : 90789,
//             description : " This is a very new model form ****, Good and Iconic"
//         })
//         product1.save();
//         res.send("data saved successfully")
// });
 
//404 Handler
app.use((req,res,next)=>{
     next(new ExpressError(404,"NOT_FOUND","Invalid Route"));
});

//error Middleware
app.use(errorMiddleware);

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const { statusCode = 500, message = "Internal Server Error" } = err;

  res.status(statusCode).json({
    success: false,
    message,
  });
});

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});
