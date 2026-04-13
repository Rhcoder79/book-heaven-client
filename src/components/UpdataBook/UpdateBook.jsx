import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const UpdateBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState({});

    useEffect(() => {
        fetch(`http://localhost:3000/products/${id}`)
            .then(res => res.json())
            .then(data => setBook(data));
    }, [id]);

    const handleUpdate = (e) => {
        e.preventDefault();
        const form = e.target;

        const updatedBook = {
            title: form.title.value,
            author: form.author.value,
            genre: form.genre.value,
            rating: parseFloat(form.rating.value),
            summary: form.summary.value,
            coverImage: form.coverImage.value
        };

        fetch(`http://localhost:3000/products/${id}`, {
            method: 'PATCH',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(updatedBook)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    Swal.fire({ icon: 'success', title: 'Success!', text: 'Book Updated Successfully!' });
                    navigate('/allBooks');
                }
            });
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-8 bg-base-100 shadow-2xl rounded-xl border">
            <h2 className="text-3xl font-bold text-center mb-6">Update Book Information</h2>
            <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                    <label className="label">Title</label>
                    <input name="title" type="text" defaultValue={book.title} className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">Author</label>
                    <input name="author" type="text" defaultValue={book.author} className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">Rating</label>
                    <input name="rating" type="number" step="0.1" defaultValue={book.rating} className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">Genre</label>
                    <input name="genre" type="text" defaultValue={book.genre} className="input input-bordered" required />
                </div>
                <div className="form-control md:col-span-2">
                    <label className="label">Cover Image URL</label>
                    <input name="coverImage" type="text" defaultValue={book.coverImage} className="input input-bordered" required />
                </div>
                <div className="form-control md:col-span-2">
                    <label className="label">Summary</label>
                    <textarea name="summary" defaultValue={book.summary} className="textarea textarea-bordered h-24" required></textarea>
                </div>
                <button className="btn btn-warning md:col-span-2 mt-4 font-bold">Update Book</button>
            </form>
        </div>
    );
};

export default UpdateBook;