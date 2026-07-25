import axiosClient from "../../../../api/axiosClient";
const token = localStorage.getItem("token");

export const getProducts = async () => {

     const { data } = await axiosClient.get("/products")
     return data.data
  
}

export const createProduct = async (product) => {
  const token = localStorage.getItem("token");
  console.log("inside the productvariant api");
  const { data } = await axiosClient.post("/product/new", product,{
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return data.data
}

export const createProductVariant = async(payload) => {
  const token = localStorage.getItem("token");
  const { data } = await axiosClient.post("/admin/productVariant/new",payload,{
    headers:{
      Authorization: `Bearer ${token}`
    }
  });
  return data.data;
}