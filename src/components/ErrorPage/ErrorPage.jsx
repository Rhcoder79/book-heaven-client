import React from 'react';
import { Link } from 'react-router';


const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 text-center p-5">
            <h1 className="text-9xl font-black text-primary">404</h1>
            <p className="text-3xl font-bold mt-4">Oops! Page Not Found</p>
            <p className="text-gray-500 mt-2 mb-8">
                The page you are looking for might have been removed or is temporarily unavailable.
            </p>
            <Link to="/" className="btn btn-primary px-8">
                Back to Home
            </Link>
        </div>
    );
};

export default ErrorPage;