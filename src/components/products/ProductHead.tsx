import { User } from '@prisma/client'
import React from 'react'
import Heading from '@/components/Heading';
import Image from 'next/image';

import HeartButton from './../HeartButton';

interface ProductHeadProps {
    title: string
    imageSrc: string
    id: string
    currentUser?: User | null
}

const ProductHead = ({
    title,
    imageSrc,
    id,
    currentUser
}:ProductHeadProps) => {
    return (
        <div>
            <Heading 
                title={title}
            />
            <div className='w-full h-[60vh] overflow-hidden rounded-xl relative'>
                <Image 
                    src={imageSrc}
                    fill
                    className='object-cover w-full'
                    alt='product'
                />
                <div className='absolute top-5 right-5'>
                    <HeartButton 
                        productId={id}
                        currentUser={currentUser}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProductHead