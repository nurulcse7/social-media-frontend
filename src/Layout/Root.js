import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthProvider/AuthProvider';
import Footer from '../Shared/Footer/Footer';
import Navbar from '../Shared/Navbar/Navbar';

const Root = () => {
    const { loading } = useContext(AuthContext);
    return (
        <div>
            {!loading &&
                <>
                    <div className="px-4 pb-5 pt-2 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
                        <Navbar />
                        <Outlet />
                    </div>
                    <Footer />
                </>}
        </div>
    );
};

export default Root;