import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import  ProtectedRoutes  from "./routes/ProtectedRoutes.jsx";

import Login from "./features/auth/pages/Login.jsx";
import Signup from "./features/auth/pages/Signup.jsx";


import ProductList from "./features/product/customer/pages/productList.jsx";
import ProductDetails from "./features/product/customer/pages/productDetails.jsx"
import Category from "./features/category/customer/pages/genderSelection.jsx";

import Dashboard from "./features/dashboard/pages/Dashboard.jsx";
import NewProductForm from "./features/product/admin/pages/newProductForm.jsx";
import NewCategoryForm from "./features/category/admin/pages/newCategory.jsx";
import NewProductVarientForm from "./features/product/admin/pages/newProductVarient.jsx";
ProtectedRoutes

import Navbar from "../src/shared/components/navbar.jsx";
import CartPage from "../src/features/cart/pages/CartPage.jsx"



function App() {
  return (
    <>
    <Navbar/>
    <ToastContainer />
   
    <Routes>
      <Route path="/admin/dashboard" element= {
        <ProtectedRoutes>
          <Dashboard/>
          </ProtectedRoutes>} />
       <Route path="/admin/products/new" element = {<NewProductForm/>} />
       <Route path="/admin/categories/new" element= {<NewCategoryForm/>} />
       <Route path="/admin/variants/new" element= {<NewProductVarientForm/>} />

       <Route path="/category" element= {<Category/>} />
       <Route path ="/products" element= {<ProductList/>} />
       <Route path="/product/:id" element = { <ProductDetails/> } />
      
       <Route path="/cart" element = {<CartPage/>} />
       <Route path="/login" element = {<Login/>} />
       <Route path="/signup" element = {<Signup/>} />
    </Routes>
    </>
    
  );

}

export default App;