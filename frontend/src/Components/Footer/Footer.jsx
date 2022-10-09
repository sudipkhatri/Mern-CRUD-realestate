import React from 'react'
import './Footer.css';

export default function Footer() {
  return (
    <div className='footer'>
      <p>This is build as a project for realestate company for educational purpose and for learning.</p>
      <br/>
      <p>@makeyear {' ' + new Date().getFullYear()}</p>
    </div>
  )
}
