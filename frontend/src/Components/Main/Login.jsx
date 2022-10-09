import {React, useState} from 'react';
import axios from 'axios';
import './login.css';
import {useDispatch} from 'react-redux';
import { authActions } from '../../Store';
import {useNavigate} from 'react-router-dom';

export default function Login() {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const[value, setValue] = useState({
    name: "",
    email : "",
    password : ""
  });
  const[signup, setSignUp] = useState(false);
  const[error, setError] = useState(false);

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
      sendRequest("signup").then((data)=>localStorage.setItem("user_id",data.newUser._id))
      .then(()=>dispatch(authActions.login({})))
      .then(navigator("/post"));
    }
    else{
      sendRequest().then((data)=>localStorage.setItem("user_id",data.userDetails._id))
      .then(()=>dispatch(authActions.login({})))
      .then(navigator("/post"));
    }
  }
  const sendRequest = async(type="login") =>{
    const res = await axios.post(`https://mernestate.herokuapp.com/api/user/${type}`,
    {
      name: value.name,
      email: value.email,
      password: value.password,
    }).catch((error)=>{
      if(error){
        alert('invalid password combination.');
        navigator('/auth')
       
      }
    });
    const data = await res.data;
    //console.log(data);
    return data;
  }
  //console.log(error);
//console.log(value);
//console.log(signup);
  return (
    <div className="login_form">
      <div className="login_details">
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
            {error && <span className='err'>Email or Password Incorrect.</span>}
            <button type="submit">Submit</button>
            <button onClick={(e)=>{
              e.preventDefault();
              setSignUp(!signup)}
            }>
              {signup ? "Already a user? login" : "New Here? signup"}
            </button>
        </form>
      </div>
    </div>
  )
}
