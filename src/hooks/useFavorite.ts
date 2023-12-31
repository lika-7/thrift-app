import { User } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useMemo } from "react"
import { toast } from "react-toastify"

interface UseFavorite {
    productId: string
    currentUser?: User | null
}

const useFavorite = ({productId, currentUser}: UseFavorite) =>{
    const router = useRouter()
    
    const hasFavorite = useMemo(()=>{
        const list = currentUser?.favoriteIds || [] // currentUser?.favoriteIds가 없으면 빈 배열 

        return list.includes(productId)
    }, [currentUser, productId])

    const  toggleFavorite = async (e: React.MouseEvent<HTMLDivElement>) =>{// e의 타입도 정리하기 제네릭 들어가는 부분도 있고 궁금함
        e.stopPropagation()

        if(!currentUser){ // 로그인 되어 있지 않으면 그냥 리턴
            toast.warn('먼저 로그인을 해주세요.')
            return
        }
        try {
            let request
            if(hasFavorite){
                request = () => axios.delete(`/api/favorites/${productId}`)
            }else{
                request = () => axios.post(`/api/favorites/${productId}`)
            }

            await request()
            router.refresh()
            toast.success('성공했습니다')
        } catch (error) {
            toast.error('실패했습니다')
        }
    }

    return {
        hasFavorite,
        toggleFavorite
    }
}

export default useFavorite