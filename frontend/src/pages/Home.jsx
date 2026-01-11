import axios from "axios";
import ProductCard from "../components/product/ProductCard";
import { useEffect, useState } from "react";

function Home() {
  const [products ,setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("http://localhost:3000/products");
      setProducts(response.data)
    };
    fetchProducts();
  }, []);

  return (
     <div>
      <h1>Products</h1>
      {products.map(product => (
        <ProductCard key={product._id} product={product}/>
          
      ))}
  </div>
  );

}
export default Home;