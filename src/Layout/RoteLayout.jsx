import React from 'react';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Footer/Footer';

const RoteLayout = () => {
    return (
        <div className='min-h-screen flex flex-col'>
            <Navbar ></Navbar>
            <div className='container mx-auto'>
                <Outlet></Outlet>
            </div>
            <Footer ></Footer>
        </div>
    );
};

export default RoteLayout;