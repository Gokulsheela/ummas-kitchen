import axiosClient from "./axiosClient";

export const createSignupUser = async(formData)=> {
     const {data }= await axiosClient.post("/auth/signup",formData);
     return data;
}
export const loginUser = async(formData)=>{
     console.log("Sending login request", formData);
     const {data} = await axiosClient.post("/auth/login",formData);
     localStorage.setItem("accessToken",data.accessToken);
     localStorage.setItem("refreshToken",data.refreshToken);
     console.log(localStorage);

     return data;
}
export const logoutUser = ()=> {
     localStorage.setItem("token",null);
}