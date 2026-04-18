import React, {  useEffect, useState } from 'react';
import { Link} from 'react-router';
import Swal from 'sweetalert2';

import axios from 'axios';

const AllBooks = () => {
    const [books, setBooks] = useState([]);
    const [originalBooks, setOriginalBooks] = useState([]);
    const [loading, setLoading] = useState(true);
  

   useEffect(() => {
        
        axios.get('https://the-book-haven-server-xi.vercel.app/products')
            .then(res => {
                setBooks(res.data);
                setOriginalBooks(res.data);
                setLoading(false); 
            })
            .catch(err => {
                console.error('Error:', err);
                setLoading(false); 
            });
    }, []);
  if (loading) {
    return (
        <div className="flex justify-center items-center min-h-100">
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
    );
}

    const handleSortChange = (e) => {
        const sortType = e.target.value;
        let sortedBooks = [...originalBooks];

        if (sortType === 'highToLow') {
            sortedBooks.sort((a, b) => b.rating - a.rating);
        } else if (sortType === 'lowToHigh') {
            sortedBooks.sort((a, b) => a.rating - b.rating);
        }
        
        setBooks(sortedBooks);

        if(sortType !== 'normal') {
            Swal.fire({
                title: 'Sorted Successfully',
                icon: 'success',
                timer: 1000,
                showConfirmButton: false,
                toast: true,
                position: 'top-end'
            });
        }
    };

   
    return (
        <div className="container mx-auto mt-10 p-4">
            <h2 className="text-4xl font-bold text-center mb-6">Explore Our Book Heaven</h2>
            
          
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-10">
                <label className="font-bold text-lg text-gray-700">Sort By Rating:</label>
                <select 
                    onChange={handleSortChange} 
                    className="select select-bordered w-full max-w-xs border-primary focus:outline-primary font-semibold"
                >
                    <option value="normal">Normal (Default)</option>
                    <option value="highToLow">Rating: High to Low  ↓</option>
                    <option value="lowToHigh">Rating: Low to High ↑</option>
                </select>
            </div>

            {/* Books Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {books.map(book => (
                    <div key={book._id} className="card bg-base-100 shadow-xl border border-gray-100 hover:scale-105 transition-transform duration-300">
                        <figure className="px-6 pt-6">
                            <img src={book.coverImage} alt={book.title} className="rounded-xl h-60 w-full object-cover" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title text-xl font-bold">{book.title}</h2>
                            <p className="text-sm text-gray-500 italic">By {book.author}</p>
                            <p className="text-blue-600 font-bold">Rating: {book.rating} ⭐</p>
                            <div className="card-actions mt-4 flex justify-between items-center border-t pt-4">
                                <Link to={`/allBooks/details/${book._id}`} className="btn btn-primary btn-xs">Details</Link>
                                <Link to={`/allBooks/update/${book._id}`} className="btn btn-warning btn-xs">Update</Link>
                             
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {books.length === 0 && (
                <p className="text-center text-gray-500 mt-8">No books found.</p>
            )}
        </div>
    );
};

export default AllBooks;