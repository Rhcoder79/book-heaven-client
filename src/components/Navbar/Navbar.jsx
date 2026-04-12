import React from 'react';
import { Link } from 'react-router';
import logo from "./../../assets/Book-Haven.png";
import { use } from 'react';
import { AuthContext } from '../../contexts/AuthContext';


const Navbar = () => {

    const {user,signOutUser}=use(AuthContext);

      const handleSignOut = () => {
        signOutUser()
            .then()
            .catch()
    }

    const navLinks = (
        <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/allBooks">All Books</Link></li>
            {/* <li><Link to="/addBook">Add Book</Link></li>
            <li><Link to="/myBooks">My Books</Link></li> */}
       {
        user && <>
         <li><Link to="/addBook">Add Book</Link></li>
        <li><Link to="/myBooks">My Books</Link></li>
        </>

       }
            {/*
             <li><Link to="/addBook">Add Book</Link></li>
            <li><Link to="/myBooks">My Books</Link></li>
             */}
        </>
    );

    return (
     <div className='border-b border-gray-300 '>
          <div className="navbar bg-base-100 max-w-7xl mx-auto mt-3 px-4 sm:px-6 lg:px-8 ">
            <div className="navbar-start">
                
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52">
                        {navLinks}
                    </ul>
                </div>
                
                <Link to="/" className="flex items-center">
                    <img src={logo} alt="logo" className="h-12 md:h-16 w-auto" />
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
          
                <ul className="menu menu-horizontal px-1 gap-2 font-medium">
                    {navLinks}
                </ul>
            </div>

            <div className="navbar-end gap-4">
            {user ? (
                        <div className="flex items-center gap-3">
                           
                            <div className="tooltip tooltip-bottom" data-tip={user?.displayName || "User Name"}>
                                <div className="avatar">
                                    <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img src={user?.photoURL || "https://i.ibb.co/mR79Y6B/user.png"} alt="user" />
                                    </div>
                                </div>
                            </div>
                            <button onClick={handleSignOut} className="btn btn-sm md:btn-md btn-primary">Sign Out</button>
                        </div>
                    ) : (
                        <div className='flex gap-2'>
                            <Link to='/login' className="btn btn-sm md:btn-md btn-outline">Login</Link>
                            <Link to='/register' className="btn btn-sm md:btn-md btn-primary">Register</Link>
                        </div>
                    )}
            </div>
        </div>
     </div>

    );
};

export default Navbar;