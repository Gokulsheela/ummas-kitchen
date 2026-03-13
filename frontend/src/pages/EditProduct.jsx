import axios from "axios";
import { useParams } from "react-router-dom";
import { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { updateProduct ,getProductById} from "../api/productApi.js"
export default function EditformData() {
    const [ formData, setFormData ] = useState({
            title:"",
            image:{ url:"" },
            price:"",
            description:""
    });
    const navigate = useNavigate();
    const {id} =useParams();

    useEffect(()=>{
        const fetch = async()=> {
            try{

                 const response = await getProductById(id)
               console.log(response);
           setFormData(response);
            }
            catch(error){
                console.log(error);
            }
           
           
        }
        fetch();
    },[]);
 
    const HandleSubmit = async(event)=> {
            event.preventDefault();
            await updateProduct(id,formData);
        
            setFormData({
                title:"",
                image:"",
                price:"",
                description:""
            });
        navigate(`/product/${id}`);
    }
    function HandleForm(event){
        setFormData((currData)=>{
            return {...currData,[event.target.name]: event.target.value}
        })

    }
 
    return (
       <form 
  onSubmit={HandleSubmit} 
  className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-lg shadow space-y-4"
>

  <h2 className="text-2xl font-semibold text-center mb-4">
    Add New Product
  </h2>

  <div>
    <label className="block text-sm font-medium mb-1">
      Product Title
    </label>
    <input
      type="text"
      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      name="title"
      value={formData.title}
      onChange={HandleForm}
    />
  </div>

  <div>
    <label className="block text-sm font-medium mb-1">
      Image URL
    </label>
    <input
      type="text"
      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      name="image"
      value={formData.image.url}
      onChange={HandleForm}
    />
  </div>

  <div>
    <label className="block text-sm font-medium mb-1">
      Price
    </label>
    <input
      type="number"
      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      name="price"
      value={formData.price}
      onChange={HandleForm}
    />
  </div>

  <div>
    <label className="block text-sm font-medium mb-1">
      Description
    </label>
    <textarea
      className="w-full border rounded px-3 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
      name="description"
      value={formData.description}
      onChange={HandleForm}
    />
  </div>

  <button
    type="submit"
    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
  >
    Add Listing
  </button>

</form>
    )
}