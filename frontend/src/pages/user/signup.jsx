import { useState } from "react"
import { createSignupUser } from "../../api/authenticationApi.js"
import { createProduct } from "../../api/productApi.js";
export default function signup(){
    const [formData, setFormData ] = useState({
    email : "",
    password : ""
});
    const handleForm = (event)=> {
        setFormData((currData)=> {
            return{ ...currData,[event.target.name] : event.target.value};
        })
    };
    const HandlingSubmit = async (event) => {
        event.preventDefault();
        try{
           
         const response= await  createSignupUser(formData);
          console.log(response.message);
        setFormData({
         email: "",
          password: "",
        });
        } catch(err){
          console.log(err);
        } 
        
      };
    

    return (
        <>
            <h1>This Is A Signup page</h1>
            <form onSubmit={HandlingSubmit}>
                <div>
                    <label>Email</label>
                    <input className="border"
                    type="text"
                    placeholder="Enter Email" 
                    name="email"
                    value={formData.email}
                    onChange={handleForm}
                    >
                     </input>
                 </div>
                 <div>
                    <label>Password</label>
                    <input className="border"
                        type="password" 
                        name="password"
                        value={formData.password}
                        onChange={handleForm}
                        > </input>
                 </div>
                <button className="border">Signup</button>
            </form>

        </>
    )
}
