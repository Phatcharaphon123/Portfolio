import React from 'react'
import './Sidebar.css'
import home from '../../assets/home.png'
import game_icon from '../../assets/game_icon.png'
import automobiles from '../../assets/automobiles.png'
import explore from '../../assets/explore.png'
import subscriprion from '../../assets/subscriprion.png'
import sports from '../../assets/sports.png'
import entertainment from '../../assets/entertainment.png'
import tech from '../../assets/tech.png'
import music from '../../assets/music.png'
import blogs from '../../assets/blogs.png'
import news from '../../assets/news.png'
import Maser from '../../assets/Maser.png'
import Mrbeast from '../../assets/Mrbeast.png'
import HRK from '../../assets/HRK.png'
import THE_STANDARD from '../../assets/THE_STANDARD.png'
import WWE from '../../assets/WWE.png'
import Ruhasg from '../../assets/Ruhasg.png'
import NASA from '../../assets/NASA.png'
import Lofi_Girl from '../../assets/Lofi_Girl.png'

const Sidebar = ({sidebar,category,setCategory}) => {
  return (
    <div className={`sidebar ${sidebar?"":"small-sidebar"}`}>
      <div className="shortcut-links">
            <div onClick={()=>{setCategory(0)}} className={`side-link ${category===0?"active":""}`}><img src={home} alt="" /><p>หน้าแรก</p></div>
            <div onClick={()=>{setCategory(20)}} className={`side-link ${category===20?"active":""}`}><img src={game_icon} alt="" /><p>เกม</p></div>
            <div onClick={()=>{setCategory(2)}} className={`side-link ${category===2?"active":""}`}><img src={automobiles} alt="" /><p>ยานยนต์</p></div>
            <div onClick={()=>{setCategory(17)}} className={`side-link ${category===17?"active":""}`}><img src={sports} alt="" /><p>กีฬา</p></div>
            <div onClick={()=>{setCategory(24)}} className={`side-link ${category===24?"active":""}`}><img src={entertainment} alt="" /><p>บันเทิง</p></div>
            <div onClick={()=>{setCategory(28)}} className={`side-link ${category===28?"active":""}`}><img src={tech} alt="" /><p>เทคโนโลยี</p></div>
            <div onClick={()=>{setCategory(10)}} className={`side-link ${category===10?"active":""}`}><img src={music} alt="" /><p>เพลง</p></div>
            <div onClick={()=>{setCategory(22)}} className={`side-link ${category===22?"active":""}`}><img src={blogs} alt="" /><p>บล็อก</p></div>
            <div onClick={()=>{setCategory(25)}} className={`side-link ${category===25?"active":""}`}><img src={news} alt="" /><p>ข่าว</p></div>
            <hr/>
        </div>
        <div className="subscribed-list">
            <h3>การติดตาม</h3>
            <div className={`side-link`}><img src={Maser} alt="" /><p>Maser</p></div>
            <div className={`side-link`}><img src={Mrbeast} alt="" /><p>MrBeast</p></div>
            <div className={`side-link`}><img src={HRK} alt="" /><p>HEARTROCKER</p></div>
            <div className={`side-link`}><img src={THE_STANDARD} alt="" /><p>THE STANDARD</p></div>
            <div className={`side-link`}><img src={WWE} alt="" /><p>WWE</p></div>
            <div className={`side-link`}><img src={Ruhasg} alt="" /><p>Ruhasg</p></div>
            <div className={`side-link`}><img src={NASA} alt="" /><p>NASA</p></div>
            <div className={`side-link`}><img src={Lofi_Girl} alt="" /><p>Lofi_Girl</p></div>
        </div>
    </div>
  )
}

export default Sidebar
