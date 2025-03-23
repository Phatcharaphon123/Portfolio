import React from "react";
import "./Footer.css";
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <p>ติดตามเราผ่านเครือข่ายสังคมออนไลน์ได้ที่:</p>
        <div className="social-icons">
          <a href="#" className="icon"><img src={assets.facebook_icon} alt="" /></a>
          <a href="#" className="icon"><img src={assets.twitter_icon} alt="" /></a>
          <a href="#" className="icon"><img src={assets.instagram_icon} alt="" /></a>
          <a href="#" className="icon"><img src={assets.google_icon} alt="" /></a>
          <a href="#" className="icon"><img src={assets.youtube_icon} alt="" /></a>
        </div>
      </div>
      <div className="footer-content">
        <div className="footer-column">
           <img src={assets.logo_icon} alt="" />
          <div>"เพราะมื้อพิเศษต้องมาพร้อมรสชาติที่ดีที่สุด"</div>
          <div>"เติมเต็มความสุขผ่านความอร่อย"</div>
          <div>"อร่อยทุกคำ สุขใจทุกมื้อ"</div>
          
    
        </div>
        <div className="footer-column">
          <h4>เกี่ยวกับเรา</h4>
          <ul>
            <li>ประวัติของเรา</li>
            <li>ข่าวสารและกิจกรรม</li>
            <li>เครือข่าย</li>
            <li>ร่วมงานกับเรา</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>บริการช่วยเหลือ</h4>
          <ul>
            <li>คำถามที่พบบ่อย</li>
            <li>คำแนะนำและคู่มือการใช้บริการ</li>
            <li>นโยบายและความเป็นส่วนตัว</li>
            <li>แนะนำเว็บไซต์</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>ติดต่อเราได้ที่</h4>
          <ul>
            <li>📌 48/99 มบ.พฤกษา3 จ.นนทบุรี </li>
            <li>📧 phatcharaphon.y@gmail.com</li>
            <li>📞 086-342-7425</li>
            <li>📠 02-123-4567</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 Copyright: FoodTamsunk.com</p>
      </div>
    </footer>
  );
};

export default Footer;
