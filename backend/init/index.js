const mongoose=require("mongoose");
const product=require("./data.js");
const products=require("../models/productModel.js")

const MONGO_URL="mongodb://127.0.0.1:27017/ummas-kitchen";

main()
.then(()=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB=async ()=>{
    await products.deleteMany({});
    await products.insertMany(product.data);

    console.log("data was initilaized")
}
initDB();