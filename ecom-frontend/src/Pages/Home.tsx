import React from 'react'
import Hero from '../Components/Hero'
    // import icons


export default function Home() {
    const token = localStorage.getItem('token')
    console.log(token)
    
    return (
    <div className="main">
        <Hero />
    </div>
  )
}
