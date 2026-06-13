// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema({
//     title : {
//         type : String,
//         required :  true,
//     },
//     image : {
//         filename :{
//             type: String,
//         },
//         url :{
//             type : String,
//             default: "https://images.unsplash.com/photo-?id=ragazza-dai-capelli-neri-in-figurina-bianca-del-vestito-_RZfb8FFd2g&w=500&q=80",
//        set: v => v && v.trim() !='' ? v : "https://media.istockphoto.com/id/1842732901/vector/loading-icon.jpg?s=612x612&w=0&k=20&c=L_SMRRBQieZHtnrySZmDuy25_rWvEea_UeTnJqD08XE="
//         }
//     }, 
//     price : {
//         type : Number,
//         required : true,
//     },
//     description : {
//         type : String,
//         required : true
//     }
// });
// const product = mongoose.model("product",productSchema);
// module.exports = product;