import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Shared/Footer';
import BrasilaNav from './../Shared/BrasilaNav';

const Main = () => {
    return (
        <>
            <BrasilaNav></BrasilaNav>
            <Outlet></Outlet>
            <Footer></Footer>
        </>
    );
};

export default Main;