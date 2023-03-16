import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthShare } from '../Firebase/AuthContext';
import { FaUserAlt } from 'react-icons/fa';
import useAdmin from '../Advanced/AdminBuyerSeller/useAdmin';
import useSeller from '../Advanced/AdminBuyerSeller/useSeller';
import useBuyer from '../Advanced/AdminBuyerSeller/useBuyer';

const BrasilaNav = () => {


    const { user, logOut } = useContext(AuthShare);
    const email = user?.email;
    // console.log(user);


    const [isAdmin] = useAdmin(user?.email);
    const [isSeller] = useSeller(user?.email);
    const [isBuyer] = useBuyer(user?.email);





    const handleLogOut = () => {
        logOut().then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    };




    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        </ul>
                    </div>
                    <Link to='/' className="btn btn-ghost normal-case bg-black text-xl text-white hover:text-black">E-Cook
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">

                    </ul>
                </div>
                <div className="navbar-end">
                    {email ?
                        <>
                            <div className="dropdown dropdown-end text-center mr-5">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar" >
                                    <div className="w-10 rounded-full">
                                        <div className="chat-image avatar btn">
                                            <div >
                                                <FaUserAlt className=' mt-3 mr-20 ' ></FaUserAlt>
                                            </div>
                                        </div>
                                    </div>

                                </label>
                                <ul tabIndex={0} className="mt-3 text-white p-2 bg-slate-900 shadow menu menu-compact dropdown-content  rounded-box w-52">
                                    <li className='text-xs text-lime-500'>{email}</li>
                                    <Link to='/dashboard' className='px-4 py-3'>
                                        <li>Dashboard</li>
                                    </Link>
                                    <Link to='/'>
                                        <li onClick={handleLogOut} className='px-4 py-3'>LogOut</li>
                                    </Link>
                                </ul>
                            </div>
                        </>
                        :
                        <>
                            <Link to='/login' className="btn bg-black">
                                Login
                            </Link>
                        </>
                    }










                </div>
            </div>
        </div>
    );



};

export default BrasilaNav;