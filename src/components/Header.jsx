import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { motion } from "motion/react"
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Header = () => {

  const {user , setShowLogin} = useContext(AppContext)
  const navigate = useNavigate()
  
  const onClickHandler = ()=>{
       if(user){
          navigate('/result')
       }else{
          setShowLogin(true)
       }
  }
    
  return (
    <motion.div className='flex flex-col justify-center items-center text-center my-20 '
    initial={{opacity:0.2, y:100}}
    transition={{duration : 1}}
    whileInView={{opacity : 1, y:0}}
    viewport={{once:true}}
    >


        <motion.div className='text-neutral-700 inline-flex items-center gap-2 bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-1 rounded-full border border-gray-300 shadow-sm hover:shadow-md transition'
          initial={{opacity:0.2, y:-20}}
         animate={{opacity : 1, y:0}}
         transition={{delay : 0.2 ,duration : 0.8}}
        >
            <p>Best text to image generator</p>
            <img src={assets.star_icon} alt=''/>
        </motion.div>

       <motion.h1 className="text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center leading-tight tracking-tight">
        Turn text to <span className="text-emerald-600 drop-shadow-sm">image</span>, in seconds
       </motion.h1>
        
        <p>Bring your ideas to life with AI — transform your imagination into stunning visuals in seconds. Just type, and let the magic unfold.</p>

    <motion.button onClick={onClickHandler} className='sm:text-lg text-white bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 transition-all duration-300 shadow-md w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full'
    
    initial={{ scale: 0.8, rotate: -10, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut", type: "spring", stiffness: 150 }}
      whileHover={{ scale: 1.1, rotate: 2 }}
      whileTap={{ scale: 0.95 }}

    >
    Generate Images
    <img className='h-6' src={assets.star_group}/>
   </motion.button>

      <div className='flex flex-wrap justify-center mt-16 gap-3'>
         {Array(6).fill('').map((items, index)=>(
            <img className='rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10' src={index % 2 === 0 ? assets.sample_img_1 : assets.sample_img_2} alt='' key={index} width={70}/>
         ))}
      </div>

      <p className='mt-2 text-neutral-600'>Generated image from imagify</p>

    </motion.div>
  )
}

export default Header