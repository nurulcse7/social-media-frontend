import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthProvider/AuthProvider';

const PrivateRouter = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const location = useLocation();

    if (loading) {
        return
    }
    if (user?.uid) {
        return children
    }
    return <Navigate to='/SignIn' state={{ from: location }} />
};

export default PrivateRouter;