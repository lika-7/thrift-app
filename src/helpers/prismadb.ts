import { PrismaClient } from "@prisma/client";

declare global{
    var prisma: PrismaClient | undefined
}

const client = globalThis.prisma || new  PrismaClient() //prisma 인스턴스 없으면 생성

if(process.env.NODE_ENV !=='production') globalThis.prisma = client

export default client
