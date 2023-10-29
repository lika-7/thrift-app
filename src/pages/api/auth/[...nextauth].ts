import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "@/helpers/prismadb"
import bcrypt from 'bcryptjs'
export const authOptions:NextAuthOptions={
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text"},
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if(!credentials?.email || !credentials?.password){
          throw new Error('Invalid credentials')
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        if(!user || !user?.hashedPassword){ //Oauth로 로그인 한것 처리
          throw new Error('Invalid credentials')
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        )

        if(!isCorrectPassword){
          throw new Error('Invalid credentials')
        }
        
        return user
      }
    })
  ],
  session: { // session option 부분
    strategy: 'jwt',
  },
  jwt:{
    secret: process.env.JWT_SECRET,
    maxAge: 30*24*60*60 // 30일
  },
  pages:{
    signIn: '/auth/login'
  },
  callbacks: {
    async jwt({token, user}){
      // console.log('token',token)
      // console.log('user',user)
      return {...token, ...user}
    },
    async session({session, token}){//token 안에 데이터가 들어 있기 위해서 위에 jwt를 선언해줌
      // console.log('@',session, token)
      session.user = token
      return session
    }
  }
}
export default NextAuth(authOptions)