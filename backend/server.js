const express=require('express');
const app=express();
const mongoose=require("mongoose");
const user = require("./models/userModel.js");
const product = require("./models/productModel.js");
const productRouter = require("./routes/productRoutes.js")
dbUrl='mongodb://127.0.0.1:27017/ummas-kitchen';
const cors=require ("cors");

app.use(cors());
app.use(express.json());

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


app.get("/save", async (req,res)=>{
    
        // const user1 = new user({
        //     username : "gokulMo",
        //     email   : 'gokulMo@gmail.com',
        //     password : "gokulMohanMO"
        // })
        // user1.save();
        const product1= new product({
            title : "phones",
            price : 90789,
            description : " This is a very new model form ****, Good and Iconic"
        })
        product1.save();
        res.send("data saved successfully")
});

 app.use("/",productRouter);

app.get('/',(req,res) => {
    res.send("hi this is me your root page");
})

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});