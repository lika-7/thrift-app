import React from 'react'
import { IconType } from 'react-icons'

interface ButtonProps {
    label:string,
    onClick?: (e:React.MouseEvent<HTMLButtonElement>) => void,
    disabled?: boolean,
    outline?: boolean,
    small?: boolean,
    icon?: IconType
}

const Button:React.FC<ButtonProps> = ({
    label,
    onClick,
    disabled,
    outline,
    small,
    icon: Icon //??????????? 아래 사용하는거 보니까 icon을 Icon으로 바꾸는 것 같음
}) => {
  return (
    <button 
        type='submit'
        disabled={disabled}    
        onClick={onClick}
        className={`
            relative
            disabled: opacity-70
            disabled: cursor-not-allowed
            rounded-lg
            hover:opacity-80
            transition
            w-full
            ${outline ? 'bg-white' : 'bg-orange-500'}
            ${outline ? 'border-black' : 'border-orange-500'}
            ${outline ? 'text-black' : 'text-white'}
            ${small ? 'text-sm' : 'text-md'}
            ${small ? 'PY-1' : 'PY-3'}
            ${small ? 'font-light' : 'font-semibold'}
            ${small ? 'border-[1px]' : 'border-2'}
        `}
    >
       {Icon &&(
            <Icon size={24} className='absolute left-4 top-3'/>
       )} 
    </button>
  )
}

export default Button