import React from 'react'
import './SideDrawer.css';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux'
import { authActions } from '../../Store';

export default function SideDrawer({show, click}) {

  const isLoggedIn = useSelector((state)=>state.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () =>{
    dispatch(authActions.logout()).then(navigate('/auth'));
  }
    
  return (
    show && <div className='side_bar show' onClick={click}>
         <div className="sidenav_list">
          {!isLoggedIn ? 
            <ul className='side_linklist'>
               <li>
                   <Link to='/'>Home</Link>
                </li>
                <li>
                  <Link to='/auth'>Login</Link>
                </li>
            </ul>
            :
            <ul className='side_linklist'>
                
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
                  <button className='btn_action' onClick={handleLogout}>Logout</button>
                </li>
            </ul>
}
        </div>
    </div>
  )
}
