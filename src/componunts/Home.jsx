import Post from "./post.jsx";
import Profile from "./Profile";
function Home(){
    return(<>
      <div className="grid md:grid-cols-4">
        <div className=" md:col-span-1 sm:row-span-1  sticky top-0 flex justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black md:h-screen">
          <Profile></Profile>
        </div>
        <div className="md:col-span-3 sm:row-span-2 bg-gradient-to-r from-pink-200 via-emerald-200 to-purple-200">
          <Post></Post>
        </div>
      </div>
    </>);
}

export default Home;