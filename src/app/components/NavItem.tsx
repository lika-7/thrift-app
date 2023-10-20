import Link from 'next/link'
import React from 'react'

const NavItem = ({mobile}: {mobile?: boolean}) => {//Navbar안에서 2개의 NavItem 선언함, 하나는 props를 안쓰고 하나는 props로 mobile을 받아 optional chainging을 씀
    return (
        <ul className={`text-md justify-center flex gap-4 w-full items-center ${mobile && "flex-col h-full"}`}>{/*props로 mobile이 들어오면 위에서 아래로 아이탬을 배치하라는 말*/}
            <li className='py-2 text-center border-b-4 cursor-pointer'>
                <Link href="/admin">Admin</Link>
            </li>
            <li className='py-2 text-center border-b-4 cursor-pointer'>
                <Link href="/admin">User</Link>
            </li>
            <li className='py-2 text-center border-b-4 cursor-pointer'>
                <button>Sinout</button>
            </li>
            <li className='py-2 text-center border-b-4 cursor-pointer'>
                <button>Sinin</button>
            </li>
        </ul>
    )
}

export default NavItem