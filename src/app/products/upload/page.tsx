'use client'

import React, { useState } from 'react'
import Input from '@/components/Input';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Button from '@/components/Button';
import Container from '@/components/Container';
import Heading from '@/components/Heading';

const ProductUploadPage = () => {
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        setValue,
        watch,
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

    const onSubmit: SubmitHandler<FieldValues> = (data) =>{

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
                <form 
                    className='
                        flex
                        flex-col
                        gap-8
                    '
                >
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
                        {/*category*/}
                    </div>
                    <hr />
                    {/*kakaoMap*/}
                    <Button 
                        label="상품 생성하기"
                    />
                </form>
            </div>
        </Container>
    )
}

export default ProductUploadPage