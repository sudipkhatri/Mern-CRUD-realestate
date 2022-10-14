import React from 'react';
import './Head.css';
import {Link} from 'react-router-dom';

export default function Head() {
  return (
    <div className='header_info'>
        <div className="row_header">
            <div className="col col_1">
            <h2 className='title'>
                Welcome to world's best
                Real estate videos platform   
            </h2>
            <p className='des'>
                Simply record and upload 
                videos to buy sell 
                your properties
            </p>
            </div>
            <div className="col col_end">
                <p className='des col_des'>
                    Are you ready ?
                </p>
                <div className="action">
                <Link to={'/auth'}> Login </Link>
                <Link to={'/auth'}> Signup </Link>
                </div>
            </div>
        </div>  
    </div>
  )
}
