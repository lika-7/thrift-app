'use client'
import Container from '@/components/Container'
import { Product, User } from '@prisma/client'
import React from 'react'
import ProductInfo from '@/components/products/ProductInfo';
import ProductHead from '@/components/products/ProductHead';
import dynamic from 'next/dynamic';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';

interface ProductClientProps {
    product: Product & {user: User} // user property 안에 내용이 들어 있으니 {user: User}로 선언
    currentUser?: User | null
}

const ProductClient = ({product, currentUser}:ProductClientProps) => {
    const router = useRouter()
    const KakaoMap = dynamic(() => import('@/components/KakaoMap'),{
        ssr:false
    })

    return (
        <Container>
            <div
                className='max-w-screen-lg mx-auto'
            >
                <div className='flex flex-col gap-6'>
                    <ProductHead 
                    title={product.title}
                    imageSrc={product.imageSrc}
                    id={product.id}
                    currentUser={currentUser}
                />    
                </div>
                <div
                    className='grid grid-cols-1 mt-6 md:grid-cols-2 md:gap-10'
                >
                    <ProductInfo />
                    <div>
                        <KakaoMap  
                            detailPage
                            latitude={product.latitude}
                            longitude={product.longitude}
                        />
                    </div>
                </div>
                <div
                    className='mt-10'
                >
                    <Button 
                        label='이 유저와 채팅하기'
                        onClick={() => router.push('/chat')}
                    />
                </div>
            </div>
        </Container>
    )
}

export default ProductClient