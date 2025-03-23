import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Menu_search.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { food_list } from "../../assets/assets";
import { assets } from "../../assets/assets";
import { CartContext } from "../../CartContext/CartContext";

function Menu_search() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query");

  const { cartItems, addToCart } = useContext(CartContext);
  const [popupMessage, setPopupMessage] = useState(null);

  const filteredFoodList = food_list.filter((food) =>
    food.name.toLowerCase().includes(searchQuery?.toLowerCase() || "")
  );

  const handleAddToCart = (foodId) => {
    if (addToCart) {
      addToCart(foodId);
      const addedFood = food_list.find((food) => food._id === foodId);
      if (addedFood && !popupMessage) {
        setPopupMessage(`เพิ่ม ${addedFood.name} ลงในตะกร้าเรียบร้อย!`);
        setTimeout(() => setPopupMessage(null), 2000);
      }
    }
  };

  const handleOrderNow = (foodId) => {
    if (addToCart) {
      addToCart(foodId);
      navigate("/shopping");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="menu-search-container">
        <div className="word-search">
          <h2>คำที่คุณค้นหา: {searchQuery || "ไม่มีคำค้นหา"}</h2>
        </div>
        <div className="menu-search">
          {filteredFoodList.length > 0 ? (
            filteredFoodList.map((food) => (
              <div key={food._id} className="card-items">
                <div className="card-img">
                  <img src={food.image} alt={food.name} />
                </div>
                <div className="card-detail">
                  <div className="card-name">{food.name}</div>
                  <div className="card-food-detail">{food.description}</div>
                  <div className="card-price">
                    ฿{food.price}
                    <div className="buy-cart">
                      {/* ปุ่มใส่ตะกร้า */}
                      <div
                        className="cart"
                        onClick={() => handleAddToCart(food._id)}
                      >
                        <img src={assets.cart} alt="Cart" />
                        {cartItems[food._id] > 0 && (
                          <div className="cart-dot">{cartItems[food._id]}</div>
                        )}
                      </div>
                      {/* ปุ่มสั่งอาหาร */}
                      <div className="buy" onClick={() => handleOrderNow(food._id)}>
                        สั่งอาหาร
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>ไม่พบรายการสินค้าที่ตรงกับคำค้นหาของคุณ</p>
          )}
        </div>
      </div>

      {/* แสดงข้อความ Pop-up */}
      {popupMessage && (
        <div className="popup-container">
          <div className="popup">{popupMessage}</div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Menu_search;
