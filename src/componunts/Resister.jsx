import React, { useState} from "react";
import "./Resister.css";
import { RiLockPasswordLine, RiUserAddLine,RiLockPasswordFill} from "react-icons/ri";
import {BiObjectsHorizontalLeft} from "react-icons/bi"
import { SiGmail } from "react-icons/si";
import {ImSpinner4} from "react-icons/im"
import { ToastContainer, toast } from 'react-toastify';
import axios from "../modules/axios"
import { useNavigate } from "react-router-dom";

const Resister = () => {
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();
  const[user, setUser]=useState({email:"", password:"",cpass:"",caption:""})
let name, value;

const handleChange = (e) =>{
 name = e.target.name;
 value = e.target.value;
  setUser({...user,[name]:value})
}
const sendUser = (e) =>{
  setLoading(true)
  e.preventDefault();
  const{email, password} = user;
  if(password.length <8){
    toast.error('Password must cointain more than 8 characters',{
      position: toast.POSITION.TOP_CENTER,
      toastId: "passLen"
    })
    setLoading(false)
  }
   else{
  if(user.password === user.cpass){
       if(user.password && user.email){
        axios.post(`/resister`,user).then((res)=>{
          setLoading(false);
       // console.log(res);
          switch(res.status){
            case 205: {
              toast.error('User Alredy Exist', {
                position: toast.POSITION.TOP_CENTER
              })
              break;
            }
            case 200:{
              toast.success('User Saved', {
                position: toast.POSITION.TOP_CENTER
              })
              Navigate("/");
              break;
            }
            case 211:{
              toast.error('server is busy try after sometime', {
                position: toast.POSITION.TOP_CENTER
              })
              break;
            }
            default:{
              toast.error('Something went Wrong Please try after some time', {
                position: toast.POSITION.TOP_CENTER
              })
              break;
            }
          }
          setUser({email:"",password:"",cpass:"",caption:""});
        }).catch((err)=>{
          setLoading(false);
          toast.error('something went wrong try after sometime',{
            position: toast.POSITION.TOP_CENTER,
            toastId: "unknown"
          })
        })
       }else{
        setLoading(false);
        toast.error('fill every field',{
          position: toast.POSITION.TOP_CENTER,
      toastId: 124
        })
       }
  }else{
    setLoading(false);
    toast.warning('Password and Confirm password should be!', {
      position: toast.POSITION.TOP_CENTER,
      toastId: 123
  });
  }
 }
}

  return (
    <div className="bg-gradient-to-r from-red-400 via-gray-300 to-blue-500">
    <div className="flex justify-center items-center h-screen w-screen maindiv">
      <div className="flex justify-center content-center rounded-xl overflow-hidden border">
        {/* main div for login and signud route */}
        <div className="w-[500px] min-h-[600px] rounded-md bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black">
          <div className="flex w-[500px]">
            <p className="w-[50%] h-[45px] text-center font-bold text-sky-300 flex justify-center items-center ">
              Resister
            </p>
            <a
              href="/login"
              className="w-[50%] h-[45px] bg-[#dfc6c638] font-bold text-sky-300 flex justify-center items-center border"
            >
              Login
            </a>
          </div>
          <div className="min-h-[510px] w-[500px]m-[0px] flex justify-center">
            <div className="w-[70%]">
              <div className="flex justify-center mt-[20%]">
                <div>
                {loading?
               <ImSpinner4 size={70} className="animate-spin text-gray-400"/>
                :
                  <RiUserAddLine size={80} style={{color:"white"}} />}
                </div>
              </div>
              <form onSubmit={sendUser}>
              <div className="w-[100%] mt-[10%] border-b-2 rounded flex">
                <SiGmail size={20} style={{ margin: "2%", color: "white"}} />
                <input
                  type="gmail" 
                  className="h-[30%] bg-transparent w-[90%] ml-[3%] text-white"   value={user.email} onChange={handleChange} name="email"
              />
              </div>
              <div className="w-[100%] mt-[10%] border-b-2 rounded flex">
                <RiLockPasswordLine
                  size={20}
                  style={{ margin: "2%", color: "white"}} name="password" 
                />
                <input
                  type="text"
                  className="h-[30%] bg-transparent w-[90%] ml-[3%] text-white" value={user.password} onChange={handleChange} name="password"
                />
              </div>
              <div className="w-[100%] mt-[10%] border-b-2 rounded flex">
                <RiLockPasswordFill
                  size={20}
                  style={{ margin: "2%", color: "white"}}
                />
                <input
                  type="text"
                  className="h-[30%] bg-transparent w-[90%] ml-[3%] text-white" onChange={handleChange} value={user.cpass}
                name="cpass"/>
              </div>
              <div className="w-[100%] mt-[10%] border-b-2 rounded flex">
                <BiObjectsHorizontalLeft
                size={25}
                className="m-1 text-white"
                />
                <textarea rows={2} 
                  type="text"
                  placeholder="Write Bio For Your Account"
                  className="h-[30%] bg-transparent w-[90%] ml-[3%] text-white focus: border-none" onChange={handleChange} value={user.caption}
                name="caption"/>
              </div>
              <div className="flex justify-center mt-6">
                <button className="px-10 bg-white" type="submit">Get In</button>
                <ToastContainer/>
              </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Resister;
