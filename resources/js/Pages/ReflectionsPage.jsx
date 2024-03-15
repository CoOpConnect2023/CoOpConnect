import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const ReflectionsPage = ({ auth }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [replyContent, setReplyContent] = useState({});

    // Function to handle new comment submission
    const handleCommentSubmit = (e) => {
        e.preventDefault();
        const comment = {
            id: Date.now(),
            content: newComment,
            user: auth.user.name,
            replies: [],
        };
        setComments([...comments, comment]);
        setNewComment('');
    };

    // Function to handle reply content change
    const handleReplyChange = (commentId, content) => {
        setReplyContent(prev => ({ ...prev, [commentId]: content }));
    };

    // Function to handle new reply submission, only available for teachers and employers
    const handleReplySubmit = (commentId) => {
        if (!replyContent[commentId]) return; // Ignore empty replies

        const newReply = {
            content: replyContent[commentId],
            user: auth.user.name, // We assume the user object has a name
        };

        setComments(
            comments.map((comment) =>
                comment.id === commentId
                    ? { ...comment, replies: [...comment.replies, newReply] }
                    : comment
            )
        );
        setReplyContent(prev => ({ ...prev, [commentId]: '' })); // Clear reply input after submission
    };

    const headerContent = <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Reflections Forum</h2>;

    const isTeacherOrEmployer = () => {
        // Assuming 'role' is a property of 'user' indicating the user's role
        return ['teacher', 'employer'].includes(auth.user.role);
    };

    return (
        <AuthenticatedLayout user={auth.user} header={headerContent}>
            <Head title="Reflections - CoopConnect" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow rounded-lg p-6">
                        <div className="mb-4">
                            <h1 className="text-xl font-semibold">Share Your Reflections with your teachers and employers!</h1>
                        </div>
                        <form onSubmit={handleCommentSubmit} className="mb-4">
                            <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} className="w-full rounded-lg border-gray-300 p-2" placeholder="Type your reflection here:" rows="4"></textarea>
                            <button type="submit" className="mt-2 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-700">Post Comment</button>
                        </form>
                        <div className="space-y-4">
                            {comments.map((comment) => (
                                <div key={comment.id} className="p-4 bg-gray-100 rounded-lg">
                                    <p className="text-gray-600">{comment.content}</p>
                                    <div className="text-sm font-semibold">{comment.user}</div>
                                    {comment.replies.map((reply, index) => (
                                        <div key={index} className="mt-1 pl-4 border-l-2 border-gray-200">
                                            <p className="text-gray-500">{reply.content}</p>
                                            <div className="text-xs font-semibold">{reply.user}</div>
                                        </div>
                                    ))}
                                    {isTeacherOrEmployer() && (
                                        <>
                                            <textarea value={replyContent[comment.id] || ''} onChange={(e) => handleReplyChange(comment.id, e.target.value)} className="mt-2 w-full rounded-lg border-gray-300 p-2" placeholder="Write a reply..." rows="2"></textarea>
                                            <button onClick={() => handleReplySubmit(comment.id)} className="mt-2 text-sm text-purple-500 hover:text-purple-700">Reply</button>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default ReflectionsPage;
