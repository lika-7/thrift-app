import getCurrentUser from "@/app/actions/getCurrentUser"
import { NextResponse } from "next/server"

interface Params{
    productId?:string
}

export async function POST(request: Request, { params }: {params: Params}){
    console.log('params',params)
    const currentUser = await getCurrentUser()
    
    if(!currentUser){
        return NextResponse.error()//클라이언트에 오류 응답을 반환
    }

    const { productId } = params

    if(!productId || typeof productId !=='string'){
        throw new Error('Invalid ID') // 서버상 에러 발생
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])] // ...쓰는 것은 기존 배열 변경하지 않고 새로운 배열 작성하기 위함

    favoriteIds.push(productId)

    const user = await prisma?.user.update({
        where:{
            id: currentUser.id
        },
        data:{
            favoriteIds: favoriteIds
        }
    })

    return NextResponse.json(user)
}

export async function DELETE(request: Request, { params }: {params: Params}){
    console.log('params',params)
    const currentUser = await getCurrentUser()
    
    if(!currentUser){
        return NextResponse.error()//클라이언트에 오류 응답을 반환
    }

    const { productId } = params

    if(!productId || typeof productId !=='string'){
        throw new Error('Invalid ID') // 서버상 에러 발생
    }

    let favoriteIds = [...(currentUser.favoriteIds || [])] // ...쓰는 것은 기존 배열 변경하지 않고 새로운 배열 작성하기 위함

    favoriteIds = favoriteIds.filter(id => id!==productId)

    const user = await prisma?.user.update({
        where:{
            id: currentUser.id
        },
        data:{
            favoriteIds: favoriteIds
        }
    })

    return NextResponse.json(user)
}