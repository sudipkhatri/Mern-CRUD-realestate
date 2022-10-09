import React from 'react';
import './Body.css'
import {FaInstagram, FaFacebookSquare} from 'react-icons/fa';

export default function Body() {
  return (
    <div className="user_videos">
      <div className="row">
        <div className="col">
          <div className="col_mobile">
             <div className="mobile_context">
              <div className="camera">
                <div className="cam_1">
                  <div className="circle"></div>
                </div>
              </div>
            <div className="mobile_screen">
              <iframe className='video_input'   src="https://www.youtube.com/embed/tgbNymZ7vqY?playlist=tgbNymZ7vqY&loop=1">
              </iframe>
            {/* <video width="100%" autoplay loop muted>
              <source src="https://www.youtube.com/watch?v=d_yzP4qnZwQ" type="video/mp4" />
                Sorry, your browser doesn't support embedded videos.
              </video> */}
         </div>
          </div>
          </div>
         
        </div>
        <div className="col col_2">
          <h2 className='titles'>Simple And Easy</h2>
          <p className='desc'>Browse videos and contact the agent.</p>
          <p className='desc'>Your next home is waiting for you.</p>
          <p className='desc'>Check out our social media pages.</p>
          <div className="icons">
            <span className='react_icons'> <FaInstagram /> </span>
            <span className='react_icons'> <FaFacebookSquare /> </span>
          </div>
        </div>
      </div>
    </div>
  )
}
