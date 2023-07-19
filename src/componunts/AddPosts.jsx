import { useState } from "react";
import {IoIosImages} from "react-icons/io"
import { storage } from "../modules/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid"
import axios from "../modules/axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddPost(){
    const Navigate = useNavigate();
      const [image, setImage] = useState(null);
      const [posts, setPosts] = useState({imgUrl:"", caption:""})
      var value,name;
     const handleChange = (e) =>{
             value = e.target.value;
             name= e.target.name;
             setPosts({...posts,[name]: value})


     }

      const uploadImage = async()=>{
        if(image==null){
         toast.error('please select image',{
          position: toast.POSITION.TOP_CENTER,
          toastId:"Nullimg"
         })
        }else{
        const imageRef =  ref(storage,`images/${image.name + v4()}`);
         await uploadBytes(imageRef, image).then(async(imgLoc)=>{
         const url = await getDownloadURL(imgLoc.ref);
            if(url != ""){
              axios.post('/addPost',({img: url, caption: posts.caption})).then((res)=>{
                   switch(res.status){
                    case 200:{
                      Navigate('/');
                      break;
                    }
                    case 270:{
                      Navigate('/login');
                      break;
                    }
                    case 211:{
                      toast.error('Unable to save post Try after someTime')
                      break;
                    }
                    case 212:{
                      toast.error('Unable to save post Try after someTime')
                      break;
                    }
                    default:{
                      break;
                    }
                   }
              }).catch((err)=>{
                toast.error('Server Busy Try after SomeTime',{
                  position: toast.POSITION.TOP_CENTER,
                  toastId: "error"
                })
              })
            }else{
              toast.error('Server Busy Try after SomeTime url null',{
                position: toast.POSITION.TOP_CENTER,
                toastId: "error"})
            }
          }).catch((e)=>{
            toast.error('Server Busy Try after SomeTime url null',{
              position: toast.POSITION.TOP_CENTER,
              toastId: "error"})
          })
        }
      }
    return(
        <>
      <div className="w-screen h-screen bg-gradient-to-r from-red-400 via-gray-300 to-blue-500  flex justify-center items-center">
      <div className="w-80 h-96 border border-black bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black rounded-xl"> 
      <div className="flex justify-center h-1/3 items-center">
        <IoIosImages className="text-white" size={80} />
      </div> 
      <div className="item-center h-1/2 flex items-center">
      <div>
            <div className="border-b-2 rounded py-2 mx-3 w-72 flex">
            <input type="file" className="bg-transparent w-full text-white text-sm" onChange={(event)=>{
            setImage(event.target.files[0])
            }}/>
            </div>
            <div className="border-b-2 rounded py-2 mx-3 w-72 flex">
            <textarea className="bg-transparent w-full text-sm text-white" rows={2} maxLength={60} placeholder="write the caption for post" value={posts.caption} name="caption" onChange={handleChange}></textarea>
            </div>
            <button onClick={uploadImage} >add post</button>
      </div></div> 
       </div>   </div>
       <ToastContainer/>
        </>
    )
}
export default AddPost;
