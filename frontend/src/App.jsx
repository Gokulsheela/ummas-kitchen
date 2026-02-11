import { Routes, Route } from "react-router-dom"
import Index from "./pages/Index.jsx";
import NewProduct from "./pages/NewProduct";
import Navbar from "./components/navbar/navbar.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
function App() {
  return (
    <>
    <Navbar/>

    <Routes>
      <Route path="/" element = { <Index/> } />
      <Route path="/product/:id" element = { <ProductDetails/> } />
      <Route path="/new" element = { <NewProduct/> } />
    </Routes>
    </>
    
  );

}

export default App;