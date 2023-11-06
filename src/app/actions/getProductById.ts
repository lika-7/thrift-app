import prisma from '@/helpers/prismadb'

interface Params{
    productId?: string
}

export default async function getProductById(params: Params){
    try{
        const { productId } = params

        const product = await prisma?.product.findUnique({
            where:{
                id: productId
            },
            include:{ // id가 productId인 내용을 찾고 user를 추가하라는 말
                user: true
            }
        })

        if(!product) return null
        return product

    }catch(error: any){
        throw new Error(error)
    }
}