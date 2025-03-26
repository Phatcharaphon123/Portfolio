import React, { useEffect, useState } from 'react'
import './Recommended.css'
import { API_KEY, value_converter } from '../../data'
import { Link } from 'react-router-dom'

const Recommended = ({ categoryId }) => {

    // สร้าง state สำหรับเก็บข้อมูลวิดีโอ
    const [apiData, setApiData] = useState([]);

    // URL สำหรับดึงข้อมูลวิดีโอที่ได้รับความนิยมในหมวดหมู่ที่เลือก
    const relatedVideo_API = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=46&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;

    // ดึงข้อมูลจาก YouTube API เมื่อคอมโพเนนต์โหลด
    useEffect(() => {
        fetch(relatedVideo_API)  // ดึงข้อมูลจาก YouTube API
            .then(res => res.json())  // แปลงข้อมูลที่ได้รับเป็น JSON
            .then(data => setApiData(data.items));  // เก็บข้อมูลใน state `apiData`
    }, [])  // useEffect จะทำงานเพียงครั้งเดียวตอนคอมโพเนนต์โหลด

    return (
        <div className="recommended">
            {/* แสดงข้อมูลวิดีโอทั้งหมดที่ดึงมาจาก API */}
            {apiData.map((item, index) => {
                return (
                    <div key={index} className="side-video-list">
                        {/* ลิงค์ไปยังหน้าวิดีโอที่เลือก */}
                        <Link to={`/video/${item.snippet.categoryId}/${item.id}`} onClick={() => window.scrollTo(0, 0)} className="small-thumbnail">
                            {/* แสดงภาพตัวอย่างขนาดกลางของวิดีโอ */}
                            <img src={item.snippet.thumbnails.medium.url} alt="" />
                        </Link>
                        <div className="vid-info">
                            {/* แสดงชื่อเรื่องของวิดีโอ */}
                            <h4>{item.snippet.title}</h4>
                            {/* แสดงชื่อช่องที่เผยแพร่วิดีโอ */}
                            <p>{item.snippet.channelTitle}</p>
                            {/* แสดงจำนวนการดูของวิดีโอ */}
                            <p className='recommended-views'>{value_converter(item.statistics.viewCount)} ครั้ง</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Recommended;
