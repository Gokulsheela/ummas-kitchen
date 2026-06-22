import { Routes, Route } from "react-router-dom";

import  ProtectedRoutes  from "./routes/ProtectedRoutes.jsx";
import Index from "./features/product/customer/pages/index.jsx";
import NewProduct from "./features/product/pages/NewProduct";
import ProductDetails from "./features/product/pages/ProductDetails.jsx"
import EditProduct from "./features/product/pages/EditProduct.jsx";

import Dashboard from "./features/product/admin/Dashboard.jsx";
import NewProductForm from "./features/product/admin/newProductForm.jsx";
import NewCategoryForm from "./features/product/admin/newCategory.jsx";
import NewProductVarientForm from "./features/product/admin/newProductVarient.jsx";
ProtectedRoutes

import Login from "./features/auth/pages/Login.jsx";
import Signup from "./features/auth/pages/Signup.jsx";

import Navbar from "./components/navbar/navbar.jsx";

import NewProduct2 from "./features/product/pages/NewProduct2.jsx";

import Category from "../src/features/product/customer/categorySelection.jsx";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
    <Navbar/>
    <ToastContainer />
   
    <Routes>
      <Route path="/admin/dashboard" element= {<Dashboard/>} />
        <Route path="/admin/products/new" element = {<NewProductForm/>} />
       <Route path="/admin/categories/new" element= {<NewCategoryForm/>} />
       <Route path="/admin/variants/new" element= {<NewProductVarientForm/>} />
       <Route path ="/products" element= {<Index/>} />
       <Route path="/category" element= {<Category/>} />
     
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