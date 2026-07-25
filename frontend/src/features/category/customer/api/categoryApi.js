import axiosClient from "../../../../api/axiosClient";
const token = localStorage.getItem("token");

export const getCategory = async () => {

     const { data } = await axiosClient.get("/category");
     return data.data
  
}

