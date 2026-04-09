import { useState } from "react";
import { loginUser } from "../../api/authenticationApi";
export default function Login(){
    const [formData, setFormData] = useState({
        email:"",
        password:""
    });
    const handlingSubmit = async(event)=>{
            event.preventDefault();
            try{
                const response = await loginUser(formData);
                console.log(response.message);
                setFormData({
                    email:"",
                    password:""
                })
            }
            catch(err){
                console.log(err);
            }
    }   
    const handlingForm = (event)=> {
            setFormData((currData)=>{
                return {...currData,[event.target.name]:event.target.value}
            })
    }
    return(
        <>
        <div>
            <form onSubmit={handlingSubmit}>
                <div>
                    <label>email</label>
                    <input className="border"
                        placeholder="email"
                        name="email"
                        value={formData.email}
                        onChange={handlingForm}>
                    </input>
                </div>
                    <div>
                        <label>Password</label>
                         <input className="border"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handlingForm}>
                         </input>
                    </div>
                    <button className="border">Login</button>
            </form>
        </div>
        </>
    )
}