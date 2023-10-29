import React from 'react'

interface ContainerProps {
    children: React.ReactNode //무슨 내용임??  분석 필요
}

const Container = ({children}: ContainerProps) => {
  return (
    <div
        className='
            max-w-[2520px]
            mx-auto
            xl:px-20
            md:px-10
            sm:px-2px-4
            py-6
        '
    >{children}</div>
  )
}

export default Container