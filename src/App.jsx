import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
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
import Wishlist from "./pages/Wishlist";
import WishlistProvider from "./context/WishlistContext";
import RequireAuth from "./components/RequireAuth";

function App() {
  const [search, setSearch] = useState("");
  return (
    <div className="app-wrapper">
      <CartProvider>
        <WishlistProvider>
          <ScrollToTop />
          <Navbar search={search} setSearch={setSearch} />
          <SearchingElements search={search} setSearch={setSearch} />

          <div className="main-container" style={{ minHeight: "230.3px" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/cart"
                element={
                  <RequireAuth pageName="Cart">
                    <Cart />
                  </RequireAuth>
                }
              />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/category/:category" element={<CategoryPage />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/wishlist"
                element={
                  <RequireAuth pageName="Wishlist">
                    <Wishlist />
                  </RequireAuth>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </WishlistProvider>
      </CartProvider>
    </div>
  );
}

export default App;
