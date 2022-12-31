import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import SmallLoader from '../../Shared/Loader/SmallLoader';
import MediaCard from './MediaCard';

const MyPosts = () => {
  const { user } = useContext(AuthContext);
  const { data: posts, isLoading } = useQuery({
    queryKey: ['myPosts', user?.email],
    queryFn: () =>
      fetch(`${process.env.REACT_APP_ApiUrl}myPosts?email=${user?.email}`).then(
        (res) => res.json()
      ),
  });
  if (isLoading) {
    return <SmallLoader />;
  }
  return (
    <div>
      <div className='grid sm:w-[500px] mx-auto  gap-6 mt-5'>
        <Link className='sticky top-16 z-50' to='/postForm'>
          <button
            type='button'
            className='w-full py-2 font-semibold rounded dark:bg-primary dark:text-gray-900'
          >
            Create Post{' '}
          </button>
        </Link>
        {posts?.map((post) => (
          <MediaCard key={post?._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default MyPosts;
