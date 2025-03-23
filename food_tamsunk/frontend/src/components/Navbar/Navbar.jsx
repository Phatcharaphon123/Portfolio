import React, { useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      return;
    }
    navigate(`/menu_search?query=${encodeURIComponent(searchQuery)}`);
  };

  const handleHomeClick = () => {
    navigate("/");
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 100);
  };

  const handleMenuSelect = () => {
    navigate("/");
    setTimeout(() => {
      window.scrollTo({
        top: window.innerHeight / 1.15,
        behavior: "smooth",
      });
    }, 100);
  };

  const handleContactClick = () => {
    navigate("/");
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }, 100);
  };

  const handleAboutClick = () => {
    navigate("/about");
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 100);
  };

  const handleShoppingIconClick = () => {
    navigate("/shopping");
  };

  return (
    <nav className="nav-container" aria-label="Main navigation">
      <div className="logo">
        <img src={assets.logo_icon} alt="" />
      </div>

      <div className="nav-links">
        <div className="link">
          <ul>
            <li>
              <a href="#home" onClick={handleHomeClick}>
                <img src={assets.home_icon} alt="Home" className="nav-icon" />
                หน้าหลัก
              </a>
            </li>
            <li>
              <a href="#menu" onClick={handleMenuSelect}>
                <img src={assets.menu_icon} alt="Menu" className="nav-icon" />
                เมนูอาหาร
              </a>
            </li>
            <li>
              <a href="#about" onClick={handleAboutClick}>
                <img src={assets.about_icon} alt="About" className="nav-icon" />
                เกี่ยวกับเรา
              </a>
            </li>
            <li>
              <a href="#contact" onClick={handleContactClick}>
                <img src={assets.contact_icon} alt="Contact" className="nav-icon" />
                ติดต่อ
              </a>
            </li>
          </ul>
        </div>
        <div className="search-box">
          <div className="search-container">
            <input
              type="text_search"
              placeholder="ค้นหาด้วยชื่ออาหาร,หรือค้นหาด้วยคำ"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="search-button" onClick={handleSearch}>
              <img src={assets.search_icon} alt="Search Icon" />
            </button>
          </div>
        </div>
      </div>
      <div className="user-menu-not-login">
        <div className="shopping-icon" onClick={handleShoppingIconClick}>
          <img src={assets.shopping_icon} alt="Shopping-icon" />
          <div className="dot"></div>
        </div>
        <Link to="/login">
          <button className="login-button">เข้าสู่ระบบ</button>
        </Link>
        <Link to="/register">
          <button className="register-button">สมัครสมาชิก</button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
