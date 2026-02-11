import axios, { formToJSON } from "axios";
import {useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";

function NewProduct() {
    const navigate = useNavigate();
    let [ formData, setFormData ] = useState({
        title :"",
        price :"",
        image :"",
        description :""
    });
    const HandlingForm = (event)=> {
        setFormData((currData)=> {
            return {...currData, [event.target.name ]:event.target.value}
        })
    }
    const HandlingSubmit = async(event)=> {
        event.preventDefault();
          await axios.post("http://localhost:3000/product/new",formData);
         console.log(formData,"hu");
         console.log("fomr");
        setFormData({title :"",
        price :"",
        image :"",
        description :""});
        navigate("/");
    }
    return (
        <>
        <h1>ADD NEW LISTING</h1><br></br>
   <form onSubmit={HandlingSubmit}>
    <input className="border"
        placeholder="Product Name"
        value={formData.name}
        type="text"
        name="title"
        onChange={HandlingForm}
    /> <br></br>
    <input className="border"
        placeholder="select your file" 
        value={formData.image}
        name="image"
        onChange={HandlingForm}
        type="text"/><br></br>
    <input className="border"
        placeholder="price"
        value={formData.price}
        name="price"
        onChange={HandlingForm}
        type="number"/><br></br><br></br>
    <textarea className="border h=12" 
        value={formData.description}
        name="description"
        onChange={HandlingForm}
        placeholder="write the product description here"
    /><br></br>
    <button type="submit" className="border">Enter</button>
   </form>
        </>
    )
}
export default NewProduct;