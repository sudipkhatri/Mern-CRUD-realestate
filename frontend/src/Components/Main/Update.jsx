import {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import './AddPost.css';
import { useCallback } from 'react';

export default function Update() {
    const id = useParams().id;
   // console.log(id);
    const navigate = useNavigate();
    const [input, setInput] = useState({
        title: '',
        description: '',
        imageUrl: '',
        price: '',
        address: '',

    });
    useEffect(()=>{
        defaultInput();
    }, [defaultInput]);

    const defaultInput = useCallback(
    async ()=>{
        const res = await axios.get(`https://mernestate.herokuapp.com/api/post/${id}`).catch((error)=>console.log(error));
        const data = await res.data.postData;
        setInput({
            title: data.title,
            description: data.description,
            imageUrl: data.imageUrl,
            price: data.price,
            address: data.address,

        });
    
    }, [id])
    const sendRequest = async()=>{
        const res = await axios.patch(`https://mernestate.herokuapp.com/api/post/update/${id}`, {
            title: input.title,
            description: input.description,
            imageUrl: input.imageUrl,
            price: input.price,
            address: input.address,
        })
        .catch((error)=>console.log(error));
       const data = await res.data;
       return data;
        //console.log(data);
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
       sendRequest().then(()=>navigate('/mypost'));

    }
    const handleChange = (e)=>{
        e.preventDefault();
        setInput((prev)=>({
            ...prev,
            [e.target.name] : e.target.value,
        }))
    }
    //console.log(input);
  return (
    <div className='update_container'>
        <div className="data_section">
           <form className='post_info' onSubmit={handleSubmit}>
            <p>Update</p>
            <input 
            type="text"
            name = "title"
            value={input.title}
            onChange={handleChange}
            required
            />
            <input 
            type="text"
            name="imageUrl"
            value={input.imageUrl}
            onChange={handleChange}
            required
            />
            <input 
            type="text"
            name="price"
            value={input.price}
            onChange={handleChange}
            required
            />
            <input 
            type="text"
            name="address"
            value={input.address}
            onChange={handleChange}
            required
            />
            <textarea 
            type="description"
            name="description"
            value={input.description}
            onChange={handleChange}
            required
            />
            <button type='submit'>Update</button>
        </form>
        </div>
    </div>
  )
}
