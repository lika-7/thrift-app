import { User } from '@prisma/client'
import { signIn, signOut} from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

interface NavItemProps{
    mobile?: boolean
    currentUser?: User | null
}

const NavItem = ({mobile, currentUser}: NavItemProps) => {//Navbar안에서 2개의 NavItem 선언함, 하나는 props를 안쓰고 하나는 props로 mobile을 받아 optional chainging을 씀

    return (
        <ul className={`text-md justify-center flex gap-4 w-full items-center ${mobile && "flex-col h-full"}`}>{/*props로 mobile이 들어오면 위에서 아래로 아이탬을 배치하라는 말*/}
            <li className='py-2 text-center border-b-4 cursor-pointer'>
                <Link href="/admin">Admin</Link>
            </li>
            <li className='py-2 text-center border-b-4 cursor-pointer'>
                <Link href="/user">User</Link>
            </li>
            {currentUser
                ?<li className='py-2 text-center border-b-4 cursor-pointer'>
                    <button onClick={()=>signOut()}>SignOut</button>
                </li>
                :<li className='py-2 text-center border-b-4 cursor-pointer'>
                    <button onClick={()=>signIn()}// 버튼 클릭하면 next-auth sign in 호출
                    >SignIn</button>
                </li>
            }
        </ul>
    )
}

export default NavItem