import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext';
import Swal from 'sweetalert2';
import { formatDistanceToNow } from 'date-fns';

const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState({});
    const [comments, setComments] = useState([]); // কমেন্ট স্টেট
    const { user } = useContext(AuthContext); // ইউজার তথ্য

    // বইয়ের ডিটেইলস এবং কমেন্ট লোড করা
    useEffect(() => {
        fetch(`http://localhost:3000/products/${id}`)
            .then(res => res.json())
            .then(data => setBook(data));

        fetchComments();
    }, [id]);

    // কমেন্ট ফেচ করার ফাংশন (রিয়েল-টাইম আপডেটের জন্য আলাদা করা হয়েছে)
    const fetchComments = () => {
        fetch(`http://localhost:3000/comments/${id}`)
            .then(res => res.json())
            .then(data => setComments(data));
    };

    // কমেন্ট সাবমিট হ্যান্ডলার
    const handleCommentSubmit = (e) => {
        e.preventDefault();
        
        if (!user) {
            Swal.fire("Please Login", "You must be logged in to post a comment", "warning");
            return;
        }

        const commentText = e.target.comment.value;
        const commentData = {
            bookId: id,
            userName: user?.displayName,
            userPhoto: user?.photoURL,
            userEmail: user?.email,
            commentText,
            createdAt: new Date().toISOString() // সঠিক টাইম ফরম্যাট
        };

        fetch('http://localhost:3000/comments', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(commentData)
        })
        .then(res => res.json())
        .then(data => {
            if (data.insertedId) {
                e.target.reset();
                fetchComments(); // সাথে সাথে লিস্ট আপডেট হবে
                Swal.fire({
                    title: 'Comment Posted!',
                    icon: 'success',
                    timer: 1000,
                    showConfirmButton: false,
                    toast: true,
                    position: 'top-end'
                });
            }
        });
    };

    return (
        <div className="container mx-auto mt-10 p-5">
            {/* Book Details Card */}
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

            {/* Comment Section */}
            <div className="mt-16 max-w-4xl mx-auto">
                <h3 className="text-3xl font-bold mb-8">Comments ({comments.length})</h3>

                {/* Comment Input Box */}
                {user ? (
                    <form onSubmit={handleCommentSubmit} className="mb-10 space-y-4">
                        <textarea
                            name="comment"
                            placeholder="Share your thoughts about this book..."
                            className="textarea textarea-bordered w-full h-32 focus:outline-primary text-lg"
                            required
                        ></textarea>
                        <button type="submit" className="btn btn-primary px-8">Post Comment</button>
                    </form>
                ) : (
                    <div className="bg-yellow-50 p-4 rounded-lg mb-10 text-center border border-yellow-200">
                        <p className="text-yellow-700 font-medium">Please login to join the discussion.</p>
                    </div>
                )}

                {/* Comments List Display */}
                <div className="space-y-6">
                    {comments.length > 0 ? (
                        comments.map((comment) => (
                            <div key={comment._id} className="flex gap-4 p-4 bg-base-100 border rounded-2xl shadow-sm">
                                <div className="avatar">
                                    <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img src={comment.userPhoto || "https://i.ibb.co/mR79Y6B/user.png"} alt="user" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-bold text-lg">{comment.userName}</h4>
                                        <span className="text-xs text-gray-400">
                                            {comment.createdAt ? formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true }) : 'Just now'}
                                        </span>
                                    </div>
                                    <p className="mt-2 text-gray-600 leading-relaxed">{comment.commentText}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 py-10 italic">No comments yet. Be the first to share your review!</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookDetails;