'use client'
import { useRouter } from 'next/navigation';
import React from 'react';

type PostSchema = {
    id:string;
    title:string;
    images:string[];
    description:string;
    created_at:Date,
    university_name:string
}

type Props = {
    post:PostSchema
}

const Sidecard = ({post}:Props) => {
    const router = useRouter();
    // console.log('Sidecard component prop',post)
    const d = new Date(post.created_at).toDateString().split(" ");
    // console.log(d)

    const style = {
        minHeight:'250px',
        height:'100%',
        backgroundImage:`url('https://images.unsplash.com/photo-1542773998-9325f0a098d7?auto=format&fit=crop&w=320')`
    }
    
    return (
        <>
                
            <div className="relative w-full h-full flex items-end justify-start text-left bg-cover bg-center cursor-pointer" style={style} onClick={()=>router.push(`/post/${post.id}`)} >
                <div className="absolute top-0 mt-20 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-900">
                </div>
                <div className="absolute top-0 right-0 left-0 mx-5 mt-2 flex justify-between items-center">
                    <div className="text-white font-regular flex flex-row justify-start">
                        <span className="text-3xl leading-0 font-semibold">{d[2]}</span>
                        <span className="ml-1 mt-3 font-bold">{d[1]}</span>
                    </div>
                </div>
                <main className="p-5 z-10">
                    <a href="#" className="text-md tracking-tight font-medium leading-7 font-regular text-white hover:underline">
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">  
                        {post.title}
                    </h3>
                    </a>
                    <p className='text-white'> {post.university_name} </p>
                </main>

            </div>
        </>
    )
}

export default Sidecard;