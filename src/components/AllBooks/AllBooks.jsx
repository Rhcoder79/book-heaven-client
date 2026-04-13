import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const AllBooks = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/products')
            .then(res => res.json())
            .then(data => setBooks(data))
            .catch(error => console.error('Error fetching books:', error));
    }, []);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/products/${id}`, {
                    method: 'DELETE'
                })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        Swal.fire("Deleted!", "Book has been removed.", "success");
         
                        const remaining = books.filter(book => book._id !== id);
                        setBooks(remaining);
                    }
                });
            }
        });
    };

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
                            <h2 className="card-title text-xl font-bold">{book.title}</h2>
                            <p className="text-sm text-gray-500 italic">By {book.author}</p>
                            
                           
                            <div className="card-actions mt-4 flex justify-between items-center border-t pt-4">
                            
                                <Link to={`/allBooks/${book._id}`} className="btn btn-primary btn-xs">Details</Link>
                                
                             
                                <Link to={`/update-book/${book._id}`} className="btn btn-warning btn-xs">Update</Link>
                                
                            
                                <button 
                                    onClick={() => handleDelete(book._id)} 
                                    className="btn btn-error btn-xs">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllBooks;