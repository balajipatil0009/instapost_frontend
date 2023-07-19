import { useState , useEffect} from "react";
import axios from "../modules/axios";
import {useNavigate} from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [data, setData] = useState({email:"",posts:[],caption:""})
  const [img, setImg] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqrBsDzi5IlYCRcB38Z_w0nzc5l-yIKCq5WA&usqp=CAU");
  const getProfiile = async() =>{
    await axios.get('/home').then((res)=>{
      switch(res.status){
        case 200:{
          const resData = res.data;
          setData({email:resData.email,posts: resData.posts,caption: resData.caption})
          if(data.posts.length>0){
            setImg(data.posts[0])
          }
          break;
        }
        case 270:{
          navigate('/login');
        }
        default:{
          navigate('/login');
        }
      }
    }).catch((e)=>{
      navigate('/login');
    })
   
    }
useEffect(()=>{
 getProfiile();
},[])

  return (
    <>
        <div className="w-full px-2">
          <div className="w-full flex justify-center">
            <div
              className="border-2 border-black h-28 w-28 rounded-full bg-cover bg-center"
              style={{ backgroundImage: `url(${img})` }}
            ></div>
          </div>
          <p className="font-bold text-center text-lg text-white">{data.email}</p>
          <div className="w-full flex justify-evenly text-white">
            <p>posts</p>
            <p>{data.posts.length}</p>
          </div>
          <div className="w-full flex place-content-start text-center font-bold mt-7 text-white justify-center">
            <h6>{data.caption}</h6>
          </div>
       {/* button start  */}
          <div className="w-full flex justify-center pt-10">
            <a
              href="/addPost"
              className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold rounded-md shadow-2xl group border border-gray-400"
            >
              <span className="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-gradient-to-br from-pink-600 via-purple-700 to-blue-400 group-hover:opacity-100"></span>
         
              <span className="absolute top-0 left-0 w-full bg-gradient-to-b from-white to-transparent opacity-5 h-1/3"></span>
 
              <span className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent opacity-5"></span>
           
              <span className="absolute bottom-0 left-0 w-4 h-full bg-gradient-to-r from-white to-transparent opacity-5"></span>

              <span className="absolute bottom-0 right-0 w-4 h-full bg-gradient-to-l from-white to-transparent opacity-5"></span>
              <span className="absolute inset-0 w-full h-full border border-white rounded-md opacity-10"></span>
              <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-5"></span>
              <span className="relative">Add Post</span>
            </a>
          </div>
        </div>
    </>
  );
}

export default Profile;
