import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../api/productApi.js";
import { toast } from "react-toastify";

function NewProduct() {
  const navigate = useNavigate();
  const [ loading, setLoading ] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    image: "",
    description: "",
  });

  const HandlingForm = (event) => {
    setFormData((currData) => {
      return { ...currData, [event.target.name]: event.target.value };
    });
  };

  const HandlingSubmit = async (event) => {
    event.preventDefault();
    try{
        setLoading(true);
        // await new Promise(resolve => setTimeout(resolve, 3000));
      await createProduct(formData);
    toast.success("Product updated successfully");

    setFormData({
      title: "",
      price: "",
      image: "",
      description: "",
    });

    navigate("/");
    } catch(err){
      console.log(err);
    } finally{
      setLoading(false);
    }
    
  };

  return (
    <div className="max-w-lg mx-auto mt-12 bg-white shadow-lg rounded-lg p-8">

      <h1 className="text-2xl font-bold mb-6 text-center">
        Add New Product
      </h1>

      <form onSubmit={HandlingSubmit} className="space-y-4">

        <div>
          <label className="block text-sm font-medium mb-1">
            Product Name
          </label>
          <input
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Product Name"
            value={formData.title}
            type="text"
            name="title"
            onChange={HandlingForm}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Image URL
          </label>
          <input
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Paste image url"
            value={formData.image}
            name="image"
            type="text"
            onChange={HandlingForm}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Price
          </label>
          <input
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="price"
            value={formData.price}
            type="number"
            onChange={HandlingForm}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            className="w-full border rounded px-3 py-2 h-28 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.description}
            name="description"
            onChange={HandlingForm}
            placeholder="Write the product description here"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {loading ? "Adding product " : "Add product"}
        </button>

      </form>
    </div>
  );
}

export default NewProduct;