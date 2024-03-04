import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Ensure Axios is installed

export default function Messaging({ auth }) {
    const [conversations, setConversations] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [users, setUsers] = useState([]); // New state for users

    useEffect(() => {
        // Fetch users when the component mounts
        axios.get('/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    const handleSendMessage = () => {
        if (newMessage.trim() === '') {
            return; // Don't send empty messages
        }

        const currentUserConversation = conversations.find(conversation => conversation.name === auth.user.name);

        if (currentUserConversation) {
            const updatedConversation = {
                ...currentUserConversation,
                messages: [...currentUserConversation.messages, { sender: 'You', text: newMessage, date: new Date() }]
            };
            setConversations(conversations.map(conversation => conversation.name === auth.user.name ? updatedConversation : conversation));
        } else {
            const newConversation = {
                id: Date.now(), // This should be replaced with a more robust method
                name: auth.user.name,
                messages: [{ sender: 'You', text: newMessage, date: new Date() }]
            };
            setConversations([...conversations, newConversation]);
        }
        setNewMessage(''); // Clear input after sending
    };

    const selectUser = (user) => {
        const existingConversation = conversations.find(conversation => conversation.name === user.name);
        if (!existingConversation) {
            setConversations([...conversations, {
                id: Date.now(), // Again, consider a more robust ID
                name: user.name,
                messages: []
            }]);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Messaging</h2>}
        >
            <Head title="Messaging" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex">
                    {/* Conversations Sidebar */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg w-1/4">
                        <div className="p-6 border-b border-gray-200">
                            <h3 className="text-lg font-bold">{auth.user.name}</h3>
                        </div>
                        <div className="divide-y divide-gray-200">
                            {/* Here we map over users instead of conversations */}
                            {users.map(user => (
                                <div key={user.id} className="p-4 cursor-pointer" onClick={() => selectUser(user)}>
                                    <h3 className="text-lg font-bold">{user.name}</h3>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Messaging Area */}
                    <div className="flex-1 ml-4 bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {/* Message Area */}
                            <div className="h-96 overflow-y-scroll">
                                {conversations.map(conversation => (
                                    <div key={conversation.id} className="p-4">
                                        {conversation.messages.map((message, index) => (
                                            <div key={index} className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                                                <div className="p-2">
                                                    {/* Profile picture or initials */}
                                                    <div className="flex items-center mb-1">
                                                        <div className="mr-2">
                                                            {/* Placeholder for profile picture */}
                                                            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                                                                <span>{message.sender.split(' ').map(name => name[0]).join('')}</span>
                                                            </div>
                                                        </div>
                                                        {/* User name and date */}
                                                        <div className="flex items-center">
                                                            <p className="font-bold">{message.sender}</p>
                                                            <p className="text-xs text-gray-600 ml-2">{new Date(message.date).toLocaleString()}</p>
                                                        </div>
                                                    </div>
                                                    {/* Message text */}
                                                    <p>{message.text}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>

                            {/* Message Input */}
                            <div className="mt-4 flex">
                                <input
                                    type="text"
                                    placeholder="Type your message here"
                                    className="border p-2 flex-1"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                />
                                <button
                                    onClick={handleSendMessage}
                                    className="px-4 py-2 bg-blue-500 text-white rounded ml-2"
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
