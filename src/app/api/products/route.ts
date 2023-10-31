import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '@/helpers/prismadb';

export async function  POST(request: Request){
    const currentUser = await getCurrentUser()

    if(!currentUser){ // 로그인 되어 있을 때 동작
        return NextResponse.error()
    }

    const body = await request.json() //요청 내용 받기

    const {
        title,
        description,
        imageSrc,
        category,
        latitude,
        longitude,
        price
    }= body

    //body의 key 값 중 하나라도 없으면 에러를 반환함
    Object.keys(body).forEach((value)=>{ 
        if(!body[value]){
            return NextResponse.error()
        }
    })

    const product = await prisma.product.create({
        data:{
            title,
            description,
            imageSrc,
            category,
            latitude,
            longitude,
            price: Number(price),
            userId: currentUser.id
        }
    })
    return NextResponse.json(product)
}