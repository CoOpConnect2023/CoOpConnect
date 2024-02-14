import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth, jobs }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Job Page</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Search Filters */}
                    <div className="mb-6 flex flex-wrap gap-4">
                        <input
                            type="text"
                            placeholder="Location"
                            className="border p-2 w-full sm:w-auto"
                        />
                        <input
                            type="text"
                            placeholder="Job Titles, Keywords"
                            className="border p-2 w-full sm:w-auto"
                        />
                        <button className="px-4 py-2 bg-blue-500 text-white rounded">
                            Search
                        </button>
                    </div>
                    
                    {/* Job Listings */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {jobs.map((job) => (
                                <div key={job.id} className="border p-4 rounded-lg">
                                    <h3 className="text-lg font-bold">{job.title}</h3>
                                    <p className="text-sm">{job.location}</p>
                                    <p className="text-sm mt-2">{job.description}</p>
                                    <Link
                                        href={`/jobs/${job.id}`} // Update the URL to your job detail page
                                        className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                                    >
                                        Apply Now
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
