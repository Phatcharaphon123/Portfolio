import React from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';

function Register() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/'); // เปลี่ยนเส้นทางไปที่หน้าแรก
  };
  return (
    <div className='login-page'>
      <div className="login-nav">
        <div className="button-back">
          <button className="styled-button" onClick={handleBack}>
            <img src={assets.arrow_icon} alt="back" className="arrow-icon" />
            ย้อนกลับ
          </button>
        </div>
        <div className="login-logo">
          <img src={assets.logo_icon} alt="logo" className="logo-icon" />
        </div>
      </div>
      <div className="login">
        <div className="login-header">
          <img src={assets.logo_icon} alt="" />
          <h1>สมัครสมาชิกเข้าใช้เว็บไซต์ของเรา</h1>
        </div>
        <div className='login-box'>
          <form>
            <label>
              ชื่อ*
              <input type="text" name="username" />
            </label>
            <br />
            <label>
              อีเมล*
              <input type="text" name="username" />
            </label>
            <br />
            <label>
              รหัสผ่าน*
              <input type="password" name="password" />
            </label>
            <div className="terms-container">
              <label className="terms-label">
                <input type="checkbox" name="acceptTerms" />
                โดยการเปิดบัญชี ท่านรับทราบและตกลงตาม
                เงื่อนไขการให้บริการ & นโยบายความเป็นส่วนตัว
              </label>
            </div>
            <br />
            <button type="submit">สมัครสมาชิก</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 Copyright: FoodTamsunk.com</p>
      </div>
    </div>
  );
}

export default Register;
