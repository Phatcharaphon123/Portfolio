import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./CartContext/CartContext";
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header";
import Menu from "./components/Menu/Menu";
import Footer from "./components/Footer/Footer";
import Card from "./components/Menu_card/Card";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Menu_search from "./components/Menu_search/Menu_search";
import About from "./components/About/About";
import Shopping from "./components/Shopping/Shopping";
import Sent_Place from "./components/Sent_Place/Sent_Place";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Header />
                <Menu onSelectCategory={setSelectedCategory} />
                <Card selectedCategory={selectedCategory} />
                <Footer />
              </>
            }
          />
          <Route path="/menu_search" element={<Menu_search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/shopping" element={<Shopping />} />
          <Route path="/sent_place" element={<Sent_Place />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
