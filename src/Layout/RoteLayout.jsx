import React from 'react';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Footer/Footer';
import { ToastContainer } from 'react-toastify';

const RoteLayout = () => {
    return (
        <div className='min-h-screen flex flex-col'>
            <Navbar ></Navbar>
            <div className='container mx-auto flex-1'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
            <ToastContainer position='top-center'></ToastContainer>
        </div>
    );
};

export default RoteLayout;