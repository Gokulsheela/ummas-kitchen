import axios from "axios";
import ProductCard from "../components/product/ProductCard";
import { useEffect, useState } from "react";

function Index() {
  const [products ,setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("http://localhost:3000/products");
      setProducts(response.data)
    };
    fetchProducts();
  }, []);

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