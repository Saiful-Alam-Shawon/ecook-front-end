import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthShare } from '../Firebase/AuthContext';

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthShare);
    const location = useLocation();

    if (loading) {
        return <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400 text-center text-red-300"></div>
    }

    if (user) {
        return children;
    }

    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default PrivateRoutes;