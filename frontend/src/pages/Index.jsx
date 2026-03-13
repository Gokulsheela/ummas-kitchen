// import axios from "axios";
import ProductCard from "../components/product/ProductCard.jsx";
import { useEffect, useState } from "react";
import { getProducts } from "../api/productApi.js";
import ErrorMessage from "../components/product/ErrorMessage.jsx";

function Index() {
  const [products ,setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProducts = async () => {
      try{
          const data = await getProducts();
            setProducts(data)
      } catch(err){
        console.log(err);
        setError(err);
      } finally {
        setLoading(false);
      } 
    };
    fetchProducts();
  }, []);
    if (loading) return <p>Loading....</p>;
    if (error) return <ErrorMessage message={error}/>
    
    

  return (
    <>
    <h1>Products</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ml-2">
      {products.map(product => (
        <ProductCard key={product._id} product={product}/>
      ))}
  </div>
  </>
  );

}
export default Index;