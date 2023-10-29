import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export async function getSession(){
    return await getServerSession(authOptions)
}

export default async function getCurrentUser(){ //어떠한 컴포넌트에서나 세션 데이터를 가져오려면 이 함수를 호출하면 됨
    try {
        const session = await getSession()

        if(!session?.user?.email){
            return null
        }

        const currentUser = await prisma?.user.findUnique({
            where: {
                email: session.user.email
            }
        })

        if(!currentUser){
            return null
        }
        return currentUser

    } catch (error) {
        return null
    }
}