import axiosClient from "../../../../api/axiosClient";

export const createProductCategory = async (product)=> {
  const {data} = await axiosClient.post("/newProductCategory",product);
 
  return data
}