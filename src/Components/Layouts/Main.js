import React from 'react';
import { Outlet } from 'react-router-dom';
import Search from '../Pages/Search';
import Footer from '../Shared/Footer';
import Navbar from '../Shared/Navbar';
import LeftSide from './Sidar/LeftSide';
import RightSide from './Sidar/RightSide';
import BrasilaNav from './../Shared/BrasilaNav';

const Main = () => {
    return (
        <>
            {/* <Navbar></Navbar> */}
            <BrasilaNav></BrasilaNav>
            <Outlet></Outlet>
            <Footer></Footer>
        </>
    );
};

export default Main;