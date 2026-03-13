import axios from "axios";
import { useParams } from "react-router-dom";
import { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { updateProduct ,getProductById} from "../api/productApi.js"
export default function EditformData() {
    const [ formData, setFormData ] = useState({
            title:"",
            image:{ url:"" },
            price:"",
            description:""
    });
    const navigate = useNavigate();
    const {id} =useParams();

    useEffect(()=>{
        const fetch = async()=> {
            try{

                 const response = await getProductById(id)
               console.log(response);
           setFormData(response);
            }
            catch(error){
                console.log(error);
            }
           
           
        }
        fetch();
    },[]);
 
    const HandleSubmit = async(event)=> {
            event.preventDefault();
            await updateProduct(id,formData);
        
            setFormData({
                title:"",
                image:"",
                price:"",
                description:""
            });
        navigate(`/product/${id}`);
    }
    function HandleForm(event){
        setFormData((currData)=>{
            return {...currData,[event.target.name]: event.target.value}
        })

    }
 
    return (
        <form onSubmit={HandleSubmit}>
            <input type="text" className="border"
                name="title"
                value={formData.title}
                onChange={HandleForm}
            /> <br></br>
            <input type="text" className="border"
            name="image"
            value={formData.image.url}
            onChange={HandleForm}
            /><br></br>
            <input type="number" className="border"
            name="price"
            value={formData.price}
            onChange={HandleForm}
            />
            <br></br>
            <textarea className="border"
                name="description"
                value={formData.description}
                onChange={HandleForm}
            > </textarea>
        <button className="border">Add Listing</button>
        </form>
    )
}