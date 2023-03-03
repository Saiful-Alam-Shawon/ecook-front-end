import React, { useContext } from 'react';
import { AuthShare } from '../../Firebase/AuthContext';
import { Link, Outlet } from 'react-router-dom';
import Navbar from './../../Shared/Navbar';
import useAdmin from './useAdmin';
import useSeller from './useSeller';
import useBuyer from './useBuyer';

const DashBoardLayout = () => {
    const { user } = useContext(AuthShare);
    const [isAdmin] = useAdmin(user?.email);
    // const [isBuyer] = useSeller(user?.email); 
    const [isSeller] = useSeller(user?.email);
    // const [isSeller] = useSeller(user?.email)
    const [isBuyer] = useBuyer(user?.email);
    // console.log(isBuyer);
    const adminMenu = <>
        <li><Link to='/dashboard/allusers' className='bg-black text-white'>All Users</Link></li>
        <li><Link to='/dashboard/allsellers' className='bg-black text-white my-3'> Sellers</Link></li>
        <li><Link to='/dashboard/allbuyers' className='bg-black text-white'> Buyers</Link></li>
    </>
    const sellerMenu = <>
        <li><Link to='/dashboard/seller' className='bg-black text-white'>My Products</Link></li>
        <li ><Link to='/dashboard/addproduct' className='bg-black text-white mt-3'> Add Products</Link></li>
    </>
    const buyerMenu = <><li><Link to='/dashboard/buyer' className='bg-black text-white'>My Orders</Link></li></>




    if (isAdmin)
        return (
            <div>
                <Navbar></Navbar>


                <div className="drawer drawer-mobile">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        <Outlet></Outlet>
                        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-80 bg-base-100 text-base-content">

                            {adminMenu}

                        </ul>

                    </div>
                </div>
            </div>

        );

    if (isBuyer)
        return (
            <div>
                <Navbar></Navbar>


                <div className="drawer drawer-mobile">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        <Outlet></Outlet>
                        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-80 bg-base-100  text-base-content">

                            {buyerMenu}

                        </ul>

                    </div>
                </div>
            </div>
        );

    if (isSeller)
        return (
            <div>
                <Navbar></Navbar>


                <div className="drawer drawer-mobile">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        <Outlet></Outlet>
                        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-80 bg-base-100 text-base-content">

                            {sellerMenu}

                        </ul>

                    </div>
                </div>
            </div>
        );
};

export default DashBoardLayout;