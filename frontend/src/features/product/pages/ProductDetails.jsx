import axios from "axios";
import { useState, useEffect  } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getProductById, deleteProduct } from "../api";
import { toast } from "react-toastify" ;


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
        try {
          await deleteProduct(id);
          toast.success("Listing Deleted Successfully");
        navigate(`/`);
        } catch(err){
          toast.error(err);
        }
        
    }

    if (!productInfo){
        return <div className="text-center mt-20">Loading...</div>;
      }
      
      const formattedPrice = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
      }).format(productInfo.price);
      
  return (
   <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">

  <div className="max-w-5xl w-full bg-white rounded-2xl shadow-lg overflow-hidden">

    <div className="grid grid-cols-1 md:grid-cols-2">

      {/* Product Image */}
      <div className="bg-gray-50 flex items-center justify-center p-8">
        <img
           src={productInfo?.image?.url} alt={productInfo?.title} 
          className="w-full max-w-sm rounded-xl shadow object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="p-8 flex flex-col justify-between">

        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {productInfo.title}
          </h1>

          <p className="text-2xl font-semibold text-blue-600 mt-4">
            {formattedPrice}
          </p>

          <p className="text-gray-600 mt-6 leading-relaxed">
            {productInfo.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">

          <button
            onClick={buttonClickEdit}
            className="flex-1 bg-gray-900 text-white py-3 rounded-lg hover:bg-black transition font-medium"
          >
            Edit Product
          </button>

          <button
            onClick={buttonsClickDelete}
            className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition font-medium"
          >
            Delete Product
          </button>

        </div>

      </div>

    </div>

  </div>

</div>
  );
}