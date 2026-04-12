import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar/Navbar';

const RootLayout = () => {
    return (
   
        <div className="flex flex-col min-h-screen">
            <Navbar />
            
            <main className=" grow max-w-7xl mx-auto p-4 w-full">
                <Outlet />
            </main>

            <footer className="footer footer-center p-10 bg-base-200 text-base-content border-t">
                <aside>
                    <p className="font-bold">Book Heaven Ltd.</p> 
                    <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
                </aside>
            </footer>
        </div>
    );
};

export default RootLayout;