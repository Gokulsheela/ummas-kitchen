import react from "react";
import { Link} from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

console.log("url",API_URL);
const categoryCard = ({ category}) => {
    return (
        <Link to={`/products`} >
            <div className="max-w-sm  p-2  m-4 mb-9">
                <img alt="category picture" src={`${API_URL}${category.thumbnail.url}`} 
            className="w-full object-cover w-full h-72"
            ></img>
             <h4>{category.name}</h4>
        </div>
      
        </Link>
        
    );
};
export default categoryCard;