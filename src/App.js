import React from "react";
import { Routes, Route } from "react-router-dom";
import MyNavbar from "./component/MyNavbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import ProductDetails from "./pages/ProductDetails"; 
import EditProduct from "./pages/EditProduct";


function App() {
  return (
    <>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="products" element={<Products />} />
                <Route path="products/add" element={<AddProduct/>} />
        <Route path="products/:id" element={<ProductDetails />} /> 
                <Route path="products/edit/:id" element={<EditProduct />} /> 


      </Routes>
    </>
  );
}

export default App;
