import './App.css';
import { useState, useEffect } from 'react';
import Navbar from './Components/Header/Navbar';
import SideDrawer from './Components/Header/SideDrawer';
//import Footer from './Components/Footer/Footer';
import { Routes, Route } from "react-router-dom";
import Login from './Components/Main/Login';
import AddPost from './Components/Main/AddPost';
import MyPost from './Components/Main/MyPost';
import PostDetail from './Components/Main/PostDetail';
import Post from './Components/Main/Post';
import Update from './Components/Main/Update';
import { authActions } from './Store';
import { useSelector, useDispatch } from 'react-redux';
import Home from './Home';
//import Log from './Components/Main/Log';

function App() {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  // this is for refresh functionality 
  const isLoggedIn = useSelector((state)=>state.isLoggedIn);
   useEffect(() => {
     const handleTabClose = (e) => {
       e.preventDefault();

       console.log("beforeunload event triggered");
      //  const id = localStorage.getItem("user_id");
      //  id && localStorage.removeItem("user_id");
       return (e.returnValue = "Are you sure you want to exit?");
     };

     window.addEventListener("beforeunload", handleTabClose);

     return () => {
       window.removeEventListener("beforeunload", handleTabClose);
     };
   }, []);
  useEffect(()=>{
    if(localStorage.getItem("user_id")){
      dispatch(authActions.login());
    }
  },[dispatch]);
  return (
    <>
      <header>
        <Navbar click={() => setShow(!show)} />
        <SideDrawer show={show} click={() => setShow(false)} />
      </header>
      <main>
        <Routes>
          {!isLoggedIn ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Login />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/post/add" element={<AddPost />} />
              <Route path="/mypost" element={<MyPost />} />
              <Route path="/post/:id" element={<PostDetail />} />
              <Route path="/post/update/:id" element={<Update />} />
              <Route path="/post" element={<Post />} />
            </>
          )}
        </Routes>
      </main>
    </>
  );
}

export default App;
