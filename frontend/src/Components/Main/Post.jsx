import {useState, useEffect} from 'react';
import axios from 'axios';
import PostDetail from './PostDetail';
import { useSelector } from 'react-redux';
import './Post.css';

export default function Post() {
  // http://localhost:5001/api/post/
  const[data, setData] = useState([]);
  const isLoggedIn = useSelector((state)=>state.isLoggedIn)
  const receiveRequest = async ()=>{
    const res = await axios.get("https://mernestate.herokuapp.com/api/post").catch(error=>console.log(error));
    const data = res.data;
    return data;
  }
  useEffect(()=>{
    receiveRequest().then((data)=>setData(data.allPost))
  }, [])
//  console.log(data);
  const className = isLoggedIn ? "position_data" : "data_wrapper"
  return (
    <div className={className}  >
      <div className="data_head">
        {isLoggedIn ?
        <h1>All Houses</h1> :
        <h1>Browse some of our houses</h1>
        }
      </div>
      <div className="data_holder">
       
      {
       data && data.slice(0, 4).map((res, index)=>{
        //console.log(data);
          const{title, description, imageUrl, price, address} = res;
          return <PostDetail 
          key={index} 
          index={index}
          title={title}
          desc={description}
          img={imageUrl}
          price={price}
          address={address}
          />
        })
      }
      </div>
    </div>
  )
}
