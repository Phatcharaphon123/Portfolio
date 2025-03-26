import React, { useEffect, useState } from 'react'
import './Feed.css'
import { Link } from 'react-router-dom'
import { API_KEY, value_converter } from '../../data'
import moment from 'moment'

const Feed = ({category}) => {

    // สร้าง state สำหรับเก็บข้อมูลวิดีโอ
    const [data, setData] = useState([]);

    // ฟังก์ชันสำหรับดึงข้อมูลวิดีโอจาก YouTube API
    const fetchData = async () => {
        // URL สำหรับดึงข้อมูลวิดีโอที่ได้รับความนิยมในหมวดหมู่ที่เลือก
        const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;
        
        // ดึงข้อมูลจาก API
        await fetch(videoList_url)
            .then((response) => response.json())  // แปลงข้อมูลที่ได้เป็น JSON
            .then((data) => setData(data.items));  // เก็บข้อมูลใน state `data`
    }

    // เรียกใช้ fetchData เมื่อหมวดหมู่ (category) เปลี่ยนแปลง
    useEffect(() => {
        fetchData();
    }, [category]);

  return (
   <div className='feed'>
        {/* แสดงข้อมูลวิดีโอทั้งหมดใน state `data` */}
        {data.map((item, index) => {
            return (
                // ลิงค์ที่นำไปยังหน้ารายละเอียดของวิดีโอ
                <Link key={index} to={`video/${item.snippet.categoryId}/${item.id}`} className="card">
                    {/* ภาพตัวอย่างของวิดีโอ */}
                    <img src={item.snippet.thumbnails.medium.url} alt="" />
                    {/* ชื่อเรื่องของวิดีโอ */}
                    <h2>{item.snippet.title}</h2>
                    {/* ชื่อช่องที่เผยแพร่วิดีโอ */}
                    <h3>{item.snippet.channelTitle}</h3>
                    {/* จำนวนการดู และเวลาที่เผยแพร่ */}
                    <p>{value_converter(item.statistics.viewCount)} ครั้ง &bull; 
                    {" " + moment(item.snippet.publishedAt).fromNow()}</p>
                </Link>
            );
        })}
    </div>
  )
}

export default Feed;
