import React from 'react'
import './Home.css';
import Head from './Components/HomePage/Head'
import Body from './Components/HomePage/Body'
import Footer from './Components/Footer/Footer';
//import PostDetail from './Components/Main/PostDetail'
import Post from './Components/Main/Post'

export default function Home() {
  return (
    <div className='all_components'>
      <div className="header">
        <Head />
      </div>
      <div className="body">
        <div className="body_body">
            <Body />
        </div>
        <div className="body_posts">
          <Post />
        </div>
      </div>
       <div className="footer">
        <Footer />
      </div>
      {/* <PostDetail/> */}
      
    </div>
  )
}
