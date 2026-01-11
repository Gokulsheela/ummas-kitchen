import react from "react";
const ProductCard = ({ product}) => {
    return (
        <div>
            <h4>{product.title}</h4>
            <p>${product.price}</p>
        </div>
    );
};
export default ProductCard;