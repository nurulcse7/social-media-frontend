import React, { useContext, useState } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { FaCommentDots, FaShareSquare } from 'react-icons/fa';
import { BsHandThumbsUp } from 'react-icons/bs';
import CommentsBox from './CommentsBox';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import { Link } from 'react-router-dom';
import react1 from '../../Assets/Reactions/react-1.png'
import react2 from '../../Assets/Reactions/react-2.png'
import react3 from '../../Assets/Reactions/react-3.png'
import react4 from '../../Assets/Reactions/react-4.png'
import react5 from '../../Assets/Reactions/react-5.png'
import react6 from '../../Assets/Reactions/react-6.png'
import react7 from '../../Assets/Reactions/react-7.png'

const MediaCard = ({ post, refetch }) => {
    const { user } = useContext(AuthContext)
    const [openComment, setOpenComment] = useState(false);
    const [comment, setComment] = useState(null);
    const [react, setReact] = useState()
    const [showDetails, setShowDetails] = useState(false);
    const handleReactions = (e) => {
        const re = {
            reaction: e.reaction,
            reactionId: e.reactId,

        }
        localStorage.setItem(`${e.reaction}`, JSON.stringify(re))
        setReact(e.reaction)
    }
    const jsonFile = localStorage.getItem(`like`)
    const reaction = JSON.parse(jsonFile)

    const handleLoveReact = async (e) => {
        fetch(`${process.env.REACT_APP_ApiUrl}posts?id=${e}`, {
            method: 'PUT', headers: {
                'content-type': 'application/json'
            }, body: JSON.stringify({ countLove: post?.loveReact })
        }).then(res => res.json()).then(result => {
            if (result.acknowledged) {
                refetch()

            }
        })
    }
    return (
        <section >
            <div className=" bg-white shadow-lg rounded-lg hover:border-2 hover:border-primary border-2 border-white">
                <div className=" sm:px-4 px-2 py-6">
                    <div className='flex sm:justify-between border-b pb-2 flex-wrap pr-2'>
                        <div className='flex items-center '>
                            <img alt='' className="w-12 h-12 rounded-full object-cover mr-4 shadow" src={post?.userPhoto} />
                            <div className="">
                                <h2 className="sm:text-lg font-semibold text-gray-900 -mt-1"><Link>{post?.userName}</Link> </h2>
                                <p className="text-gray-700">Joined 12 SEP 2012. </p>
                            </div>
                        </div>
                        <small className="text-sm text-center sm:pl-0 pl-5 text-gray-400 font-semibold" title='submit date'>{post?.postDate}</small>
                    </div>
                    <div className="">

                        <p className="mt-3 text-gray-700 text-justify text-sm pb-4">
                            {
                                !showDetails ? <> {post?.message?.length > 49 ? <>{post?.message.slice(0, 49)} <button onClick={() => setShowDetails(!showDetails)} className='border-b text-primary font-bold'>see more </button></> : post?.message}</> : <> {post?.message?.length > 49 ? <>{post?.message} <button onClick={() => setShowDetails(!showDetails)} className='border-b text-primary font-bold'>see less  </button></> : post?.message}</>
                            }
                        </p>
                        <div className='mb-5 flex justify-center'>
                            <PhotoProvider>
                                <PhotoView src={post?.picture}>
                                    <img className='sm:h-[300px] rounded-md' src={post?.picture} alt="" />
                                </PhotoView>
                            </PhotoProvider>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                            <div className="  text-gray-700 text-sm mr-3">

                                <div className="dropdown dropdown-hover transition-all">
                                    <label tabIndex={0} className=" flex cursor-pointer m-1">
                                        {reaction?.reaction === 'like' && reaction.reactionId === post._id ? <>
                                            <img className='w-6 h-6 rounded-full mr-2' src={react1} alt="" />     <span className='pr-3 border-r border-gray-300 mr-3'>Like</span>
                                        </> : <p className='flex' onClick={() => handleReactions({ reaction: 'like', reactId: post?._id })}><BsHandThumbsUp onClick={() => handleLoveReact(post?._id)} className='mr-1 text-lg ' /> <span className='pr-3 border-r border-gray-300 mr-3'>Like</span></p>}


                                        <span  >{post?.loveReact}</span>
                                    </label>
                                    <ul tabIndex={0} className="dropdown-content transition-all cursor-default flex justify-between -top-9 p-2 shadow bg-base-100 rounded-box w-52">
                                        <li onClick={() => handleReactions({ reaction: 'like', reactId: post?._id })} className='cursor-pointer' >
                                            <img onClick={() => handleLoveReact(post?._id)} src={react1} alt="" />
                                        </li>
                                        <li onClick={() => handleReactions({ reaction: 'heart', reactId: post?._id })} className='cursor-pointer' >
                                            <img onClick={() => handleLoveReact(post?._id)} src={react2} alt="" />
                                        </li>
                                        <li onClick={() => handleReactions({ reaction: 'cure', reactId: post?._id })} className='cursor-pointer' >
                                            <img onClick={() => handleLoveReact(post?._id)} src={react3} alt="" />
                                        </li>
                                        <li onClick={() => handleReactions({ reaction: 'haha', reactId: post?._id })} className='cursor-pointer' >
                                            <img onClick={() => handleLoveReact(post?._id)} src={react4} alt="" />
                                        </li>
                                        <li onClick={() => handleReactions({ reaction: 'wow', reactId: post?._id })} className='cursor-pointer' >
                                            <img onClick={() => handleLoveReact(post?._id)} src={react5} alt="" />
                                        </li>
                                        <li onClick={() => handleReactions({ reaction: 'sad', reactId: post?._id })} className='cursor-pointer' >
                                            <img onClick={() => handleLoveReact(post?._id)} src={react6} alt="" />

                                        </li>
                                        <li onClick={() => handleReactions({ reaction: 'angry', reactId: post?._id })} className='cursor-pointer' >
                                            <img onClick={() => handleLoveReact(post?._id)} src={react7} alt="" />

                                        </li>
                                    </ul>
                                </div>

                            </div>
                            <div onClick={() => setOpenComment(!openComment)} className="flex  cursor-pointer text-gray-700 text-sm mr-8">
                                <FaCommentDots className='mr-1 text-lg' />
                                <span>8</span>
                            </div>
                            <div className="flex   text-gray-700 text-sm mr-4">
                                <FaShareSquare className='mr-1 text-lg ' />
                                <span>share</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {openComment && <>
                <CommentsBox post={post} comment={comment} user={user} setComment={setComment} />
            </>}
        </section>
    );
};

export default MediaCard;