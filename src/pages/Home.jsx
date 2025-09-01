import { useEffect, useState } from 'react'
import PostCard from '../components/PostCard'
import arrow from '../assets/arrow.png';
import { Link } from 'react-router-dom'
const Home =() =>{

  return (
    <div className=' min-h-screen bg-gradient-to-r from-[#1e520c] to-[#52ac68] height-100vh '>

      <div className="hero  text-white p-3 rounded-md">
        <div className='flex flex-col items-center justify-center text-center'>
          <h1 className="h1 py-8">Welcome to Generative Future</h1>
          <h1 className="h1">Explore fresh dev insights</h1>
         
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
              Reimagining <span className="gradient-text  text-emerald-950">Digital Future</span>
              <br />Starts Here
            </h1>
            
            <p className="text-xl md:text-2xl text-primary-foreground/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              Explore ideas, innovations, and insights that are reshaping our world 
              towards a more sustainable and regenerative future.
            </p>
             <p className="muted">Latest programming languages, tools, and trends — by developers, for developers.</p>
        </div>

      </div>
      <div>
         <div className='flex flex-row items-center justify-center text-center mt-10'>
         <Link to ="/posts" >
          <button className=' bg-white py-1 px-4  flex rounded-md'>Explore Articles More 
            <img src={arrow} alt="arrow" className="w-5 h-5 mx-auto mb-4" />
          </button></Link>

          <Link to ="/signup" >
             
               <button className='ml-15 bg-white py-1 px-4 rounded-md hover:bg-emerald-900 hover:text-white'> Join Community</button>
              </Link>
            </div>

      </div>

        
   
    </div>
  )
}
export default Home
