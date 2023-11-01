import prisma from '@/helpers/prismadb'

export interface ProductsParams{
    latitude?: number
    longitude?: number
    category?: string
}

export default async function getProducts(params: ProductsParams){
    try {
        const { latitude, longitude, category} = params
        let query: any = {}

        if(category){// 쿼리한 내용에 category 있을 때 사용
            query.category = category
        }

        if(latitude){//내가 선택한 지역 범위내 상품 목록 보려줄라고 범위 지정
            query.latitude={
                gte: Number(latitude) - 0.01,
                lte: Number(latitude) + 0.01,
            }
        }

        if(longitude){
            query.longitude={
                gte: Number(longitude) - 0.01,
                lte: Number(longitude) + 0.01,
            }
        }

        const products = await prisma.product.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc'
            }
        })
        return {
            data: products
        }

    } catch (error: any) {
        throw new Error(error)
    }
}