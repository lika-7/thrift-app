import { User } from '@prisma/client'
import React from 'react'
import {AiOutlineHeart, AiFillHeart} from 'react-icons/ai'

interface HeartButtonProps {
    productId: string
    currentUser?: User | null
}

const HeartButton = ({
    productId,
    currentUser
}:HeartButtonProps) => {
  return (
    <div className='relative transition cursor-pointer hover:opacity-80'>
        <AiOutlineHeart 
            size={28} className='absolute fill-white -top-[2px] -right-[2px]'
        />
        <AiFillHeart 
            size={24} className='fill-rose-500'
        />
    </div>
    
  )
}

export default HeartButton