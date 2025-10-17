import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { motion } from "motion/react"
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const Result = () => {
    
    const [image , setImage] = useState(assets.sample_img_1)
    const [isImageLoaded , setImageLoaded] = useState(false)
    const [loading , setLoading] = useState(false)
    const [input , setInput ] = useState('')
    const {generateImage} = useContext(AppContext)

    const onSubmitHandler = async(e) =>{
          e.preventDefault()
          setLoading(true)
          if(input){
             const image = await generateImage(input)
             if(image){
                setImageLoaded(true)
                setImage(image)
             }
          }
          setLoading(false)
    }

  return (
    <motion.form onSubmit={onSubmitHandler} className='flex flex-col min-h-[90vh] justify-center items-center'
     initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    >
    <div>
        <div className='relative'>
             <img src={image} className='max-w-sm rounded'  />
             <span className={`absolute bottom-0 left-0 h-1 bg-white-500 ${loading ? 'w-full transition-all duration-[10s]' : 'w-0'}
             `}/>
        </div>
        <p className={!loading ? 'hidden' : ''}>Loading...</p>
    </div>

    {!isImageLoaded && 

    <div className='flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full'>

       <input 
       onChange={e => setInput(e.target.value)} value={input}
       type='text' placeholder='Describe what you want to generate' className='flex-1 bg-transparent outline-none ml-8 max-sm:w-20' />
       <button type='submit' className='bg-zinc-900 px-10 sm:px-16 py-3 rounded-full'>
            Generate
       </button>
    </div>
    }

   {isImageLoaded &&
    <div className='flex gap-4 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full'>
        <p onClick={()=>{setImageLoaded(false)}} className='bg-black text-white font-medium px-8 py-3 rounded-full 
             shadow-md cursor-pointer 
             hover:bg-zinc-800 hover:shadow-lg hover:shadow-zinc-500/40
             transition-all duration-300 ease-in-out 
             transform hover:scale-105 active:scale-95 border border-zinc-700'>Generate Another</p>
        <a href={image} className='bg-black text-white font-medium px-8 py-3 rounded-full 
             shadow-md cursor-pointer 
             hover:bg-zinc-800 hover:shadow-lg hover:shadow-zinc-500/40
             transition-all duration-300 ease-in-out 
             transform hover:scale-105 active:scale-95 border border-zinc-700'>Download</a>
    </div>
   }
  </motion.form>

      
  )
}

export default Result