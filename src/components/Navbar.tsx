'use client' // useState를 사용하기 위해서 선언
import Link from 'next/link'
import React, { useState } from 'react'
import NavItem from './NavItem'

function Navbar() {
    // nextJS는 기본적으로 서버 컴포넌트임
    // useState는 클라이언트 컴포넌트임
    const [menu, setMenu] = useState(false)

    const handelMenu= function (){
        setMenu(!menu)
    }
    return (
        <nav className='relative z-10 w-full bg-orange-500 text-white'>
            <div className='flex items-center justify-between mx-5 sm:mx-10 lg:mx-20'>
                <div className='flex items-center text-2xl h-14'>
                    <Link href="/">Logo</Link>
                </div>
                <div className="text-2xl sm:hidden">
                    {menu === false 
                        ? <button onClick={handelMenu}>+</button>
                        :<button onClick={handelMenu}>-</button>
                    }
                </div>
                <div className='hidden sm:block'>
                    <NavItem />
                </div>
            </div>
            
            <div className="block sm:hidden">
                {/* //분기처리 하기 위해 위해 Navitem 있고 아래도 Navitem 있음
                //mobile은 분기처리 하기 위해서 props를 넣어준거임 */}
                {(menu === false) ? null : <NavItem mobile/>}
            </div>
        </nav>
    )
}
export default Navbar