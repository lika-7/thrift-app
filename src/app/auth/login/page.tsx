'use client'
import Button from '@/components/Button'
import Input from '@/components/Input'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
 
 const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false)
    const {register, handleSubmit, formState:{ errors }} = useForm<FieldValues>({
        defaultValues:{
            email:'',
            password:''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = async (body) =>{
        setIsLoading(true)
        try {
            const data = signIn('credentials', body)
            console.log(data)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
     <section className='grid h-[calc(100vh_-_56px)] place-items-center'>
        <form 
            className='flex flex-col justify-center gap-5 min-w-[350px]'
            onSubmit={handleSubmit(onSubmit)}
        >
            <h1 className='text-2xl'>Login</h1>
            <Input 
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}//props로 전달하는 register는 useForm에 있는 함수임 register 함수임
                errors={errors}
                required
            />
            <Input 
                id="password"
                label="Password"
                type="Password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Button 
                label='Login'
            />
            <div className='text-center'>
                <p className='text-gray-400'>
                    Not a member?{" "}
                    <Link href="/auth/register" className='text-black hover:underline'>
                        Register
                    </Link>
                </p>
            </div>
        </form>
     </section>
   )
 }
 
 export default LoginPage