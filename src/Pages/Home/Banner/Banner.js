import React from 'react';
import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';

const Banner = () => {
  return (
    <div>
      <section className='py-6 '>
        <div className='container grid gap-6 mx-auto dark:text-gray-50 text-center lg:grid-cols-2 xl:grid-cols-5'>
          <div className='w-full px-6 py-16 rounded-md sm:px-12 md:px-16 xl:col-span-2 dark:bg-gray-900'>
            <span className='block mb-2 dark:text-primary'>
              Own Media design system
            </span>
            <TypeAnimation
              sequence={[
                'Social Media Platform',
                3000, // Waits 3s
                'Build it with a Social Media Platform', // Deletes 'One' and types 'Two'
                30000, // Waits 40s

                () => {
                  console.log('Done typing!'); // Place optional callbacks anywhere in the array
                },
              ]}
              wrapper='div'
              cursor={true}
              repeat={Infinity}
              className='md:text-5xl text-3xl font-extrabold'
            />
            <p className='my-8'>
              <span className='font-medium '>Modular and versatile.</span>This
              social media bio is one of your first opportunities to make an
              impression on your audience. A good bio can make the difference
              between whether or not a user chooses to follow you.
            </p>
            <Link to='/postForm'>
              <button
                type='button'
                className='w-full py-2 font-semibold rounded dark:bg-primary dark:text-gray-900'
              >
                Create Post{' '}
              </button>
            </Link>
          </div>
          <img
            src='https://source.unsplash.com/random/480x360'
            alt=''
            className='object-cover w-full rounded-md xl:col-span-3 dark:bg-gray-500'
          />
        </div>
      </section>
    </div>
  );
};

export default Banner;
