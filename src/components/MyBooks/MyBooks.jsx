import React, { useEffect, useState, use } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const MyBooks = () => {
    const { user } = use(AuthContext);
    const [myBooks, setMyBooks] = useState([]);

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:3000/products?userEmail=${user.email}`)
                .then(res => res.json())
                .then(data => setMyBooks(data))
                .catch(err => console.error("Error fetching my books:", err));
        }
    }, [user?.email]);

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
            .then(res => {
                if (!res.ok) throw new Error("Failed to delete");
                return res.json();
            })
            .then(data => {
                if (data.deletedCount > 0) {
                    Swal.fire("Deleted!", "Your book has been removed.", "success");
                    const remaining = myBooks.filter(book => book._id !== id);
                    setMyBooks(remaining);
                }
            })
            .catch(err => {
                Swal.fire("Error!", "This book's ID format might be static. Only DB books can be deleted.", "error");
            });
        }
    });
};

    return (
        <div className="container mx-auto mt-10 p-5">
            <h2 className="text-3xl font-bold text-center mb-10 text-primary">
                My Added Books: {myBooks.length}
            </h2>
            
            <div className="overflow-x-auto shadow-2xl rounded-xl border border-gray-200">
                <table className="table w-full bg-base-100">
                    {/* Table Head */}
                    <thead className="bg-neutral text-white">
                        <tr>
                            <th>Book Image</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Genre</th>
                            <th>Rating</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myBooks.map((book) => (
                            <tr key={book._id} className="hover:bg-base-200 transition-colors">
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-16 h-16">
                                            <img src={book.coverImage} alt={book.title} />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="font-bold text-lg">{book.title}</div>
                                </td>
                                <td>{book.author}</td>
                                <td>
                                    <span className="badge badge-ghost badge-sm">{book.genre}</span>
                                </td>
                                <td className="font-semibold text-yellow-600">
                                    {book.rating} ⭐
                                </td>
                                <td>
                                    <div className="flex gap-2 justify-center">
                 <Link to={`/allBooks/update/${book._id}`}  className="btn btn-sm btn-info text-white shadow-md"> Update</Link>
                                        
                                        <button 
                                            onClick={() => handleDelete(book._id)} 
                                            className="btn btn-sm btn-error text-white shadow-md"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {myBooks.length === 0 && (
                <div className="text-center mt-20">
                    <p className="text-xl text-gray-400 italic">You haven't added any books yet!</p>
                    <Link to="/allBooks/addBook" className="btn btn-primary mt-4">Add Your First Book</Link>
                </div>
            )}
        </div>
    );
};

export default MyBooks;