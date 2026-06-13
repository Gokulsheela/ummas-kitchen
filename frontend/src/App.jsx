import { Routes, Route } from "react-router-dom";
import  ProtectedRoutes  from "./routes/ProtectedRoutes.jsx";
import Index from "./features/product/pages/Index.jsx";
import NewProduct from "./features/product/pages/NewProduct";
import ProductDetails from "./features/product/pages/ProductDetails.jsx"
import EditProduct from "./features/product/pages/EditProduct.jsx";
import NewProductForm from "./features/product/admin/newProductForm.jsx";


ProtectedRoutes

import Login from "./features/auth/pages/Login.jsx";
import Signup from "./features/auth/pages/Signup.jsx";

import Navbar from "./components/navbar/navbar.jsx";

import NewProduct2 from "./features/product/pages/NewProduct2.jsx";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
    <Navbar/>
    <ToastContainer />
    <Routes>
      <Route path="/new2" element = {<NewProductForm/>} />
      {/* <Route path="/" element = { <Index/> } /> */}
      <Route path="/product/:id" element = { <ProductDetails/> } />
      <Route path="/new" element ={ 
        <ProtectedRoutes>  
          <NewProduct/>  
        </ProtectedRoutes> }/>
      <Route path='/edit/:id' element = {
      <ProtectedRoutes>  
         <EditProduct/>
       </ProtectedRoutes> }/>
      <Route path="/login" element = {<Login/>} />
      <Route path="/signup" element = {<Signup/>} />
    </Routes>
    </>
    
  );

}

export default App;