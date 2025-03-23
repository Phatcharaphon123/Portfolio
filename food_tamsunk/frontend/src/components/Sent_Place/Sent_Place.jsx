import React, { useContext } from "react";
import "./Sent_Place.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { CartContext } from "../../CartContext/CartContext";

function Sent_Place() {
  const { getTotalCartAmount, getGrandTotal } = useContext(CartContext);

  const subtotal = getTotalCartAmount();
  const grandTotal = getGrandTotal();

  return (
    <div>
      <Navbar />
      <div className="sent-place-container">
        <div className="form-section">
          <div className="left-box">
            <h2>ข้อมูลผู้รับ</h2>
            <div className="form-row">
              <input type="text" placeholder="ชื่อจริง" required />
              <input type="text" placeholder="นามสกุล" required />
            </div>
            <input type="email" placeholder="อีเมล" required />
            <input
              type="text"
              placeholder="ที่อยู่ (เช่น เลขที่บ้าน, หมู่บ้าน)"
              required
            />
            <div className="form-row">
              <input type="text" placeholder="ตำบล/แขวง" required />
              <input type="text" placeholder="อำเภอ/เขต" required />
            </div>
            <div className="form-row">
              <input type="text" placeholder="รหัสไปรษณีย์" required />
              <input type="text" placeholder="ประเทศ" required />
            </div>
            <input type="text" placeholder="เบอร์โทรศัพท์" required />
          </div>
        </div>

        <div className="right-box">
          <div className="right-box1">
            <h2>สรุปรายการ</h2>
            <div className="summary-row">
              <p>ยอดรวมย่อย:</p>
              <p>฿{subtotal.toFixed(2)}</p>
            </div>
            <div className="summary-row total">
              <p>ยอดรวมทั้งหมด (รวม VAT):</p>
              <p>฿{grandTotal.toFixed(2)}</p>
            </div>
          </div>

          <div className="right-box2">
            <h2>วิธีการชำระเงิน</h2>
            <div className="payment-method">
              <label>
                <input type="radio" name="payment" value="cod" defaultChecked />
                เก็บเงินปลายทาง (COD)
              </label>
              <label>
                <input type="radio" name="payment" value="credit" />
                ชำระด้วยบัตรเครดิต/เดบิต
              </label>
              <label>
                <input type="radio" name="payment" value="credit" />
                ชำระด้วย QR Code/Promtpay
              </label>
            </div>
          </div>

          <div className="right-box-button">
            <button id="paybutton" type="submit" className="paybutton-">
              ยืนยันการสั่งซื้อ
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Sent_Place;
