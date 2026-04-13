import React, { use } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const AddBook = () => {
    const { user } = use(AuthContext); 
    const navigate = useNavigate();

    const handleAddBook = (e) => {
        e.preventDefault();
        const form = e.target;

        const title = form.title.value;
        const author = form.author.value;
        const genre = form.genre.value;
        const rating = parseFloat(form.rating.value);
        const summary = form.summary.value;
        const coverImage = form.coverImage.value;
        const userEmail = user?.email; 

        const newBook = { title, author, genre, rating, summary, coverImage, userEmail };

        fetch('http://localhost:3000/products', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newBook)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({ icon: 'success', title: 'Success!', text: 'Book added successfully!' });
                    form.reset();
                    navigate('/allBooks');
                }
            });
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-8 bg-base-100 shadow-2xl rounded-xl">
            <h2 className="text-3xl font-bold text-center mb-6">Add a New Book</h2>
            <form onSubmit={handleAddBook} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                    <label className="label">Book Title</label>
                    <input name="title" type="text" placeholder="Title" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">Author Name</label>
                    <input name="author" type="text" placeholder="Author" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">Rating (e.g. 4.5)</label>
                    <input name="rating" type="number" step="0.1" placeholder="4.5" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">Genre</label>
                    <input name="genre" type="text" placeholder="e.g. Mystery" className="input input-bordered" required />
                </div>
                <div className="form-control md:col-span-2">
                    <label className="label">Cover Image URL</label>
                    <input name="coverImage" type="text" placeholder="URL" className="input input-bordered" required />
                </div>
                <div className="form-control md:col-span-2">
                    <label className="label">Summary</label>
                    <textarea name="summary" className="textarea textarea-bordered h-24" placeholder="Brief summary" required></textarea>
                </div>
                <button className="btn btn-neutral md:col-span-2 mt-4">Add Book</button>
            </form>
        </div>
    );
};

export default AddBook;