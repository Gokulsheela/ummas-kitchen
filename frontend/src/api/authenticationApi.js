import axiosClient from "./axiosClient";

export const createSignupUser = async(formData)=> {
     const {data }= await axiosClient.post("/signup",formData);
     return data;
}
export const loginUser = async(formData)=>{
     const {data} = await axiosClient.post("/login",formData);
     localStorage.setItem("accessToken",data.acessToken);
     localStorage.setItem("refreshToken",data.refreshToken);
      console.log("refresh token:", data.refreshToken, "access token",data.acessToken);

     return data;
}
export const logoutUser = ()=> {
     localStorage.setItem("token",null);
}