import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Messaging({ auth }) {
    const [conversations, setConversations] = useState({});
    const [conversationId, setconversationId] = useState('');
    const [currentUserId, setCurrentUserId] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('/users')
          .then(response => {
            console.log(response.data);
            setUsers(response.data);
            setCurrentUserId(response.data.id)
        })
        .catch(error => console.error('Error fetching users:', error));
    }, []);

    const handleConversationIdChange = (event) => {
        setconversationId(event.target.value);
    };

    const handleSendMessage = async () => {
        if (!newMessage.trim() || !currentUserId) return;

        const messageToSend = {
            sender_id: auth.user.id,
            body: newMessage,
            date: new Date(),
        };

        const updatedConversations = { ...conversations };
        updatedConversations[currentUserId] = updatedConversations[currentUserId] || [];
        updatedConversations[currentUserId].push(messageToSend);

        setConversations(updatedConversations);

        const userData = { send_id: auth.user.id, recv_id: currentUserId };

        await axios.post('/api/createconversation', {
            send_id: userData.send_id,
            recv_id: userData.recv_id
        })
        .then(() => {
            return axios.post('/api/sendmessage', {
                send_id: userData.send_id,
                recv_id: userData.recv_id,
                body: newMessage
            });
        })
        setNewMessage('');
    };

    const selectUser = async (user) => {
        setCurrentUserId(user.id);
        console.log(auth.user.id);
        console.log(user.id);

    // try{
        const response = await axios.get('/api/fetchconversationid', {
            params: {
                send_id: auth.user.id,
                recv_id: user.id
            }
        });

        const conversation_id = response.data.conversation_id;
        console.log(conversation_id);
        setconversationId(conversation_id);

        const messagesResponse = await axios.get('/api/getmessages', {
            params: {
                conversation_id: conversation_id
            }
        });

        console.log(messagesResponse.data);
        // console.log("Hii");
    // }
    // catch (error) {
    //     console.error('Error:', error.response ? error.response.data : error.message);
    // }
    };

    const getInitials = (name) => {
        if (!name || typeof name !== 'string') {
            return '';
        }
        const initials = names.map(n => n[0]).join('');
        return initials.toUpperCase();
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
                            <h3 className="text-lg font-bold">Users</h3>
                        </div>
                        <div className="divide-y divide-gray-200">
                            {users.map(user => (
                                <div key={user.id} className={`p-4 cursor-pointer ${currentUserId === user.id ? 'bg-gray-200' : ''}`} onClick={() => selectUser(user)}>
                                    <h3 className="text-lg font-bold">{user.name}</h3>
                                </div>
                            ))}
                        </div>
                    </div>

                    <input type="hidden" value={conversationId} onChange={handleConversationIdChange} disabled/>

                    {/* Messaging Area */}
                    <div className="flex-1 ml-4 bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {/* User's Name and Message Area */}
                            <div className="border-b border-gray-200 pb-4 mb-4">
                                <h3 className="text-lg font-bold">
                                    {currentUserId ? users.find(user => user.id === currentUserId)?.name : ''}
                                </h3>
                            </div>
                            <div className="h-96 overflow-y-scroll">
                                {currentUserId && conversations[currentUserId] && conversations[currentUserId].length > 0 ? conversations[currentUserId].map((message, index) => (
                                    <div key={index} className={`flex ${message.sender_id === auth.user.id ? 'justify-end' : 'justify-start'}`}>
                                        <div className="p-2 flex items-center">
                                            <div className="mr-2">
                                                {users.find(user => user.id === message.sender_id)?.pfp ?
                                                    <img src={users.find(user => user.id === message.sender_id).pfp} alt="pfp" className="w-8 h-8 rounded-full" /> :
                                                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                                                        <span>{getInitials(users.find(user => user.id === message.sender_id)?.name)}</span>
                                                    </div>
                                                }
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-600">{new Date(message.date).toLocaleString()}</p>
                                                <p>{message.body}</p>
                                            </div>
                                        </div>
                                    </div>
                                )) : null}
                            </div>

                            {/* Message Input */}
                            <div className="mt-4 flex">
                                <input
                                    type="text"
                                    placeholder="Type your message here"
                                    className="border rounded-md p-2 flex-1"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                />
                                <button
                                    onClick={handleSendMessage}
                                    className="rounded-md px-4 py-2 bg-purple-800 text-white rounded ml-2"
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
