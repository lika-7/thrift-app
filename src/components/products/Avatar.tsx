import Image from 'next/image'
import React from 'react'

interface AvatarProps{
    src: string | null
}

const Avatar = ({src}:AvatarProps) => {
    return (
        <Image 
            className='w-10 h-10 rounded-full'
            height={30}
            width={30}
            alt='Avatar'
            src={src || '/placeholder.jpg'} // 이미지 위치를 /로 하면 public부터 시작함
        />
    )
}

export default Avatar