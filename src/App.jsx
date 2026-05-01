import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import ProductCard from "./components/ProductCard";
import CartProvider from "./context/CartContext";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import Footer from "./components/Footer";
import CategoryPage from "./pages/CategoryPage";
import ScrollToTop from "./components/ScrollToTop";
import Signup from "./pages/Signup";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import SearchingElements from "./components/SearchingElements";
function App() {
  const [search, setSearch] = useState("");
  return (
    <div className="app-wrapper">
      <CartProvider>
        <ScrollToTop />
        <Navbar search={search} setSearch={setSearch} />
        <SearchingElements search={search} setSearch={setSearch} />
        <div className="main-container" style={{ minHeight: "198.3px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="signup" element={<Signup />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </CartProvider>
    </div>
  );
}

export default App;
