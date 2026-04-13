import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState({});

    useEffect(() => {
        fetch(`http://localhost:3000/products/${id}`)
            .then(res => res.json())
            .then(data => setBook(data));
    }, [id]);

    return (
        <div className="container mx-auto mt-10 p-5">
            <div className="flex flex-col lg:flex-row bg-base-100 shadow-2xl rounded-3xl overflow-hidden border">
                <div className="lg:w-1/3">
                    <img src={book.coverImage} alt={book.title} className="h-full w-full object-cover" />
                </div>
                <div className="p-10 lg:w-2/3 space-y-4">
                    <div className="badge badge-secondary">{book.genre}</div>
                    <h2 className="text-5xl font-black">{book.title}</h2>
                    <p className="text-xl text-gray-500 italic">By {book.author}</p>
                    <div className="divider"></div>
                    <p className="text-lg leading-relaxed text-gray-700">{book.summary}</p>
                    <div className="flex items-center gap-4 mt-6">
                        <span className="text-2xl font-bold text-yellow-500">Rating: {book.rating} ⭐</span>
                    </div>
                    <div className="mt-8">
                        <p className="text-sm text-gray-400 font-semibold uppercase tracking-widest">Added By</p>
                        <p className="text-primary font-medium">{book.userEmail}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;