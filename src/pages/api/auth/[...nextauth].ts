import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const authOptions:NextAuthOptions={
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text",placeholder:"jsmith"},
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const user = {id: "1", name: "J Smith", email: "jsmith@example.com"}// 이 예제에서는 user 하드코딩 되어 있음
        if (user){
          return user
        }else{
          return null
        }
      }
    })
  ],
  session: { // session option 부분
    strategy: 'jwt',
  }
}
export default NextAuth(authOptions)