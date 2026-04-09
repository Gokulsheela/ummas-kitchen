import axiosClient from "./axiosClient";
const token = localStorage.getItem("token");

export const getProducts = async () => {
  const { data } = await axiosClient.get("/products")
  return data.data
}

export const getProductById = async (id) => {
  const { data } = await axiosClient.get(`/product/${id}`)
  return data.data
}

export const createProduct = async (product) => {
  const { data } = await axiosClient.post("/product/new", product,{
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return data.data
}

export const updateProduct = async (id, product) => {
  console.log(id);
  console.log(product);
  const { data } = await axiosClient.put(`/product/${id}/update`, product)
  return data.data
}

export const deleteProduct = async (id) => {
  const { data } = await axiosClient.delete(`product/${id}`)
  return data
}