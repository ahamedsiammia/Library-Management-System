import React from 'react';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Footer/Footer';

const RoteLayout = () => {
    return (
        <div className='max-w-7xl mx-auto min-h-screen flex flex-col'>
            <Navbar ></Navbar>
            <div className=''>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default RoteLayout;