import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React from 'react';

export default function Messaging({ auth }) {
    // Dummy conversations data
    const conversations = [
        { id: 1, name: 'Testing User', message: 'Hello, how are you?' },
        // ... other conversation data
    ];

    // Function to render each conversation item
    const renderConversationItem = (conversation) => (
        <div key={conversation.id} className="p-4 border-b border-gray-300">
            <h3 className="text-lg font-bold">{conversation.name}</h3>
            <p className="text-sm">{conversation.message}</p>
        </div>
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Messaging</h2>}
        >
            <Head title="Messaging" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex">
                    {/* Conversations Sidebar */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg w-1/4">
                        <div className="p-6 border-b border-gray-300">
                            Conversations
                        </div>
                        <div className="divide-y divide-gray-300">
                            {conversations.map(renderConversationItem)}
                        </div>
                    </div>

                    {/* Messaging Area */}
                    <div className="flex-1 ml-4 bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {/* Message Area */}
                            <div className="h-96 border-b border-gray-300 overflow-y-scroll">
                                {/* Messages will go here */}
                            </div>

                            {/* Message Input */}
                            <div className="mt-4">
                                <input
                                    type="text"
                                    placeholder="Type your message here"
                                    className="border p-2 w-full"
                                />
                                <button className="px-4 py-2 bg-blue-500 text-white rounded float-right mt-2">
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
