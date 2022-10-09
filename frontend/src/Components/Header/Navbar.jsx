import './Navbar.css';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { authActions } from '../../Store';
//import Login from '../Main/Login';


export default function Navbar({click}) {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const isLoggedIn = useSelector((state)=>state.isLoggedIn);
  //console.log(isLoggedIn);

  const handleLogout = ()=>{
    dispatch(authActions.logout()).then(navigator("/auth"));
  }

  return (
    <nav className="main_navbar">
      <div className="nav_header">
        
          {isLoggedIn ? 
          <div className="nav_list">
          <ul className='link_list'>
                <li>
                  <Link to='/post'>All Post</Link>
                </li>
                <li>
                  <Link to='/mypost'>My Post</Link>
                </li>
                <li>
                  <Link to='/post/add'>Add Post</Link>
                </li>
                <li>
                  <button className='action_btn' onClick={handleLogout}>Logout</button>
                </li>
      
          </ul>
          
          </div> : 
          <div className="nav_list">
          <ul className='link_list'>
                <li>
                   <Link to='/'>Home</Link>
                </li>
                <li>
                  <Link to='/auth'>Login</Link>
                </li>
                 
            
          </ul>
            
          </div>
          }
        
      </div>
      <div className='hamburger-menu' onClick={click}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  )
}
