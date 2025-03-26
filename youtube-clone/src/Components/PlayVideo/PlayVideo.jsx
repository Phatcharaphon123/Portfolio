import React, { useEffect, useState } from 'react'
import './PlayVideo.css'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import { API_KEY, value_converter } from '../../data'
import moment from 'moment'

const PlayVideo = ({ videoId }) => {

    // สร้าง state สำหรับเก็บข้อมูลวิดีโอ, ช่อง, และคอมเมนต์
    const [apiData, setApiData] = useState(null);
    const [channelData, setChannelData] = useState(null);
    const [commentData, setCommentData] = useState([]);

    // ฟังก์ชันสำหรับดึงข้อมูลวิดีโอจาก YouTube API
    const fetchVideoData = async () => {
        // URL สำหรับดึงข้อมูลวิดีโอ
        const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&key=${API_KEY}&id=${videoId}`;
        
        // ดึงข้อมูลวิดีโอและเก็บใน apiData
        await fetch(videoDetails_url)
            .then(res => res.json())
            .then(data => setApiData(data.items[0]));
    }

    // ฟังก์ชันสำหรับดึงข้อมูลช่องและคอมเมนต์
    const fetchOtherData = async () => {
        // URL สำหรับดึงข้อมูลช่องที่เผยแพร่วิดีโอ
        const channelLogo_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
        
        // ดึงข้อมูลช่องและเก็บใน channelData
        await fetch(channelLogo_url)
            .then(res => res.json())
            .then(data => setChannelData(data.items[0]));

        // URL สำหรับดึงข้อมูลคอมเมนต์ (จำกัด 20 คอมเมนต์)
        const videoComment_url = `https://www.googleapis.com/youtube/v3/commentThreads?textFormat=plainText&part=snippet&maxResults=20&key=${API_KEY}&videoId=${videoId}`;
        
        // ดึงข้อมูลคอมเมนต์และเก็บใน commentData
        await fetch(videoComment_url)
            .then(res => res.json())
            .then(data => setCommentData(data.items.slice(0, 20))); 
    }

    // ใช้ useEffect เพื่อดึงข้อมูลวิดีโอเมื่อคอมโพเนนต์โหลด
    useEffect(() => {
        fetchVideoData();
        window.scrollTo(0, 0); // เลื่อนหน้าจอลงไปที่ด้านบนเมื่อเพจโหลด
    }, [])

    // ใช้ useEffect เพื่อดึงข้อมูลช่องและคอมเมนต์เมื่อ apiData เปลี่ยนแปลง
    useEffect(() => {
        if (apiData) {
            fetchOtherData();
        }
    }, [apiData])

    return (
        <div className="play-video">
            {/* แสดงวิดีโอใน iframe */}
            <iframe 
                src={`https://www.youtube.com/embed/${videoId}?&autoplay=1`} 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowfullscreen>
            </iframe>

            {/* แสดงชื่อวิดีโอ */}
            <h3>{apiData ? apiData.snippet.title : "หัวข้อที่นี่"}</h3>

            {/* แสดงข้อมูลเกี่ยวกับวิดีโอ เช่น จำนวนการดู และเวลาเผยแพร่ */}
            <div className="play-video-info">
                <p>{apiData ? value_converter(apiData.statistics.viewCount) : 1525} &bull; {apiData ? moment(apiData.snippet.publishedAt).fromNow() : "2 วันที่ผ่านมา"}</p>
                <div>
                    {/* ปุ่มไลค์ */}
                    <span><img src={like} alt="" />{apiData ? value_converter(apiData.statistics.likeCount) : 125}</span>
                    {/* ปุ่มดิสไลค์ */}
                    <span><img src={dislike} alt="" /></span>
                    {/* ปุ่มแชร์ */}
                    <span><img src={share} alt="" />แชร์</span>
                    {/* ปุ่มบันทึก */}
                    <span><img src={save} alt="" />บันทึก</span>
                </div>
            </div>
            <hr />
            
            {/* ข้อมูลช่องที่เผยแพร่วิดีโอ */}
            <div className="publisher">
                <img src={channelData ? value_converter(channelData.snippet.thumbnails.default.url) : ""} alt="" />
                <div>
                    <p>{apiData ? apiData.snippet.channelTitle : ""}</p>
                    <span>{channelData ? value_converter(channelData.statistics.subscriberCount) : "1M"} ผู้ติดตาม</span>
                </div>
                <button type="button">ติดตาม</button>
            </div>

            {/* แสดงคำอธิบายวิดีโอ */}
            <div className="vid-description">
                <p>{apiData ? apiData.snippet.description.slice(0, 250) : "คำอธิบายที่นี่"}</p>
                <hr />
                {/* แสดงจำนวนคอมเมนต์ */}
                <h4>{apiData ? value_converter(apiData.statistics.commentCount) : 130} คอมเมนต์</h4>

                {/* แสดงคอมเมนต์แต่ละตัว */}
                {commentData.map((item, index) => {
                    return (
                        <div key={index} className="comment">
                            <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                            <div>
                                <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span>{moment(item.snippet.topLevelComment.snippet.publishedAt).fromNow()}</span></h3>
                                <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                                <div className="comment-action">
                                    {/* ปุ่มไลค์ในคอมเมนต์ */}
                                    <img src={like} alt="" />
                                    <span>{item.snippet.topLevelComment.snippet.likeCount}</span>
                                    <img src={dislike} alt="" />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default PlayVideo;
