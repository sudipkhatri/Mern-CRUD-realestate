import './Log.css';
import {React, useState} from 'react';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import { authActions } from '../../Store';
import {useNavigate} from 'react-router-dom';

export default function Log() {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const[value, setValue] = useState({
    name: "",
    email : "",
    password : ""
  });
  const[signup, setSignUp] = useState(false);
  const[errors, setError] = useState(false);

  const handleChange = (e) =>{
    e.preventDefault();
    setValue((prev)=>({
      ...prev,
      [e.target.name] : e.target.value
    }))
  }
  const handleSubmit = (e)=>{
    e.preventDefault();

    if(signup){
      sendRequest("signup");
      // .then((data)=>localStorage.setItem("user_id",data.newUser._id))
      // .then(()=>dispatch(authActions.login({})))
      // .then(navigator("/post"));
    }
    else{
      sendRequest();
      // .then((data)=>localStorage.setItem("user_id",data.userDetails._id))
      // .then(()=>dispatch(authActions.login({})))
      // .then(navigator("/post"));
    }
  }
  const sendRequest = async(type="login") =>{

    try{
      const res = await axios.post(`https://mernestate.herokuapp.com/api/user/${type}`,
    {
      name: value.name,
      email: value.email,
      password: value.password,
    })
    const data = await res.data;
    if(type === "signup"){
      localStorage.setItem("user_id",data.newUser._id);
    }
    else{
      localStorage.setItem("user_id",data.userDetails._id);
    }
    dispatch(authActions.login({}));
    //console.log(dispatch(authActions.login({})));
    navigator("/post");
    return data;
    }
    catch(error){
      if(error.response && error.response.status >= 400 && error.response.status <= 400){
        setError(true);
      } 
    }
    
  }
  return (
    <div className='auth_login'>
    <div class="context">
     <form className="user_form" onSubmit={handleSubmit}>
          <h3>{signup ? 'Sign Up' : 'Login'}</h3>
          {signup &&
            <input 
            type="text"
            name="name"
            placeholder="Enter Your Full Name" 
            onChange={handleChange}
            required
            />
            }
            <input 
            type="email"
            name="email"
            placeholder="example@gmail.com" 
            onChange={handleChange}
            required
            />
            <input 
            type="password"
            name="password"
            placeholder="Enter Your Password" 
            onChange={handleChange}
            required
            />
            {errors && <span className='err'>Email or Password Incorrect.</span>}
            <button type="submit">Submit</button>
            <button onClick={(e)=>{
              e.preventDefault();
              setSignUp(!signup)}
            }>
              {signup ? "Already a user? login" : "New Here? signup"}
            </button>
        </form>   
    </div>


<div class="area" >
            <ul class="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
    </div >
    </div>
  )
}
