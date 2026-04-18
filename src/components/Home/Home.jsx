import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const Home = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/products')
            .then(res => res.json())
            .then(data => {
                setBooks(data.slice(0, 6)); 
            });
    }, []);

    return (
        <div className="space-y-16 pb-10">
            
            
            <section className="mt-6 bg-linear-to-r from-blue-700 to-indigo-800 rounded-2xl p-8 md:p-16 text-white text-center shadow-2xl">
               
                <div className="animate-fade-in"> 
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-pulse">
                        Discover Your Next Favorite Book
                    </h1>
                    <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                        Explore our vast collection of books and manage your library easily.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link to="/allBooks" className="btn btn-warning shadow-lg border-none">All Books</Link>
                        <Link to="/allBooks/addBook" className="btn btn-outline text-white hover:bg-white hover:text-black">Add New Book</Link>
                    </div>
                </div>
            </section>

        
<section>
    <h2 className="text-3xl font-bold mb-8 border-l-4 border-blue-600 pl-3">Latest Arrivals</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
            <div 
                key={book._id} 
                className="card bg-base-100 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
                <figure className="h-64 overflow-hidden bg-gray-200">
              
                    <img 
                        src={book.coverImage || "https://via.placeholder.com/300x400"} 
                        alt={book.title} 
                        className="w-full h-full object-cover" 
                    />
                </figure>
                <div className="card-body">
                   
                    <h3 className="card-title">{book.title}</h3>
                    
                  
                    <p className="text-blue-600 font-bold">Rating: {book.rating} ⭐</p>
                    
                    <div className="card-actions justify-end">
                       <Link to={`/allBooks/details/${book._id}`} className="btn btn-primary btn-xs">Details</Link>
                    </div>
                </div>
            </div>
        ))}
    </div>
</section>
            
            <section className="py-10">
                <h2 className="text-3xl font-bold text-center mb-10">Top Genres</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['Fiction', 'Sci-Fi', 'History', 'Crime'].map(genre => (
                        
                        <div key={genre} className="bg-white border-2 border-blue-100 p-6 rounded-xl text-center hover:bg-blue-600 hover:text-white transition-colors cursor-pointer group shadow-sm">
                            <h4 className="text-xl font-bold group-hover:scale-110 transition-transform">{genre}</h4>
                        </div>
                    ))}
                </div>
            </section>

         
            <section className="bg-gray-100 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-10">
                <div className="md:w-1/2">
                    <img 
                        src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                        alt="About" 
                        className="rounded-2xl shadow-xl"
                    />
                </div>
                <div className="md:w-1/2">
                    <h2 className="text-4xl font-bold mb-4">About Book Haven</h2>
                    <p className="text-gray-700 text-lg mb-6">
                        We are passionate about connecting readers with great books. Our platform allows you to browse, add, and manage your collection with a seamless experience.
                    </p>
                    <button className="btn btn-primary">Learn More</button>
                </div>
            </section> 

        </div>
    );
};

export default Home;