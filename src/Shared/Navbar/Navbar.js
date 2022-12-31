import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaUserCircle } from 'react-icons/fa';
import { AuthContext } from "../../Contexts/AuthProvider/AuthProvider";
import socialLogo from '../../Assests/Logo/logo48.png'
const Navbar = () => {
    const { user, userLogOut } = useContext(AuthContext)
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItems = <React.Fragment>
        <li>
            <NavLink
                to="/home"
                aria-label="Home"
                title="Home"

                className={({ isActive }) =>
                    isActive ? 'text-primary font-medium tracking-wide transition-colors duration-200 hover:text-deep-purple-accent-400' : 'font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400'
                }
            >
                Home
            </NavLink>
        </li>
        <li>
            <NavLink
                to="/media"
                aria-label="Media"
                title="Media"

                className={({ isActive }) =>
                    isActive ? 'text-primary font-medium tracking-wide transition-colors duration-200 hover:text-deep-purple-accent-400' : 'font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400'
                }
            >
                Media
            </NavLink>
        </li>

        <li>
            <NavLink
                to="/about"
                aria-label="About Us"
                title="About Us"

                className={({ isActive }) =>
                    isActive ? 'text-primary font-medium tracking-wide transition-colors duration-200 hover:text-deep-purple-accent-400' : 'font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400'
                }
            >
                About 
            </NavLink>
        </li>
       
        <li className="sm:hidden block">
            <NavLink
                to="/media/myPosts"
                aria-label="myPost"
                title="myPost"

                className={({ isActive }) =>
                    isActive ? 'text-primary font-medium tracking-wide transition-colors duration-200 hover:text-deep-purple-accent-400' : 'font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400'
                }
            >
                My Post 
            </NavLink>
        </li>

        <li className="w-full sm:w-auto">
            {user?.uid ?
                <div className="flex  gap-2">
                    <button onClick={() => userLogOut()}
                        className="btn sm:w-auto w-full btn-primary rounded-md font-semibold"
                        aria-label="Sign up"
                        title="Sign up"
                    >
                        Sign Out
                    </button>
                    <img className="w-12 h-12 hidden lg:block rounded-full p-1 border-red-600 border" src={user?.photoURL} alt="" />
                </div>
                :
                <Link
                    to='/SignIn'
                    className="btn sm:w-auto w-full btn-primary rounded-md font-semibold"
                    aria-label="Sign In"
                    title="Sign In"
                >
                    Sign In
                </Link>}
        </li>
    </React.Fragment>
    return (
        <div className="sticky z-50 h-full top-0 pt-3 pb-2 bg-[#faf7f5]">
            <div className="relative flex items-center justify-between">
                <Link
                    to="/"
                    aria-label="Social Media"
                    title="Social Media"
                    className="inline-flex items-center"
                >
                    <img className="sm:w-12 w-10" src={socialLogo} alt="" />
                    <span className="sm:ml-2 sm:text-4xl pl-1 font-bold tracking-wide text-gray-800 capitalize">
                        Social Media
                    </span>
                </Link>
                <ul className=" items-center hidden space-x-8 lg:flex">
                    {menuItems}
                </ul>

                <div className="lg:hidden z-50">
                    <button
                        aria-label="Open Menu"
                        title="Open Menu"
                        className="p-1 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
                        onClick={() => setIsMenuOpen(true)}
                    >
                        {user?.uid ?
                            <img className="w-12 lg:hidden block rounded-full p-1 border-red-600 border" src={user?.photoURL} alt="" />
                            : <FaUserCircle className="text-2xl" />}
                    </button>
                    {isMenuOpen && (
                        <div className="absolute top-0 left-0 w-full">
                            <div className="p-5 bg-white border rounded shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <a
                                            href="/"
                                            aria-label="Social Media"
                                            title="Social Media"
                                            className="inline-flex items-center"
                                        >
                                            <img className="sm:w-12 w-10 " src={socialLogo} alt="" />

                                            <span className="sm:ml-2 sm:text-4xl ml-1 font-bold tracking-wide text-gray-800 capitalize">
                                                Social Media
                                            </span>
                                        </a>
                                    </div>
                                    <div>
                                        <button
                                            aria-label="Close Menu"
                                            title="Close Menu"
                                            className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                                                <path
                                                    fill="currentColor"
                                                    d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <nav>
                                    <ul className="space-y-4">
                                        {menuItems}
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default Navbar