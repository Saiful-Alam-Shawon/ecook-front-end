import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthShare } from '../../Firebase/AuthContext';
import useAdmin from './useAdmin';

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthShare);
    const [isAdmin, isAdminLoading] = useAdmin(user?.email);

    const location = useLocation();

    if (loading || isAdminLoading) {
        return <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-red-400 text-center "></div>
    };

    if (user && isAdmin) {
        return children;
    };

    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default AdminRoute;