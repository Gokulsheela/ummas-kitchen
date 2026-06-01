// import { useState } from "react";
// import { loginUser } from "../api";
// export default function Login(){
//     const [formData, setFormData] = useState({
//         email:"",
//         password:""
//     });
//     const handlingSubmit = async(event)=>{
//             event.preventDefault();
//             try{
//                 const response = await loginUser(formData);
//                 console.log(response.message);
//                 setFormData({
//                     email:"",
//                     password:""
//                 })
//             }
//             catch(err){
//                 console.log(err);
//             }
//     }   
//     const handlingForm = (event)=> {
//             setFormData((currData)=>{
//                 return {...currData,[event.target.name]:event.target.value}
//             })
//     }
//     return(
//         <>
//         <div>
//             <form onSubmit={handlingSubmit}>
//                 <div>
//                     <label>email</label>
//                     <input className="border"
//                         placeholder="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handlingForm}>
//                     </input>
//                 </div>
//                     <div>
//                         <label>Password</label>
//                          <input className="border"
//                         type="password"
//                         name="password"
//                         value={formData.password}
//                         onChange={handlingForm}>
//                          </input>
//                     </div>
//                     <button className="border">Login</button>
//             </form>
//         </div>
//         </>
//     )
// }

import { useState } from "react";
import { loginUser } from "../api";
import { getErrorData } from "../../../utils/errorMessage";
import { toast } from "react-toastify"
import { useNavigate ,useLocation} from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
export default function Login() {
  const navigate = useNavigate();
  const { checkAuth } = useAuth();
  const location = useLocation();
  const from = location.state?.from|| "/";

  const [errors, setErrors] = useState({
    email:"",
    password:"",
  });
  const [serverMessage, setServerMessage] = useState("");
  const [loading, setLoading] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handlingSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await loginUser(formData);
      await checkAuth();
      console.log(response.message);
      setFormData({
        email: "",
        password: ""
      });
      console.log("from",from);
      navigate(from, { replace: true });

    } catch (err) {
      const errData = getErrorData(err);
      //field error
      if(errData.errors){
        console.log("Errors Data",errData.errors);
        setErrors({
          email: errData.errors.email || "",
          password: errData.errors.password || "",
          // errorMessage: errData.errors.errorMessage || ""
        });
      };
      // top message
      setServerMessage(errData.message || "something went wrong")
    // netWork error
    if(errData.message ==="Network error"){
      toast.error("Network Error");
    }
    }
    finally{
      setLoading(false);
    };

  };

  const handlingForm = (event) => {

  const { name, value } = event.target;

  // update form data
  setFormData((currData) => ({
    ...currData,
    [name]: value
  }));

  // clear field error
  setErrors((prevErrors) => ({
    ...prevErrors,
    [name]: ""
  }));
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handlingSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Login
        </h2>

        {/* Email */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            className={`border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500
              ${
                errors.email || errors.errorMessage
                ?"border-red-500 focus:ring-red-500"
                :"border-gray-300 focus:ring-green-500"
              }
              `}
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handlingForm}
            type="email"
          />
          {errors.email && (
           <p className="text-red-500 text-sm-1 mt-1">{errors.email}</p>
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
                errors.password || errors.errorMessage
                ?"border-red-500 focus:ring-red-500"
                :"border-gray-300 focus:ring-green-500"
              }
              `}
            type="password"
            name="password"
            value={formData.password}
            onChange={handlingForm}
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
          {errors.errorMessage && (
            <p className="text-red-500 text-sm mt-2 ml-5">{errors.errorMessage}</p>
          )}
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
}