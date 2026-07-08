import axios from "axios";
import { useAuth } from "../../../../context/AuthContext.jsx";
import { useState, useEffect  } from "react";
import { useParams } from "react-router-dom";
import { useNavigate ,Link } from "react-router-dom";
import { getProductById } from "../api/productApi";
import BottomNav from "../../../../shared/components/BottomNav.jsx";
import { toast } from "react-toastify" ;
import { addToCart } from "../api/productApi.js";
const API_URL = import.meta.env.VITE_API_URL;

export default function ProductDetails() {
  const { user } = useAuth();

    const [ productInfo, setProductInfo ] = useState(null);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [addingToBag, setAddingToBag] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(()=> {
        const fetchProducts = ( async()=> {
          try{
              const response = await getProductById(id);
                setProductInfo(response);  
          }
          catch(error){
            console.log(error);
          }
              
         }
        );
        fetchProducts()
    },[id] );
    
    if (!productInfo){
        return <div className="text-center mt-20">Loading...</div>;
      }

      const formattedPrice = new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(selectedVariant?.price.sale || productInfo.variant[0].price.sale);

         const AddToBag= async () => {
            if (addingToBag) return;
               setAddingToBag(true);

            
                try {
                  
                  if (!selectedVariant) {
                  toast.error("Please select a sizet.");
                  return;
                }
                   const payload = {
                    variantId: selectedVariant._id,
                    quantity: 1
                };
                await addToCart(payload);
                toast.success("Added to bag");

              } catch (err) {
                  console.error(err);
              } finally {
                  setAddingToBag(false);
              }
             }
         return (
        
  <div className="min-h-screen bg-gray-100 pb-24">
    {/* Product Image */}
    <div className="relative bg-gray-100">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-5 left-4 z-10 h-11 w-11 rounded-full bg-white shadow flex items-center justify-center"
      >
        ←
      </button>

      {/* Right Icons */}
      <div className="absolute top-5 right-4 flex flex-col gap-3 z-10">

        <button className="h-11 w-11 rounded-full bg-white shadow flex items-center justify-center">
          ♡
        </button>

        <button className="h-11 w-11 rounded-full bg-white shadow flex items-center justify-center">
          ↗
        </button>
      </div>

      <img
        src={`${API_URL}${productInfo.data.thumbnail.url}`}
        alt={productInfo.data.title}
        className="w-full h-[450px] object-contain"
      />
    </div>

    {/* Product Information */}
    <div className="bg-white rounded-t-3xl -mt-4 relative z-20 px-5 py-6">

      {/* Brand */}
      <h2 className="text-2xl font-bold">
        {productInfo.data.brand || "Brand"}
      </h2>

      {/* Product Name */}
      <p className="text-gray-500 text-lg mt-1">
        {productInfo.data.title}
      </p>

      {/* Price */}
      <div className="flex items-center gap-3 mt-4">
        <span className="text-3xl font-bold text-black">
          {formattedPrice}
        </span>

        {/* Remove these later if price data exists */}
        {/* <span className="text-gray-400 line-through">
          ₹2499
        </span> */}

        <span className="text-red-500 font-semibold">
          -40%
        </span>
      </div>


            {/* Size Selection */}
<div className="mt-6">
  <div className="flex justify-between items-center">
    <h3 className="font-semibold text-lg">
      Select Size
    </h3>

    <span className="text-sm text-gray-500">
      Stock: {selectedVariant?.stockQuantity}
    </span>
  </div>

  <div className="flex gap-3 mt-4">
         
    {productInfo.variant?.map((variant) => ( // make sure that backend always return array what if only one variant available
      <button
        key={variant._id}
        onClick={() => setSelectedVariant(variant)}
        disabled={variant.stockQuantity === 0}
        className={`w-12 h-12 rounded-full border font-semibold transition
          ${
            selectedVariant?._id === variant._id
              ? "bg-black text-white border-black"
              : "bg-white border-gray-300"
          }
          ${
            variant.stockQuantity === 0
              ? "opacity-40 cursor-not-allowed"
              : "hover:border-black"
          }
        `}
      >
        {variant.size}
      </button>
    ))}

  </div>
</div>



      {/* Description */}
      <div className="mt-6">
        <h3 className="font-semibold text-lg mb-2">
          Description
        </h3>

        <p className="text-gray-600 leading-relaxed">
          {productInfo.data.description}
        </p>
      </div>
    </div>

    {/* Sticky Add To Bag Button */}
    <div className=" left-0 right-0 bg-white p-4">
      <Link to={`/cart`}>
        <button
            disabled={!selectedVariant}
            className={`w-full py-2 rounded border border-black text-white text-lg font-semibold ${
              !selectedVariant
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black text-white"
            }`}
        > Add to Cart
        </button>
      </Link>
      
    </div>
    <BottomNav/>
  </div>
  
);
  
}