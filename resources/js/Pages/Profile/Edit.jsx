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

                        <div className="flex-col gap-5">
                            <div className="mb-5 h-[79%] bg-white dark:bg-gray-800 shadow sm:rounded-lg p-4">
                                <h3 className="text-lg font-bold mb-4">My Matches</h3>
                                <p className="mb-3">Some recommended jobs for you to check out!</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {matches.map((match) => (
                                        <div key={match.id} className="bg-purple-100 border p-4 rounded-lg">
                                            <h3 className="text-lg font-bold">{match.title}</h3>
                                            <p className="text-sm">{match.location}</p>
                                            <p className="text-sm">{match.info}</p>

                                            <button className="mt-4 px-4 py-2 bg-purple-800 text-white rounded rounded-md">
                                                View Job
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col bg-white dark:bg-gray-800 shadow sm:rounded-lg p-4">
                                <h3 className="text-center font-bold text-xl">My Documents and Reflections</h3>
                                <div className="mt-5 flex flex-row gap-5 justify-center items-end">
                                    <a href="/reflections" target="_blank" rel="noopener noreferrer" className="bg-purple-800 text-white p-4 rounded-lg shadow">
                                        Reflections
                                    </a>
                                    <a href="/documents" target="_blank" rel="noopener noreferrer" className="bg-fuchsia-800 text-white p-4 rounded-lg shadow">
                                        Documents
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
