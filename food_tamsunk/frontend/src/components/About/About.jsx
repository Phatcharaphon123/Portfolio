import React, { useRef } from "react";
import { assets } from "../../assets/assets";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./About.css";

function About() {
  const exploreRef = useRef(null);
  const handleExploreClick = () => {
    const offset = window.innerHeight * 0.15;  
    const targetPosition = exploreRef.current.offsetTop - offset;  

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",  // เลื่อนแบบ smooth
    });
  };

  return (
    <div>
      <Navbar />
      <div className="about-container">
        <div className="head-about">
          <div className="head-bout-box1">
            <div className="history-head-text">
              <h1>ประวัติความเป็นมาของร้านเรา</h1>
            </div>
            <div className="history-text">
              ร้านของเราเริ่มต้นจากความหลงใหลในรสชาติอาหารที่ดีและความสุขในการรับประทานอาหาร
              ก่อตั้งขึ้นในปี พ.ศ. 2564 ด้วยเป้าหมายในการนำเสนอเมนูคุณภาพสูง
              ทีมงานของเราทุ่มเทในการคัดสรรวัตถุดิบที่สดใหม่และใส่ใจในทุกขั้นตอนการทำอาหาร
              เราเติบโตขึ้นพร้อมกับการสนับสนุนจากลูกค้า
              และไม่เคยหยุดพัฒนาเพื่อตอบสนองความต้องการที่หลากหลาย
              ทุกเมนูถูกออกแบบมาอย่างสร้างสรรค์ในบรรยากาศที่อบอุ่น
              จากวันแรกจนถึงวันนี้เรามุ่งมั่นที่จะสร้างความประทับใจในทุกมื้ออาหารของคุณ
              นอกจากนี้เรามีความภูมิใจที่ได้เป็นส่วนหนึ่งของความสุขในชีวิตประจำวันของลูกค้าทุกคน
              เรายังคงมุ่งมั่นที่จะพัฒนาร้านของเราให้เติบโตอย่างยั่งยืนและพร้อมตอบสนองต่อความต้องการของลูกค้าอย่างไม่มีที่สิ้นสุด
            </div>
            <div className="history-button" onClick={handleExploreClick}>
              สำรวจ
            </div>
          </div>
          <div className="head-about-box2">
            <img src={assets.about1} alt="" />
          </div>
        </div>

        {/* ส่วนของการบริการ */}
        <section className="service" ref={exploreRef}>
          <h1>บริการพิเศษของเรา</h1>
          <p>เรามีบริการพิเศษที่จะทำให้การมาที่ร้านของคุณสะดวกสบายยิ่งขึ้น</p>

          <div className="row">
            <div className="service-col">
              <h3>บริการส่งถึงบ้าน</h3>
              <p>
                เพียงสั่งออนไลน์เราจะจัดส่งอาหารถึงมือคุณอย่างรวดเร็วและปลอดภัยเพื่อให้คุณเพลิดเพลินกับมื้ออาหารที่บ้าน
              </p>
            </div>
            <div className="service-col">
              <h3>ห้องส่วนตัวสำหรับจัดเลี้ยง</h3>
              <p>
                ห้องจัดเลี้ยงส่วนตัวสำหรับคุณและคนพิเศษให้บรรยากาศที่เงียบสงบและสะดวกสบายพร้อมเมนูพิเศษที่รองรับทุกความต้องการ
              </p>
            </div>
            <div className="service-col">
              <h3>ที่จอดรถสะดวก</h3>
              <p>
                ร้านของเรามีที่จอดรถสะดวกสบายรองรับลูกค้าทุกท่านที่ขับรถมาให้คุณสามารถมาสนุกกับมื้ออาหารได้อย่างไร้กังวล
              </p>
            </div>
          </div>
        </section>

        <section className="concept">
          <h1>คอนเซ็ปของร้านเรา</h1>
          <p>เรามุ่งมั่นในการให้บริการเพื่อความพึงพอใจสูงสุดของลูกค้า</p>

          <div className="row">
            <div className="concept-col">
              <img src={assets.about2} alt="ถูกใจ" />
              <h3>ถูกใจ</h3>
              <p>
                บริการที่จริงใจ พร้อมรอยยิ้มจากทีมงานมืออาชีพ
                เราใส่ใจในทุกรายละเอียดเพื่อให้คุณได้รับประสบการณ์ที่ดีที่สุด
              </p>
            </div>
            <div className="concept-col">
              <img src={assets.about3} alt="พื้นที่รับประทานอาหาร" />
              <h3>ถูกปาก</h3>
              <p>
                คัดสรรวัตถุดิบสดใหม่ รังสรรค์อาหารด้วยความพิถีพิถัน
                ทุกเมนูถูกปรุงอย่างใส่ใจ เพื่อให้ได้รสชาติที่คุณชื่นชอบ
              </p>
            </div>
            <div className="concept-col">
              <img src={assets.about4} alt="ปลอดภัย" />
              <h3>ปลอดภัย</h3>
              <p>
                ใส่ใจทุกขั้นตอน มั่นใจในมาตรฐานความสะอาด
                เรารับประกันความปลอดภัยในทุกจานที่เสิร์ฟถึงคุณ
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default About;
