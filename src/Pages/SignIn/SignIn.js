import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import login from '../../Assests/login.webp'
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
const SignIn = () => {
    const { logInWithEmailAndPassword, continueWithGoogle, setLoading } = useContext(AuthContext)
    const [userInfo, setUserInfo] = useState({ email: '', password: '' })
const [firebaseError,setFirebaseError]=useState('')
    const location = useLocation()
    const from = location.state?.from?.pathname || "/";
    const navigate = useNavigate()

    const signGoogle = (e) => {
        e.preventDefault()
        logInWithEmailAndPassword(userInfo.email,userInfo.password).then(result => {
            setLoading(false)
            navigate(from, { replace: true })
            toast.success('Sign In Successful', { duration: 1500 })
        }).catch(error => {
            setLoading(false);
            setFirebaseError(error.message);
        });
        setFirebaseError('');
    }
    const googleContinue = () => {
        setLoading(true)
        continueWithGoogle().then(result => {
            console.log(result);
            navigate(from, { replace: true })
            setLoading(false)
            toast.success('Sign in Successful', { duration: 1500 })
        }).catch(error => {
            setLoading(false);
            setFirebaseError(error.message);
        });
        setFirebaseError('');
    }
    
    return (
        <section className='h-screen md:flex justify-center items-center'>
            <img className='md:w-1/2' src={login} alt="" />
            <div className='sm:w-96 mx-auto'>
                {firebaseError && (
                    <p className=" text-center text-red-400 font-semibold">{firebaseError.replaceAll('Firebase:', ' ').replaceAll('Error', " Error:").replaceAll('(auth/', ' ').replaceAll('email', 'Email').replaceAll(')', '')}</p>
                )}
                <h1 className='font-bold text-4xl pb-2 text-center '>Welcome Back! </h1>
                <p className='text-center pb-5'>Please sign in to your account</p>
                <form onSubmit={signGoogle}>
                    <div className='mt-3'>
                        <label htmlFor="email" className='font-semibold'>Email</label>
                        <input title='Input your valid email' onChange={e => setUserInfo({ ...userInfo, email: e.target.value })} required type="email" id='email' placeholder="Enter Your Email" className="input mt-1 input-bordered block rounded-sm input-success w-full" />
                    </div>

                    <div className='mt-3'>
                        <label htmlFor="password" className='font-semibold'>Password</label>
                        <input onChange={e => setUserInfo({ ...userInfo, password: e.target.value })} required type="password" id='password' placeholder="Enter Your password" className="input mt-1 input-bordered block rounded-sm input-success w-full" />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input id="remember_me" name="remember_me" type="checkbox" className="h-4 w-4 bg-indigo-500 focus:ring-indigo-400 border-gray-300 rounded" />
                            <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                                Remember me
                            </label>
                        </div>
                        <div className="text-sm mt-3">
                            <a href="#" className="font-medium text-indigo-500 hover:text-indigo-500">
                                Forgot your password?
                            </a>
                        </div>
                    </div>
                    <div className='mt-6'>
                        <input type="submit" value='SignIn' className="input font-semibold cursor-pointer input-bordered block rounded-sm input-success bg-primary w-full" />
                    </div>
                    <p className="mt-5 text-center text-md">
                        <span>Don't have an account?</span>
                        <Link to='/SignUp' href="#" className="font-semibold ml-2 hover:text-primary">Sign up</Link>
                    </p>
                </form>
                <div className='mt-6'>
                    <button onClick={googleContinue} className=' btn btn-outline btn-primary font-semibold cursor-pointer block rounded-sm   w-full'>
                        Continue With Google
                    </button>
                </div>
            </div>
        </section>
    );
};

export default SignIn;