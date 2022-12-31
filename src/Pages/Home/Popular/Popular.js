import { useQuery } from '@tanstack/react-query';
import React from 'react';
import SmallLoader from '../../../Shared/Loader/SmallLoader';
import MediaCard from '../../Media/MediaCard';
import { BsBoxArrowInUpRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';
const Popular = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['popularPosts',],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_ApiUrl}popularPosts`)
            const data = await res.json()
            return data
        }
    })

    if (isLoading) {
        return <SmallLoader />
    }
    
    return (
        <section className='my-16'>

            <div className='flex   top-1/2 justify-between items-center pr-2 '>
                <h1 className='text-center font-bold sm:text-4xl pb-3 text-xl'>Popular Post </h1>
                <p ><Link to='/media' className='flex items-center gap-2 bg-primary font-semibold py-2 px-3 ' >View All<BsBoxArrowInUpRight /></Link> </p>
            </div>

            <div className='grid  gap-5 lg:grid-cols-3  mx-auto'>
                {
                    data?.map(popular => <MediaCard key={popular?._id} post={popular} />)
                }
            </div>
        </section>
    );
};

export default Popular;