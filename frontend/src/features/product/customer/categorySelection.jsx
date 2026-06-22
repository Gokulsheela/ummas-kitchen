// import axios from "axios";
import CategoryCard from "../components/categoryCard.jsx";
import { useEffect, useState } from "react";
import { getCategory } from "./api/categoryApi.js";
import BottomNav from "../../../components/navbar/ui/navigation/BottomNav.jsx";
// import ErrorMessage from "../components/";

function Category() {
  const [category ,setCategory] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCategory = async () => {
      try{
          const data = await getCategory();
            setCategory(data)
      } catch(err){
        console.log(err);
        setError(err);
      } finally {
        setLoading(false);
      } 
    };
    fetchCategory();
  }, []);
    if (loading) return <p>Loading....</p>;
    // if (error) return <ErrorMessage message={error}/>
    
    

  return (
    <>
    <h1>Category</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ml-2">
      {category.map(category => (
        <CategoryCard key={category._id} category={category}/>
      ))}
  </div>
  <BottomNav/>
  </>
  );

 }
export default Category;