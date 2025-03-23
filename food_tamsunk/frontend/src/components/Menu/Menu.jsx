import React, { useState } from 'react';
import './Menu.css';
import { menu_list } from '../../assets/assets';

function Menu({ onSelectCategory }) {
    const [selectedIndex, setSelectedIndex] = useState(null);

    const handleMenuClick = (index, category) => {
        if (selectedIndex === index) {
            // ถ้ากดซ้ำให้ยกเลิกการเลือก
            setSelectedIndex(null);
            onSelectCategory(null); // ส่งค่าหมวดหมู่ว่างกลับไป
        } else {
            // ถ้าไม่ได้กดซ้ำให้เลือกหมวดหมู่ใหม่
            setSelectedIndex(index);
            onSelectCategory(category); // ส่งหมวดหมู่ที่เลือกกลับไป
        }
    };

    return (
        <div className='menu-container'>
            <div className='menu-our'>เมนูของเรา</div>
            <div>
                เลือกจากเมนูที่หลากหลายและครบครัน ซึ่งอัดแน่นไปด้วยอาหารจานเด็ดที่ปรุงอย่างพิถีพิถันเพื่อความอร่อยในทุกคำ
                เรามุ่งมั่นที่จะตอบสนองความต้องการของคุณ ไม่ว่าจะเป็นมื้อไหน ๆ พร้อมยกระดับประสบการณ์การรับประทานอาหารของคุณให้พิเศษยิ่งขึ้นด้วยรสชาติที่กลมกล่อมและบริการที่ประทับใจในทุกช่วงเวลา
            </div>
            <div className='menu-box'>
                {menu_list.map((menu, index) => (
                    <div
                        className={`menu-type ${selectedIndex === index ? 'selected' : ''}`}
                        key={index}
                        onClick={() => handleMenuClick(index, menu.menu_name)}
                    >
                        <div className='menu-type-cart'>
                            <img src={menu.menu_image} alt={menu.menu_name} />
                            <span>{menu.menu_name}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Menu;
