import { ConstructionIcon } from "lucide-react";
import axiosClient from "../../../../api/axiosClient";
const token = localStorage.getItem("token");

export const getProducts = async () => {

     const { data } = await axiosClient.get("/products")
     return data.data
  
}
export const getProductById = async (id) => {
  const { data } = await axiosClient.get(`/product/${id}`)
  return data
}

export const addToCart = async(product) =>{
  console.log("inside the addTocart api");
  const {data} = await axiosClient.post(`/cart/addCart`,product);
  return data
}