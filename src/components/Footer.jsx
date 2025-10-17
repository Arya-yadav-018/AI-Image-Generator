import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='flex itmes-center justify-between gap-4 py-3 mt-20'>
       
       <img src={assets.logo} width={150}/>

       <p className="w-full border-t border-gray-400 pt-4 text-center md:text-left text-sm text-gray-600">
  © {new Date().getFullYear()} Image-Crafter. All rights reserved.
</p>

       <div className='flex gap-2'>
          <img src={assets.facebook_icon} width={35}/>
           <img src={assets.instagram_icon} width={35}/>
            <img src={assets.twitter_icon} width={35}/>
       </div>
       
    </div>
  )
}

export default Footer