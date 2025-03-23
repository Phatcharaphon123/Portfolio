import React, { useContext } from "react";
import "./Shopping.css";
import { CartContext } from "../../CartContext/CartContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Shopping = () => {
  const { cartItems, food_list, removeFromCart, addToCart, getTotalCartAmount } =
    useContext(CartContext);
  const navigate = useNavigate();

  const totalAmount = getTotalCartAmount() || 0;
  const vat = totalAmount * 0.07;
  const grandTotal = totalAmount + vat;

  const incrementItem = (foodId) => {
    addToCart(foodId); // เพิ่มจำนวนสินค้าในตะกร้า
  };

  const decrementItem = (foodId) => {
    if (cartItems[foodId] > 1) {
      removeFromCart(foodId); // ลดจำนวนสินค้าในตะกร้า
    }
  };

  return (
    <div>
      <Navbar />
      <div className="incart">
        <div className="incart-items">
          <div className="incart-items-title">
            <p>สินค้า</p>
            <p>ชื่อ</p>
            <p>ราคา</p>
            <p>จำนวน</p>
            <p>รวม</p>
            <p>ลบ</p>
          </div>
          <br />
          <hr />
          {food_list && food_list.length > 0 ? (
            food_list.map((item) => {
              if ((cartItems[item._id] || 0) > 0) {
                return (
                  <div key={item._id}>
                    <div className="incart-items-title incart-items-item">
                      <img src={item.image} alt={item.name} />
                      <p>{item.name}</p>
                      <p>฿{item.price}</p>
                      <div className="quantity-controls">
                        <button onClick={() => decrementItem(item._id)}>-</button>
                        <span>{cartItems[item._id]}</span>
                        <button onClick={() => incrementItem(item._id)}>+</button>
                      </div>
                      <p>฿{item.price * cartItems[item._id]}</p>
                      <p
                        className="incart-items-remove-icon"
                        onClick={() => removeFromCart(item._id)}
                      >
                        x
                      </p>
                    </div>
                    <hr />
                  </div>
                );
              }
              return null;
            })
          ) : (
            <p>รถเข็นของคุณว่างเปล่า!</p>
          )}
        </div>
        <div className="incart-bottom">
          <div className="incart-total">
            <h2>ยอดรวมรถเข็น</h2>
            <div>
              <div className="incart-total-details">
                <p>ยอดรวมย่อย</p>
                <p>฿{totalAmount}</p>
              </div>
              <hr />
              <div className="incart-total-details">
                <p>ภาษีมูลค่าเพิ่ม (VAT 7%)</p>
                <p>฿{vat.toFixed(2)}</p>
              </div>
              <hr />
              <div className="incart-total-details">
                <b>ยอดรวมทั้งหมด</b>
                <b>฿{grandTotal.toFixed(2)}</b>
              </div>
            </div>
            <button onClick={() => navigate("/sent_place")}>
              ไปยังหน้าจัดส่งสินค้า
            </button>
          </div>
          <div className="incart-promocode">
            <div>
              <p>หากคุณมีรหัสโปรโมชั่น กรุณากรอกที่นี่</p>
              <div className="incart-promocode-input">
                <input type="text_promocode" placeholder="รหัสโปรโมชั่น" />
                <button>ส่ง</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Shopping;
