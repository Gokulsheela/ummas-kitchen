import react from "react";
import { Link

 } from "react-router-dom";
const ProductCard = ({ product}) => {
    return (
        <Link to={`/product/${product._id}`} >
            <div className="max-w-sm  p-2  m-4 mb-9">
                <img alt="product picture" src={product.image.url} 
            className="w-full object-cover w-full h-72"
            ></img>
             <h4>{product.title}</h4>
            <p>&#8377;{product.price}</p> 
        </div>
      
        </Link>
        
    );
};
export default ProductCard;