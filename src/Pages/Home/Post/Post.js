import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';
import SmallLoader from '../../../Shared/Loader/SmallLoader';

const Post = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };
  function formatDate(date) {
    let dd = date.getDate() + 1;
    if (dd < 10) dd = '0' + dd;
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    let strTime = monthNames[date.getMonth()] + '/' + dd;
    return strTime;
  }
  const currentDate = formatDate(new Date());

  const postSubmit = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('image', selectedImage);
    fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imageKey}`,
      { method: 'POST', body: formData }
    )
      .then((res) => res.json())
      .then((img) => {
        if (img.success) {
          const image = img.data.url;
          const data = {
            userEmail: user?.email,
            userPhoto: user?.photoURL,
            userName: user?.displayName,
            picture: image,
            message: message,
            postDate: currentDate,
            loveReact: 0,
          };
          fetch(`${process.env.REACT_APP_ApiUrl}posts`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify(data),
          })
            .then((res) => res.json())
            .then((result) => {
              if (result.acknowledged) {
                navigate('/media');
                toast.success('posted', { duration: 1500 });
                setLoading(false);
              }
            });
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <section className='sm:flex sm:h-screen sm:mb-20 mb-36 mt-11 sm:mt-0 justify-center items-center '>
      <div className='sm:w-96'>
        <h1 className='font-bold text-4xl text-center pb-4 border-b mb-3 '>
          Create Post
        </h1>
        <div className='flex gap-2 mb-3'>
          <img className='w-12 h-12 rounded-full' src={user?.photoURL} alt='' />
          <div>
            <h2>{user?.displayName}</h2>
            <select className='bg-transparent' name='' id=''>
              <option value=''>Friend of friends </option>
              <option value=''>Friend </option>
              <option value=''>Only me</option>
            </select>
          </div>
        </div>
        <div className='max-h-96 h-full '>
          <div className='z-10 top-0 w-full'>
            <textarea
              onChange={(e) => setMessage(e.target.value)}
              className='p-2 border-none outline-none bg-transparent w-full rounded-sm'
              placeholder={`What's on your mind, ${user?.displayName}?`}
            ></textarea>
            <div className='extraOutline py-4 m-auto rounded-lg'>
              <div className='file_upload p-5 relative w-full border-4 border-dotted border-primary rounded-lg'>
                <div className=''>
                  {selectedImage ? (
                    <div>
                      <label
                        htmlFor='uploadImage'
                        className='absolute cursor-pointer z-50 top-2 bg-primary py-1 px-3 rounded-sm '
                      >
                        Add new{' '}
                      </label>
                      <div className='flex relative justify-center '>
                        <img
                          className='max-h-[400px] min-h-[250px] '
                          src={URL.createObjectURL(selectedImage)}
                          alt=''
                        />
                      </div>
                    </div>
                  ) : (
                    <div className='animate-pulse'>
                      <svg
                        className='text-indigo-500 w-24 mx-auto mb-4'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                        />
                      </svg>
                      <div className='input_field flex flex-col w-max mx-auto text-center'>
                        <label htmlFor='uploadImage'>
                          <div className='text bg-indigo-600 text-white border border-primary rounded font-semibold cursor-pointer p-1 px-3 hover:bg-indigo-500'>
                            Select
                          </div>
                        </label>

                        <div className='title text-indigo-500 uppercase'>
                          or drop files here
                        </div>
                      </div>
                    </div>
                  )}

                  <input
                    id='uploadImage'
                    className='text-sm cursor-pointer w-36 hidden'
                    type='file'
                    onChange={imageChange}
                    accept='image/*'
                  />
                </div>
              </div>
              <button
                onClick={postSubmit}
                className=' w-full btn btn-primary rounded-md mt-3'
                disabled={!message || loading}
              >
                {loading ? <SmallLoader /> : 'Post'}{' '}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Post;
