'use client'

import React, { useState } from 'react'
import Input from '@/components/Input';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Button from '@/components/Button';
import Container from '@/components/Container';
import Heading from '@/components/Heading';
import ImageUpload from './../../../components/ImageUpload';
import CategoryInput from '@/components/categories/CategoryInput';
import { categories } from '@/components/categories/Categories';
import KakaoMap from '@/components/KakaoMap';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const ProductUploadPage = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        setValue,
        watch, //react-hook-form 에서 제공하는 함수, defaultValues 내용이 업데이트 될 때마다 실행
        formState: {
            errors
        },
        reset
    } = useForm<FieldValues>({// check 필요
        defaultValues:{
            title:'',
            description: '',
            category:'',
            latitude: 33.5563,
            longitude: 126.79581,
            imageSrc:'',
            price:1
        }
    })
    const imageSrc = watch('imageSrc')
    const category = watch('category')
    const latitude = watch('latitude')
    const longitude = watch('longitude')

    const KakaoMap = dynamic(() => import('@/components/KakaoMap'),{
        ssr:false
    })

    const setCustomValue = (id: string, value: any) =>{
        setValue(id, value)
    }
    const onSubmit: SubmitHandler<FieldValues> = (data) =>{
        setIsLoading(true)

        axios.post('/api/products', data)
            .then((response) =>{
                router.push(`/products/${response.data.id}`)
            })
            .catch((err)=>{
                console.error(err)
            })
            .finally(()=>{
                setIsLoading(false)
            })
    }

    return (
        <Container>
            <div
                className='
                    max-w-screen-lg
                    mx-auto
                '
                onSubmit={handleSubmit(onSubmit)}
            >
                <Heading 
                    title="Product Upload"
                    subtitle="upload your product"
                />
                <ImageUpload 
                    onChange={(value) => setCustomValue('imageSrc', value)}
                    value={imageSrc}
                />
                <form 
                    className='
                        flex
                        flex-col
                        gap-8
                    '
                >
                    <hr />
                    <Input
                        id="title"
                        label="Title"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                    />
                    <hr />
                    <Input
                        id="description"
                        label="Description"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                    />
                    <hr />
                    <Input
                        id="price"
                        label="Price"
                        formatPrice
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                    />
                    <hr />
                    <div
                        className='
                            grid
                            grid-cols-1
                            md:grid-cols-2
                            gap-3
                            max-h-[50vh]
                            overflow-y-auto
                        '
                    >
                        {categories.map((item)=>(
                            <div key={item.label} className='col-span-1'>
                                <CategoryInput
                                    onClick={(category) => setCustomValue('category',category)}
                                    selected={category === item.path}
                                    label={item.label}
                                    icon={item.icon}
                                    path={item.path}
                                />
                            </div>
                        ))}
                    </div>
                    <hr />
                    <KakaoMap 
                        setCustomValue={setCustomValue}
                        latitude={latitude}
                        longitude={longitude}
                    />
                    <Button 
                        label="상품 생성하기"
                    />
                </form>
            </div>
        </Container>
    )
}

export default ProductUploadPage