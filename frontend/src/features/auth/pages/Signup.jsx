// import { useState } from "react"
// import { createSignupUser } from "../api.js"
// export default function signup(){
//     const [formData, setFormData ] = useState({
//     email : "",
//     password : ""
// });
//     const handleForm = (event)=> {
//         setFormData((currData)=> {
//             return{ ...currData,[event.target.name] : event.target.value};
//         })
//     };
//     const HandlingSubmit = async (event) => {
//         event.preventDefault();
//         try{
           
//          const response= await  createSignupUser(formData);
//             console.log(response.message);
//         setFormData({
//          email: "",
//           password: "",
//         });
//         } catch(err){
//           console.log(err);
//         } 
        
//       };
    
//     return (
//         <>
//             <h1>This Is A Signup page</h1>
//             <form onSubmit={HandlingSubmit}>
//                 <div>
//                     <label>Email</label>
//                     <input className="border"
//                     type="text"
//                     placeholder="Enter Email" 
//                     name="email"
//                     value={formData.email}
//                     onChange={handleForm}
//                     >
//                      </input>
//                  </div>
//                  <div>
//                     <label>Password</label>
//                     <input className="border"
//                         type="password" 
//                         name="password"
//                         value={formData.password}
//                         onChange={handleForm}
//                         > </input>
//                  </div>
//                 <button className="border">Signup</button>
//             </form>

//         </>
//     )
// }


import { useState } from "react";
import { createSignupUser } from "../api/authApi.js";
import { toast } from "react-toastify";
import { getErrorData } from "../../../utils/errorMessage.js";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [loading, setLoading ] = useState(false); 
  const [serverMessage, setServerMessage ] = useState("");

  const [errors,setErrors] = useState({
    email:"",
    password:"",
  });
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleForm = (event) => {
    setFormData((currData) => {
      return { ...currData, [event.target.name]: event.target.value };
    });
  };

  const HandlingSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setServerMessage("");
    setErrors({
      email: "",
      password: ""    });

    try {
      const response = await createSignupUser(formData);
      console.log(response.message);
      toast.success(response.message);

      setFormData({
        email: "",
        password: ""
      });
      setErrors({});
      navigate("/");
    } catch (error) {
      const errData = getErrorData(error);
      console.log("erroData+++",errData);
       
      //field error
      if(errData.errors){
        setErrors({
          email: errData.errors.email || "",
          password: errData.errors.password || ""
        });
      };
      //top errors
      setServerMessage(errData.message || "Something went wrong");
      
      //netWork or server error
      if(errData.message === "NETWORK_ERROR"){
        toast.error("Network error");
      }
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={HandlingSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6"
      >
        <h2>{
            serverMessage && (
              <p>{serverMessage}</p>
            )
          }</h2>
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Create Account
        </h2>

        {/* Email */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            className={`border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500
            ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-green-500"
              }`}
            type="email"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleForm}
          />
           {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email}
            </p>
          )}

        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            className={`border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500
              ${
                errors.password
                ?"border-red-500 focus:ring-red-500"
                :"border-gray-300 focus:ring-green-500"
              }
              `}
            type="password"
            placeholder="Create a password"
            name="password"
            value={formData.password}
            onChange={handleForm}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password}
            </p>)
          
          }
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-200"
        >
          Sign Up
        </button>

        
   
   

        {/* Optional Login Redirect */}
        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <span className="text-green-600 cursor-pointer hover:underline">
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
