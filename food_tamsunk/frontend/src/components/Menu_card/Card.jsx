import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../CartContext/CartContext";
import "./Card.css";
import { food_list } from "../../assets/assets";
import { assets } from "../../assets/assets";

function Card({ selectedCategory }) {
  const { cartItems, addToCart } = useContext(CartContext);
  const [popupMessage, setPopupMessage] = useState(null); // ใช้สำหรับเก็บข้อความป๊อปอัป
  const navigate = useNavigate();

  const filteredFoodList = selectedCategory
    ? food_list.filter((food) => food.category === selectedCategory)
    : food_list;

  const handleAddToCart = (foodId) => {
    if (addToCart) {
      addToCart(foodId); // เพิ่มสินค้าในตะกร้า
      const addedFood = food_list.find((food) => food._id === foodId); // หาอาหารที่ถูกเพิ่ม
      if (addedFood && !popupMessage) {
        setPopupMessage(`เพิ่ม ${addedFood.name} ลงในตะกร้าเรียบร้อย!`);
        setTimeout(() => setPopupMessage(null), 2000); // ซ่อนข้อความหลัง 2 วินาที
      }
    }
  };

  const handleOrderNow = (foodId) => {
    if (addToCart) {
      addToCart(foodId); // เพิ่มสินค้าในตะกร้า
      navigate("/shopping"); // ไปยังหน้าตะกร้าสินค้า
    }
  };

  return (
    <div className="card-container">
      <h2>Top dishes near you</h2>
      <div className="card-display">
        {filteredFoodList.map((food) => (
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
                  <div className="cart" onClick={() => handleAddToCart(food._id)}>
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
        ))}
      </div>

      {/* แสดงข้อความป๊อปอัป */}
      {popupMessage && (
        <div className="popup-container">
          <div className="popup">{popupMessage}</div>
        </div>
      )}
    </div>
  );
}

export default Card;
