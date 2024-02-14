import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, InertiaLink } from '@inertiajs/inertia-react';

export default function Messaging({ auth, conversations }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Messaging</h2>}
        >
            <Head title="Messaging" />

            <div className="flex">
                {/* Sidebar for conversations */}
                <div className="w-1/4 bg-white border-r">
                    <div className="overflow-y-auto">
                        {conversations.map((conversation) => (
                            <InertiaLink
                                href={`/messaging/${conversation.id}`}
                                className="block p-4 border-b hover:bg-gray-50"
                                key={conversation.id}
                            >
                                {conversation.title}
                            </InertiaLink>
                        ))}
                    </div>
                </div>

                {/* Message content area */}
                <div className="w-3/4 p-4">
                    <div className="h-full border rounded-lg p-4 bg-white">
                        {/* Replace this with actual message content */}
                        <p>Select a conversation to start messaging.</p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
