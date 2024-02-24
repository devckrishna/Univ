'use client'
import React from 'react';
import { redirect, useRouter } from 'next/navigation';


const Sidecard = () => {

    const router = useRouter();
    const func = () => router.push('/');
        
    const style = {
        minHeight:'250px',
        height:'100%',
        backgroundImage:`url('https://images.unsplash.com/photo-1542773998-9325f0a098d7?auto=format&fit=crop&w=320')`
    }
    
    return (
        <>
            
        <div className="relative w-full h-full flex items-end justify-start text-left bg-cover bg-center cursor-pointer" style={style} >
            <div className="absolute top-0 mt-20 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-900">
            </div>
            <div className="absolute top-0 right-0 left-0 mx-5 mt-2 flex justify-between items-center">
                {/* <a href="#" className="text-xs bg-indigo-600 text-white px-5 py-2 uppercase hover:bg-white hover:text-indigo-600 transition ease-in-out duration-500">Politics</a> */}
                <div className="text-white font-regular flex flex-col justify-start">
                    <span className="text-3xl leading-0 font-semibold">25</span>
                    <span className="-mt-3">May</span>
                </div>
            </div>
            <main className="p-5 z-10">
                <a href="#" className="text-md tracking-tight font-medium leading-7 font-regular text-white hover:underline">
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">  
                    Admissions 2024 Brochure
                </h3>
                </a>
                <p className='text-white'> Harvard University </p>
            </main>

        </div>


        </>
    )
}

export default Sidecard;