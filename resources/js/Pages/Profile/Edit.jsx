import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';

export default function Profile({ auth, mustVerifyEmail, status }) {
    // Dummy data for matches, replace with real data
    const matches = [
        { id: 1, title: 'Website Designer', location: 'Toronto, ON', info: 'info...' },
        // ... other matches
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">My Profile</h2>}
        >
            <Head title="My Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Profile Update and Plan Selection Sections */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Profile Update Section */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg p-4">
                                <UpdateProfileInformationForm
                                    mustVerifyEmail={mustVerifyEmail}
                                    status={status}
                                    className="max-w-xl"
                                />
                            </div>
                            <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg p-4">
                                <UpdatePasswordForm className="max-w-xl" />
                            </div>
                            <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg p-4">
                                <DeleteUserForm className="max-w-xl" />
                            </div>
                        </div>

                        {/* Plan Selection Section */}
                        <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg p-4">
                            <h3 className="text-lg font-bold mb-4">Plan Selection</h3>
                            {/* Your plan selection content goes here */}
                        </div>
                    </div>

                    {/* Matches Section */}
                    <div className="mt-6 bg-white dark:bg-gray-800 shadow sm:rounded-lg p-4">
                        <h3 className="text-lg font-bold mb-4">My Matches</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {matches.map((match) => (
                                <div key={match.id} className="border p-4 rounded-lg">
                                    <h3 className="text-lg font-bold">{match.title}</h3>
                                    <p className="text-sm">{match.location}</p>
                                    <p className="text-sm">{match.info}</p>

                                    <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                                        Message
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Buttons for Documents and Reflections */}
                        <div className="flex flex-col justify-center items-end space-y-4 h-full">
                            <a href="/documents" target="_blank" rel="noopener noreferrer" className="bg-blue-500 text-white p-4 rounded-lg shadow">
                                Documents
                            </a>
                            <a href="/reflections" target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white p-4 rounded-lg shadow">
                                Reflections
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
