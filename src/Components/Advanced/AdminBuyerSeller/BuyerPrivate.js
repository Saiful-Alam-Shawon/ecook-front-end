import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthShare } from '../../Firebase/AuthContext';
import useBuyer from './useBuyer';

const BuyerPrivate = ({ children }) => {
    const { user, loading } = useContext(AuthShare);
    const [isBuyer, isBuyerLoading] = useBuyer(user?.email);
    const location = useLocation();

    if (loading || isBuyerLoading) {
        return <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400 text-center"></div>
    }

    if (user && isBuyer) {
        return children;
    }

    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default BuyerPrivate;