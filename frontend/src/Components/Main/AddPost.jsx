import {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddPost.css';


export default function AddPost() {
  const navigator = useNavigate();
  const[input, setInput] = useState({
    title: '',
    description: '',
    imageUrl: '',
    price: '',
    address: '',
  });
  const postRequest = async()=>{
    const res = await axios.post('https://mernestate.herokuapp.com/api/post/add', {
      title: input.title,
      description: input.description,
      imageUrl: input.imageUrl,
      price: input.price,
      address: input.address,
      users: localStorage.getItem('user_id'),
    }).catch((error)=>console.log(error));
    const data = await res.data;
    return data;
  }
  const handleChange = (e) =>{
    //e.preventDefault();
    setInput((prev)=>({
      ...prev,
     [e.target.name] : e.target.value
    }))
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    postRequest()
    .then(navigator('/mypost'));
  }
 
  return (
    <div className='post_container'>
      <div className="add_details">
        <h2> Add Details Below</h2>
        <form className='post_info' onSubmit={handleSubmit}>
            <input 
            type="text"
            name = "title"
            placeholder='Eg: Town House ..'
            onChange={handleChange}
            required
            />
            <input 
            type="text"
            name="imageUrl"
            placeholder='Eg: https://img.jpeg'
            onChange={handleChange}
            required
            />
            <input 
            type="text"
            name="price"
            placeholder='Eg: $500 per week'
            onChange={handleChange}
            required
            />
             <input 
            type="text"
            name="address"
            placeholder='Eg: 2/27 Chapel Street, Rockdale NSW 2218'
            onChange={handleChange}
            required
            />
            <textarea 
            type="description"
            name="description"
            placeholder='Eg: 3 bedroom ..'
            onChange={handleChange}
            required
            />
            <button type='submit'>Add</button>
        </form>
      </div>
    </div>
  )
}
