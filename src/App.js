import React, {useEffect, useState} from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import './App.css';
import ListUsers from "./ListUsers";
import Nav from "./Nav";
import CreateUser from "./CreateUser";
import Edit from './Edit';
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct";
import ListProducts from "./pages/ListProducts";

function App() {
  return (
    <BrowserRouter>
      <Nav/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<ListUsers />} />
        <Route path='/create-user' element={<CreateUser/>} />
        <Route path='/edit/:id' element={<Edit/>} />
        <Route path='/create-product' element={<CreateProduct/>} />
        <Route path='/edit-product/:id' element={<EditProduct/>} />
        <Route path='/products' element={<ListProducts/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

