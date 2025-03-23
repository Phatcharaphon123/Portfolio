import React from 'react';
import './Login.css';
import { useNavigate, Link } from 'react-router-dom'; 
import { assets } from '../../assets/assets';

function Login() {
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
          <h1>เข้าใช้เว็บไซต์ของเรา</h1>
        </div>
        <div className='login-box'>
          <form>
            <label>
              อีเมล*
              <input type="text" name="username" />
            </label>
            <br />
            <label>
              รหัสผ่าน*
              <input type="password" name="password" />
            </label>
            <br />
            <button type="submit">ลงชื่อเข้าใช้</button>
          </form>
          <div className="to-register">
            <p>ยังไม่มีบัญชีผู้ใช้? <Link to='/register'>สมัครสมาชิก</Link> ที่นี้</p>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 Copyright: FoodTamsunk.com</p>
      </div>
    </div>
  );
}

export default Login;
