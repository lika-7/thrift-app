import { CldUploadWidget } from 'next-cloudinary'
import React from 'react'
import {TbPhotoPlus} from 'react-icons/tb'
import Image from 'next/image'

interface ImageUploadProps {
    onChange: (value:string)=>void
    value: string
}

const ImageUpload = ({
    onChange,
    value
}: ImageUploadProps) => {
    const handelUpload = (result: any) =>{
        console.log('result',result)
        onChange(result.info.secure_url)//secure_url은 https 로 받기 위해 사용
    }

    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

    return (
        <CldUploadWidget
            onUpload={handelUpload}
            uploadPreset={uploadPreset}
            options={{
                maxFiles:1 //파일 한게만 넣어주기
            }}
        >
            {({open}) =>{ // destructureing으로 open 씀
                return (
                    <div
                        onClick={()=> open?.()}
                        className='
                            relative flex flex-col items-center justify-center gap-4 p-20 transition border-2 border-dashed cursor-pointer hover:opacity-70 border-neutral-300 text-neutral-300'
                    >
                        <TbPhotoPlus 
                            size={50}
                        />
                        {value &&( //이미지 데이터 있을 때 보여주는 화면
                            <div className='absolute inset-0 w-full h-full'>
                                <Image 
                                    fill
                                    style={{objectFit: 'cover'}}
                                    src={value}
                                    alt=""
                                />
                            </div>
                        )}
                    </div>
                )
            }}
        </CldUploadWidget>
    )
}

export default ImageUpload
