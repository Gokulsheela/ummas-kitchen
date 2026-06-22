import axiosClient from "../../../../api/axiosClient";
const token = localStorage.getItem("token");

export const getProducts = async () => {

     const { data } = await axiosClient.get("/products")
     return data.data
  
}