import axios from "axios";

export default axios.create(
    {
        baseURL:'https://instapost-server.onrender.com', //http://localhost:3000
        headers:{
            "Content-Type":"application/json"
          },
          withCredentials: true
    }
)