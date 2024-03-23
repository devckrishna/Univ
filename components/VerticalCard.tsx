import React from 'react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

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

const Verticalcard = ({post}:Props) => {
    
    const router = useRouter();
    console.log(post.description.length," ",post.description);
    return (
        <>
            <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    <img className="rounded-t-lg w-full" src="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286" alt="" />
                </a>
                <div className="p-5">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{post.title}</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{post.description.length>200?post.description.substring(0,200) + "......":post.description}</p>
                    <Button className='w-full' onClick={()=>router.push(`/dashboard/post/${post.id}`)}>Read More</Button>
                </div>
            </div>
        </>
    )
}

export default Verticalcard;