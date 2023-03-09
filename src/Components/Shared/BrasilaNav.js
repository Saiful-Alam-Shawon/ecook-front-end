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
            {/* <Upper></Upper> */}
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {/* <li><a href=" #">Item 1</a></li> */}
                            {/* <Link to='/rooms' className='px-4 py-3'>
                                <li>Rooms</li>
                            </Link>
                            <Link to='/restaurant' className='px-4 py-3'>
                                <li>Restaurant</li>
                            </Link>
                            <Link to='/meeting' className='px-4 py-3'>
                                <li>Meeting</li>
                            </Link>
                            <Link to='/service' className='px-4 py-3'>
                                <li>Service</li>
                            </Link>
                            <Link to='/offer' className='px-4 py-3'>
                                <li>Offer</li>
                            </Link> */}
                            {/* <Link to='/login' className='px-4 py-3'>
                                <li>Login</li>
                            </Link>
                            <Link to='/register' className='px-4 py-3'>
                                <li>Register</li>
                            </Link> */}
                            {/* <Link to='/payment' className='px-4 py-3'>
                                <li>Payment</li>
                            </Link>
                            <Link to='/check' className='px-4 py-3'>
                                <li>Checkout</li>
                            </Link> */}
                            {/* <li onClick={handleLogOut} className='px-4 py-3'>LogOut</li> */}
                            {/* <li tabIndex={0}>
                                <a href=" #" className="justify-between">
                                    Parent
                                    <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg>
                                </a>
                                <ul className="p-2">
                                    <li><a href=" #">Submenu 1</a></li>
                                    <li><a href=" #">Submenu 2</a></li>
                                </ul>
                            </li>
                            <li><a href=" #">Item 3</a></li> */}
                        </ul>
                    </div>
                    {/* <a href=" #" ></a> */}
                    <Link to='/' className="btn btn-ghost normal-case bg-black text-xl text-white hover:text-black">E-Cook
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {/* {
                            user?.email &&
                            <span>{user?.email}</span>
                        } */}
                        {/* <Link to='/rooms' className='px-4 py-3'>
                            <li>Rooms</li>
                        </Link>
                        <Link to='/restaurant' className='px-4 py-3'>
                            <li>Restaurant</li>
                        </Link>
                        <Link to='/meeting' className='px-4 py-3'>
                            <li>Meeting</li>
                        </Link>
                        <Link to='/service' className='px-4 py-3'>
                            <li>Service</li>
                        </Link>
                        <Link to='/offer' className='px-4 py-3'>
                            <li>Offer</li>
                        </Link> */}

                        {/* <Link to='/login' className='px-4 py-3'>
                            <li>Login</li>
                        </Link>
                        <Link to='/register' className='px-4 py-3'>
                            <li>Register</li>
                        </Link> */}
                        {/* <Link to='/payment' className='px-4 py-3'>
                            <li>Payment</li>
                        </Link>
                        <Link to='/check' className='px-4 py-3'>
                            <li>Checkout</li>
                        </Link> */}

                        {/* <li><a href=" #">Item 1</a></li>
                        <li tabIndex={0}>
                            <a href=" #">
                                Parent
                                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
                            </a>
                            <ul className="p-2">
                                <li><a href=" #">Submenu 1</a></li>
                                <li><a href=" #">Submenu 2</a></li>
                            </ul>
                        </li>
                        <li><a href=" #">Item 3</a></li> */}
                    </ul>
                </div>
                <div className="navbar-end">
                    {/* <div className="chat-image avatar">
                        <div className=" w-10">
                            <FaUserAlt></FaUserAlt>
                        </div>
                    </div> */}
                    {email ?
                        <>
                            <div className="dropdown dropdown-end text-center mr-5">
                                <label tabIndex={0} className="btn btn-ghost btn-circle avatar" >
                                    <div className="w-10 rounded-full">
                                        <div className="chat-image avatar btn">
                                            <div >
                                                {/* <FaUserSecret/> */}
                                                <FaUserAlt className=' mt-3 mr-20 ' ></FaUserAlt>
                                            </div>
                                        </div>
                                    </div>

                                </label>
                                <ul tabIndex={0} className="mt-3 text-white p-2 bg-slate-900 shadow menu menu-compact dropdown-content  rounded-box w-52">
                                    {/* <li>
                                <a className="justify-between"> */}
                                    {/* Profile */}
                                    {/* <span className="badge">New</span> */}
                                    {/* </a>
                            </li> */}
                                    <li className='text-xs text-lime-500'>{email}</li>
                                    <Link to='/dashboard' className='px-4 py-3'>
                                        <li>Dashboard</li>
                                    </Link>
                                    {/* <li><a>Settings</a></li> */}
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
                            {/* <a ></a> */}
                        </>
                    }










                </div>
            </div>
        </div>
    );



};

export default BrasilaNav;