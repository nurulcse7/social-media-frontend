import React, { } from 'react';
import { toast } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import SmallLoader from '../../Shared/Loader/SmallLoader';
import Comments from './Comments';
import { Link } from 'react-router-dom';

const CommentsBox = ({ comment, setComment, post, user }) => {
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['comments', post?._id],
        queryFn: () => fetch(`${process.env.REACT_APP_ApiUrl}comments?id=${post?._id}`).then(res => res.json())
    })
    if (isLoading) {
        return <SmallLoader />
    }
    function formatDate(date) {
        let dd = date.getDate() + 1;
        if (dd < 10) dd = "0" + dd;
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        let strTime =
            monthNames[date.getMonth()] + "/" + dd;
        return strTime;
    }
    const currentDate = formatDate(new Date());

    const handleSubmitComment = (e) => {
        e.preventDefault()
        const postId = post?._id
        const data = {
            postId, comment, userEmail: user?.email, userName: user?.displayName, userPhoto: user?.photoURL, commentDate: currentDate
        }
        fetch(`${process.env.REACT_APP_ApiUrl}comments`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(data) }).then(res => res.json()).then(result => {
            if (result.acknowledged) {
                setComment(null)
                e.target.reset()
                refetch()
                toast.success('Comment posted', { duration: 1000 })
            }
        })
    }
    return (
        <section >
            <div className=" w-full bg-white p-2 rounded shadow-lg">
                <div className="p-3 w-full">
                    <form onSubmit={handleSubmitComment}>
                        <textarea onChange={(e) => setComment(e.target.value)} required rows="3" className="border p-2 mb-1 rounded w-full" placeholder="Write something..."></textarea>

                    {
                            user?.email ? <> {
                                comment ? <button disabled={!comment || !user?.email} className="px-4 py-1  bg-gray-800 text-white rounded font-light hover:bg-gray-700">Submit</button> : <button disabled={!comment || !user?.email} className="px-4 py-1  bg-gray-500 text-white rounded font-light ">Submit</button>
                            }</> : <>
                                    <p className='py-3 text-red-400'>Sign in first then you can comment <Link to='/SignIn.' className='border-b text-primary border-primary font-bold'>Sign In</Link></p>
                                </>
                    }
                    
                    </form>
                </div>
                {data?.length > 0 && <div className='pt-3 mt-5 border-t'>
                    {data.map(singleComment =>
                        <Comments
                            key={singleComment._id}
                            singleComment={singleComment}
                        />)}
                </div>}
            </div>

        </section>
    );
};

export default CommentsBox;