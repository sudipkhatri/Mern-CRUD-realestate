import {React, useEffect, useState} from 'react'
import axios from 'axios';
import PostDetail from './PostDetail';
import './MyPost.css';
import {useNavigate} from 'react-router-dom';

export default function MyPost() {

  const navigate = useNavigate();
  const[data, setDate] = useState([]);
  //const [user, setUser] = useState();
  const id = localStorage.getItem("user_id");
  
 
  useEffect(()=>{
    let unSubcribe = false;
    const sendRequest = async() =>{
    const res = await axios.get(`https://mernestate.herokuapp.com/api/post/user/${id}`)
    .catch((error)=>console.log(error));
    const data = res.data;
    return data;
    };
    sendRequest().then((data)=>{ 
      if(!unSubcribe) {
        setDate(data.userDetails.posts)
     }});
     return ()=>{
      //console.log("clean up triggered")
      unSubcribe = true;
     }
  }, [id])
  //console.log(data);
  
  return (
    <> {data.length === 0 ? 
    <div className='no_posts'>
      <h1>No User Posts Found</h1>
      <button onClick={()=>navigate("/post/add")}>Create One</button>
       
    </div> : <>
    <div className='main_container'>
      <div className="data_container">
      <div className="data_head">
        <p> {"<"} </p>
        <h1>My Posts</h1>
        <p> {">"} </p>
      </div>

      <div className="data_holder">
      
       
      {
        data && data.map((input, index)=>{
          const {_id, description, imageUrl, price, title, address } = input;
          return <PostDetail 
           key={index}
           index={index}
           id = {_id}
           title={title}
           desc ={description}
           img={imageUrl}
           price={price}
           address ={address}
           user = {true}
          />
        })
      }

      </div>
      </div>
    </div>
    </>
}
    </>
  )
}
