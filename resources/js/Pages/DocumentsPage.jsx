//resources/js/Pages/DocumentsPage.jsx

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React from 'react';

export default function Documents({ auth }) {
    // Dummy documents data
    const documents = [
        { id: 1, title: 'Document 1' },
        { id: 2, title: 'Document 2' },
        { id: 3, title: 'Document 3' },
        { id: 4, title: 'Document 4' },
        // ... other documents data
    ];

    // Function to render each document item
    const renderDocumentItem = (document) => (
        <div key={document.id} className="bg-white p-4 border flex justify-center items-center shadow-sm rounded-lg">
            <h3 className="text-lg font-bold">{document.title}</h3>
        </div>
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Documents</h2>}
        >
            <Head title="Documents" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Documents Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        {documents.map(renderDocumentItem)}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
