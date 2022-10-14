import {React, useCallback, useEffect, useState} from 'react'
import axios from 'axios';
import PostDetail from './PostDetail';
import './MyPost.css';

export default function MyPost() {

  const[data, setDate] = useState([]);
  //const [user, setUser] = useState();
  const id = localStorage.getItem("user_id");
  const sendRequest = useCallback(
  async() =>{
    const res = await axios.get(`https://mernestate.herokuapp.com/api/post/user/${id}`).catch((error)=>console.error)
    const data = res.data;
    return data;
  }, []);
  useEffect(()=>{
    sendRequest().then((data)=> setDate(data.userDetails.posts));
  }, [])
  //console.log(data);
  
  return (
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
  )
}
