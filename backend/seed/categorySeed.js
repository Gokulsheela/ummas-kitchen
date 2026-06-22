const mongoose=require("mongoose");
const category = require("../models/product/category.model");

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
}




const categoryData =[
     {
    name: "Men",
    slug: "men",
    thumbnail: {
      url: '/uploads/menCategory.png',
      altText: 'men'
    },

  },
  {
    name: "Women",
    slug: "women",
    thumbnail: {
      url: '/uploads/womenCategory.png',
      altText: 'women'
    },

  },
  {
    name: "Kids",
    slug: "kids",
    thumbnail: {
      url: '/uploads/kidsCategory.png',
      altText: 'kids '
    },

  },
    
];



const initDB=async ()=>{
    await category.deleteMany({});
    await category.insertMany(categoryData);

    console.log("data was initilaized")
}
initDB();