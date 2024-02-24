import React from 'react';
import { Button } from './ui/button';

const Verticalcard = () => {
    // const backgroundImageUrl = `${process.env.PUBLIC_URL}/img8.jpg`;
    return (
        <>
            <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    <img className="rounded-t-lg w-full" src="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286" alt="" />
                </a>
                <div className="p-5">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Duis est ullamco culpa aute fugiat qui aliqua in. Qui dolore veniam dolore laborum commodo. Mollit id laborum cillum voluptate veniam nisi laboris. Duis incididunt dolor fugiat esse velit consequat cillum elit qui. Laborum mollit magna reprehenderit amet enim aliqua elit eiusmod reprehenderit amet velit.</p>
                    <Button className='w-full'>Read More</Button>
                </div>
            </div>

            
        </>
    )
}

export default Verticalcard;