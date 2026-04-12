import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const AllBooks = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/products')
            .then(res => res.json())
            .then(data => setBooks(data))
            .catch(error => console.error('Error fetching books:', error));
    }, []);

    return (
        <div className="container mx-auto mt-10 p-4">
            <h2 className="text-4xl font-bold text-center mb-10">Explore Our Book Heaven</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {books.map(book => (
                    <div key={book._id} className="card bg-base-100 shadow-xl border border-gray-100 hover:scale-105 transition-transform duration-300">
                        <figure className="px-6 pt-6">
                            <img src={book.coverImage} alt={book.title} className="rounded-xl h-60 w-full object-cover" />
                        </figure>
                        <div className="card-body">
                            <div className="flex justify-between items-center">
                                <h2 className="card-title text-xl font-bold">{book.title}</h2>
                                <div className="badge badge-secondary">{book.genre}</div>
                            </div>
                            <p className="text-sm text-gray-500 italic">By {book.author}</p>
                            <p className="text-gray-600 line-clamp-2">{book.summary}</p>
                            
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-yellow-500 font-bold">Rating: {book.rating} ⭐</span>
                            </div>
                            
                            <div className="card-actions mt-4">
                                <Link to={`/products/${book._id}`} className="btn btn-primary btn-outline w-full">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllBooks;