import React from 'react';

const SmallLoader = () => {
    return (
        <div className='text-center'>
            <div className="border-dashed border-gray-800 animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
            </div>
        </div>
    );
};

export default SmallLoader;