import { Routes, Route } from "react-router-dom"
import Index from "./pages/Index.jsx";
import NewProduct from "./pages/NewProduct";
import Navbar from "./components/navbar/navbar.jsx";
import ProductDetails from "./pages/ProductDetails.jsx"
import EditProduct from "./pages/EditProduct.jsx";
import Login from "./pages/user/login.jsx";
import Signup from "./pages/user/signup.jsx";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
    <Navbar/>
    <ToastContainer />
    <Routes>
      <Route path="/" element = { <Index/> } />
      <Route path="/product/:id" element = { <ProductDetails/> } />
      <Route path="/new" element = { <NewProduct/> } />
      <Route path='/edit/:id' element = { <EditProduct/>} />
      <Route path="/login" element = {<Login/>} />
      <Route path="/signup" element = {<Signup/>} />
    </Routes>
    </>
    
  );

}

export default App;