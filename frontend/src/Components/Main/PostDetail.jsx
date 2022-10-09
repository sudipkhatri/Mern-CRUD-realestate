import React from 'react';
import './PostDetails.css';
import axios from 'axios';
import {AiFillEdit, AiFillDelete} from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import {SiGooglemaps} from 'react-icons/si';

export default function PostDetail({index, id, title, desc, img, price, address, user}) {
  //console.log(id, title, desc, img, price);
  const navigate = useNavigate();
  const handleEdit = () =>{
   navigate(`/post/update/${id}`);
  }
  const requestDelete = async()=>{
    const res = await axios.delete(`https://mernestate.herokuapp.com/api/post/${id}`)
    .catch((error)=>console.log(error));
    const data = res.data;
    return data; 
  }
  const handleDelete = ()=>{
    requestDelete().then(()=>navigate('/post'));
  }
  return (
    <div className='post_body'>
      {user && 
      <div className="data_action">
        <button className='btn_primary' onClick={handleEdit}><AiFillEdit/></button>
        <button className='btn_primary' onClick={handleDelete}><AiFillDelete/></button>
      </div>}
      <div className="data_items">
        <div className="data_img">
            <img src={img} alt="container property"/>
        </div>
        <div className="data_body">
          <div className="data_title">
          <h1>{index + ". "}{title}</h1>
        </div>
          
          <div className="data_desc">
            <p>{desc}</p>
            <p className='data_para'>
            <SiGooglemaps/>{ '  ' +  address + ''}</p>
            <p className='data_para'>
            { price}</p>
            <button className='btn_book' onClick={()=>alert('booking on Progress.')}>Book</button>
          </div>
        </div>
      </div>
    </div>
  )
}
