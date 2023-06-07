// import { useState, useRef } from 'react'
import './music.css'
import axios from 'axios'

export const Music = () => {

axios.get("http://localhost:3003/students",  { timeout: 5000 })
.then(response => {
  console.log(response.data)})

  return (
    <div className='music'>
      Music
    </div>
  );
}