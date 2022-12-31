import React from 'react';

const Comments = ({ singleComment }) => {
    return (
        <div className='mt-5'>
            <div className="flex   ">
                <div className="mr-2 w-8 h-8">
                    <img className='w-8 h-8 rounded-full' src={singleComment?.userPhoto} alt="" />
                </div>
                <div className='w-full bg-gray-200 py-2 rounded-xl px-3'>
                    <h1 className="font-semibold">{singleComment?.userName}</h1>
                    <p className="text-md text-gray-700"> {singleComment?.comment} </p>
                </div>

            </div>
        </div>
    );
};

export default Comments;