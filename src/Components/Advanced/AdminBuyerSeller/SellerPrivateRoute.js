import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthShare } from '../../Firebase/AuthContext';
import useSeller from './useSeller';

const SellerPrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthShare);
    const [isSeller, isSellerLoading] = useSeller(user?.email);
    const location = useLocation();

    if (loading || isSellerLoading) {
        return <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-red-400 text-center"></div>
    }

    if (user && isSeller) {
        return children;
    }

    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default SellerPrivateRoute;