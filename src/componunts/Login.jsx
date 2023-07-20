import { MdOutlineAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine, RiUserFollowLine } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { ImSpinner4 } from "react-icons/im";
import { useNavigate } from 'react-router-dom';
import axios from "../modules/axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Login(){
  const [loading, setloading]= useState(false);
  const navigate = useNavigate();
const[user, setUser] = useState({email:"",password:""});
var value, name;
const handleChange = (e) =>{
 value= e.target.value;
 name= e.target.name;
 setUser({...user,[name]:value})
}

const getUser = async(e) =>{
  setloading(true);
    e.preventDefault();
    const {gmail, password} = user;
    await axios.post('/login',user,{
      headers:{
        "Content-Type":"application/json"
      },
      withCredentials:true
    }).then((res)=>{
      setloading(false);
      switch(res.status){
        case 200:{
          toast.success('Verified',{
            position: toast.POSITION.TOP_CENTER,
            toastId: "saved"
          })
        navigate("/");
          break;
        }
        case 222:{
          toast.error('User saved',{
            position: toast.POSITION.TOP_CENTER,
            toastId: "wpass"
          })
          break;
        }
        case 230:{
          toast.error('User Not Exist, Please go to Resister page',{
            position: toast.POSITION.TOP_CENTER,
            toastId: "notExist"
          })
          break;
        }
        case 211:{
          toast.error('Server busy try after sometime',{
            position: toast.POSITION.TOP_CENTER,
            toastId: "server"
          })
          break;
        }
      }
    }).catch((err)=>{
      setloading(false);
      toast.error('something went wrong try after sometime',{
        position: toast.POSITION.TOP_CENTER,
        toastId: "unknown"
      })
    })
}
    return(
      <div className="bg-gradient-to-r from-red-400 via-gray-300 to-blue-500">
<div className="maindiv h-screen w-screen flex justify-center items-center">
      <div className="flex justify-center border rounded-xl overflow-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black">
        {/* main div for login and signud route */}
        <div className="w-[500px] h-[550px]">
          <div className="flex w-[500px]">
            <a
              href="/resister"
              className="w-[50%] h-[50px] bg-[#dfc6c638] font-bold text-sky-100 flex justify-center items-center border"
            >
              <p>Resister</p>
            </a>
            <div className="flex w-[50%] h-[45px] font-bold text-sky-100 justify-center items-center">
              <h6> Login</h6>
            </div>
          </div>
          <div className="h-[510px] w-[500px]m-[0px] border-black">
            <div className="w-[100%] flex justify-center mt-[20%]">
            {loading?
               <ImSpinner4 size={70} className="animate-spin text-gray-400"/>
                :<RiUserFollowLine size={80} style={{ color: "white" }} />
             }
            </div>
            <div className="flex justify-center">
              <div className="w-[70%]">
                <form method="POST" onSubmit={getUser}>
                  <div className="w-[100%] mt-[10%] border-b-2 rounded flex">
                    <MdOutlineAlternateEmail
                      size={20}
                      style={{ color: "white" }}
                    />
                    <input
                      type="gmail"
                      name="email"
                      className="h-[30%] bg-transparent w-[90%] ml-[3%] text-white"
                      onChange={handleChange}
                    />
                  </div>
                  <br />
                  <div className="w-[100%] mt-[10%] border-b-2 rounded flex">
                    <RiLockPasswordLine size={20} style={{ color: "white" }} />
                    <input
                    //   type={eye ? "text" : "password"}
                      className="h-[30%] bg-transparent w-[90%] ml-[3%] text-white"
                      name="password"
                    onChange={handleChange}
                    />
                    <div className="mr-[5px]" 
                    // onClick={changeEye}
                    >
                      <FaEye size={20} style={{ color: "white" }} />
                    </div>
                  </div>
                  <br />
                  <div className="w-[100%] h-[20%] flex justify-center">
                    <input
                      type="submit"
                      className="h-[100%] bg-sky-400 w-[60%] mt-[3%] rounded-xl font-bold text-sky-100"
                      value={"Login"}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ToastContainer/>
  </div>


    );
}

export default Login;