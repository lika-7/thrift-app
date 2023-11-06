'use client'
import { Product, User } from '@prisma/client'
import React from 'react'

interface ProductClientProps {
    product: Product & {user: User} // user property 안에 내용이 들어 있으니 {user: User}로 선언
    currentUser?: User | null
}

const ProductClient = ({product, currentUser}:ProductClientProps) => {
    return (
        <div>ProductClient</div>
    )
}

export default ProductClient