import { useState } from "react";
import { createProduct } from "../api";
export default function NewProduct2(){
    const [formData, setFormData ] = useState({
       productId:"",
        sku:"",
        parentCategoryId:""
    })
    const HandlingForm = (event)=>{
        
        setFormData((currData)=>{
            return {...currData,[event.target.name]: event.target.value}
        });
    };
    const HandlingSubmit = async (event)=> {
        event.preventDefault();
       await createProduct(formData);
        setFormData(
          {
           productId:"",
        sku:""
        }
        )
    }
    return(
        <>
        <h1>THIS IS A PRODUCT FORM PAGE</h1>
        <form className="border mt-2  mx-20"
            onSubmit={HandlingSubmit}
        >
            <div>
                <input 
                type="text" 
                name="productId"
                placeholder="name" 
                value={formData.name}
                onChange={HandlingForm}
                />
            </div>
            <div>
                <input 
                type="text"
                name="sku"
                 placeholder="sku"
                 value={formData.sku}
                 onChange={HandlingForm}
                  />
            </div>
            <div>
                <input 
                type="text"
                name="size"
                 placeholder="size"
                 value={formData.size}
                 onChange={HandlingForm}
                  />
            </div>
            <div>
                <input 
                type="text"
                name="color"
                 placeholder="color"
                 value={formData.color}
                 onChange={HandlingForm}
                  />
            </div>
            
            
            <button className="border" type="submit">Submit</button>
        </form>
        </>
    )
};