import axios from "axios";
import { useState, useEffect  } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getProductById, deleteProduct } from "../api/productApi.js";


export default function ProductDetails() {
    const [ productInfo, setProductInfo ] = useState(null);
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

    function buttonClickEdit() {
        navigate(`/edit/${productInfo._id}`);
    }
    const buttonsClickDelete = async()=> {
        await deleteProduct(id);
        navigate(`/`);
    }

    if (!productInfo){
        return <div className="text-center mt-20">Loading...</div>;
      }
      
      const formattedPrice = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
      }).format(productInfo.price);
      
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-10">
          
       
          {/* Product Image */}
          <div className="flex justify-center items-center">
            <img
              src={productInfo.image.url}
              alt="Product"
              className="w-full max-w-md rounded-lg object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-between space-y-6">
            
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
                {productInfo.title}
              </h1>

              <p className="text-xl text-black font-bold mt-4">
                {formattedPrice}
              </p>

              <p className="text-gray-600 mt-6 leading-relaxed">
                {productInfo.description}
              </p>
            </div>

            {/* Action Button */}
            <div className="grid grid-cols-1 md:grid-cols-2 md:p-10">
              <button className="w-full md:w-1/2 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition" onClick={buttonClickEdit}>
              edit
            </button>
            <button className="w-full md:w-1/2 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition" onClick={buttonsClickDelete}>
              delete
            </button>
            </div>
            

          </div>
        </div>

      </div>
    </div>
  );
}