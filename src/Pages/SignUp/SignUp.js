import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GrGallery } from 'react-icons/gr'
import login from '../../Assests/login.webp'
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import { toast } from 'react-hot-toast';
const SignUp = () => {
    const [selectImage, setSelectImage] = useState()
    const { createUserWithEmailAndPass, userProfileUpdate, continueWithGoogle, setLoading } = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState({ name: '', email: '', password: '' })
    const [firebaseError, setFirebaseError] = useState('');
    const location = useLocation()
    const from = location.state?.from?.pathname || "/";
    const navigate = useNavigate()
    const imageChange = e => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectImage(e.target.files[0])
        }
    }
    function formatDate(date) {
        const yyyy = date.getFullYear();
        let dd = date.getDate() + 1;
        if (dd < 10) dd = "0" + dd;
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        let strTime =
            monthNames[date.getMonth()] + "/" + dd + "/" + yyyy;
        return strTime;
    }
    const currentDate = formatDate(new Date());

    const createUser = (e) => {
        setLoading(true)

        e.preventDefault()
        const formData = new FormData()
        formData.append('image', selectImage)
        fetch(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imageKey}`, { method: 'POST', body: formData }).then(res => res.json()).then(img => {
            if (img.success) {
                const image = img.data.url
                createUserWithEmailAndPass(userInfo.email, userInfo.password)
                    .then(result => {
                        userProfileUpdate(userInfo.name, image)
                        const user = result.user
                        const currentUser = {
                            joiningDate: currentDate,
                            name: userInfo.name,
                            email: user?.email,
                            picture: image,
                            password: userInfo.password

                        }
                        fetch(`${process.env.REACT_APP_ApiUrl}users?email=${user?.email}`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(currentUser) }).then(res => res.json()).then(result => {
                            if (result.acknowledged) {
                                setFirebaseError(null)
                                navigate(from, { replace: true })
                                setLoading(false)
                                toast.success('Sign Up Successful', { duration: 1500 })
                            }
                        })

                    }).catch(error => {
                        setLoading(false);
                        setFirebaseError(error.message);
                    });
                setFirebaseError('');
            }
        })
    }

    const googleSignIn = () => {
        setLoading(true)
        continueWithGoogle().then(result => {
            const user = result.user
            const currentUser = {
                joiningDate: currentDate,
                name: user.name,
                email: user?.email,
                picture: user?.photoURL,

            }
            fetch(`${process.env.REACT_APP_ApiUrl}users?email=${user?.email}`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(currentUser) }).then(res => res.json()).then(result => {
                if (result.acknowledged) {
                    setFirebaseError(null)
                    navigate(from, { replace: true })
                    setLoading(false)
                    toast.success('Sign Up Successful', { duration: 1500 })
                }
            })
        }).catch(error => {
            setLoading(false);
            setFirebaseError(error.message);
        });
        setFirebaseError('');
    }
    return (
        <section>
            <div className='md:h-screen md:flex justify-center items-center'>
                <img className='md:w-1/2' src={login} alt="" />
                <div className='sm:w-96 mx-auto'>
                    {firebaseError && (
                        <p className=" text-center text-red-400 font-semibold">{firebaseError.replaceAll('Firebase:', ' ').replaceAll('Error', " Error:").replaceAll('(auth/', ' ').replaceAll('email', 'Email').replaceAll(')', '')}</p>
                    )}
                    <h1 className='font-bold text-4xl pb-2 text-center '>Welcome!  </h1>
                    <p className='text-center pb-5'>Please sign up for your account</p>
                    <form onSubmit={createUser}>
                        <div>
                            <label htmlFor="Name" className='font-semibold'>Name</label>
                            <input required onChange={e => setUserInfo({ ...userInfo, name: e.target.value })} type="Name" id='Name' placeholder="Enter Your Name" className="input mt-1 input-bordered block rounded-sm input-success w-full" />
                        </div>
                        <div className='mt-3'>
                            <label htmlFor="email" className='font-semibold'>Email</label>
                            <input onChange={e => setUserInfo({ ...userInfo, email: e.target.value })} required type="email" id='email' placeholder="Enter Your Email" className="input mt-1 input-bordered block rounded-sm input-success w-full" />
                        </div>

                        <div className='mt-3'>
                            <label htmlFor="password" className='font-semibold'>Password</label>
                            <input onChange={e => setUserInfo({ ...userInfo, password: e.target.value })} required type="password" id='password' placeholder="Enter Your password" className="input mt-1 input-bordered block rounded-sm input-success w-full" />
                        </div>
                        <div className='mt-3'>
                            {selectImage ? <div className='h-48 w-full overflow-y-scroll'>
                                <p className='text-center'>
                                    <label htmlFor='uploadImage'>
                                        Upload new
                                    </label>
                                </p>

                                <div className='flex justify-center '>
                                    <img className='' src={URL.createObjectURL(selectImage)} alt="" />
                                </div>
                            </div> : <label htmlFor='uploadImage' className="flex flex-col w-full border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                                <div className="flex flex-col py-2 items-center justify-center">
                                    <GrGallery className='w-8 h-8' />
                                    <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                        Select a photo</p>
                                </div>
                            </label>
                            }
                            <input required id='uploadImage' onChange={imageChange} accept='image/*' hidden type="file" className="opacity-0" />
                        </div>
                        <div className='mt-6'>
                            <input disabled={!selectImage} type="submit" value='SignUp' className="input font-semibold cursor-pointer input-bordered block rounded-sm input-success bg-primary w-full" />
                        </div>
                        <p className="mt-5 text-center text-md">
                            <span>Already have an account?</span>
                            <Link to='/SignIn' href="#" className="font-semibold ml-2 hover:text-primary">Sign In</Link>
                        </p>
                    </form>
                    <div className='mt-6'>
                        <button onClick={googleSignIn} className=' btn btn-outline btn-primary font-semibold cursor-pointer block rounded-sm w-full'>
                            Continue With Google
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignUp;