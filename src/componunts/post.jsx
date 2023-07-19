import { useCallback, useEffect, useState } from "react";
import "../componunts/globle.css";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { PiPaperPlaneTiltBold } from "react-icons/pi";
import { RxBookmark } from "react-icons/rx";
import { BsThreeDots } from "react-icons/bs";
import axios from "../modules/axios";

function posts() {
  const [posts, setPosts] = useState([]);
  const [like, setlike]= useState();
  const [data, setData] = useState({email:""})
  const [img, setImg] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqrBsDzi5IlYCRcB38Z_w0nzc5l-yIKCq5WA&usqp=CAU");

  const getPosts = async() =>{
    await axios.get('/sendPosts').then((res)=>{
      const ress = res.data;
      setPosts(res.data);
    })
    await axios.get('/home').then((res)=>{
      // console.log(res.data.email)
      setData({email:res.data.email});
    })
    
  }

  const handleLikes = useCallback(async(e) =>{
   // console.log(posts);
      const user = {id:e.id};
      if(e.liked){
        await axios.post('/dislike',user).then((res)=>{
       // console.log(res);
        })
        setPosts((old)=>{
          if(old._id==user){
            old.like == false;
          }
          return[...old]
        })
      }else{
        await axios.post('/like',user).then((res)=>{
       // console.log(res);
          setPosts((old)=>{
            if(old._id==user){
              old.like == true;
            }
            return[...old]
          })
        })
      }
     
    },[])

   useEffect(()=>{
    getPosts();
   },[]);
  return (
    <>
      <div id="main">
        {posts.map((item) => (
          <div className="postcard border-b-[gray] pb-2" key={item._id}>
            <div className="flex justify-between items-center">
              <div className="h-12 items-center flex pl-1 ">
                <div
                  className="w-10 h-10 rounded-full"
                  style={{
                    backgroundImage: `url(${img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
                <div className="ml-1">
                  <p className=" text-black text-sm font-bold  pb-0 mb-0">
                    {item.name}
                  </p>
                  <p className="text-sm pt-0 mt-0">{data.email}</p>
                </div>
              </div>
              <BsThreeDots />
            </div>
            <div>
              <div
                style={{
                  width: "400px",
                  height: "400px",
                  backgroundImage: `url(${item.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
            </div>
            <div className="" key={item._id}>
              <div className="icons flex justify-between h-10 ">
                <div className="flex" onClick={(e)=>{handleLikes({id:item._id,liked:item.like});item.like=!item.like}} key={item._id}>
                 {item.like ? <AiFillHeart className="icons" /> : <AiOutlineHeart className="icons"/>} 
                  <FaRegComment className="icons" />
                  <PiPaperPlaneTiltBold className="icons" />
                </div>
                <div className="flex justify-end">
                  <RxBookmark />
                </div>
              </div>
            </div>
          <div>
          <p className="font-bold">{item.caption}</p>
          </div>
          </div>
        ))}
      </div>

   
    </>
  );
}

export default posts;
