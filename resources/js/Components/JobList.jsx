import React from 'react';
import { Link } from '@inertiajs/inertia-react';

const JobList = ({ jobs }) => {
    return (
        <div className="space-y-4">
            {jobs.map((job) => (
                <div key={job.id} className="border p-4 rounded-lg bg-white dark:bg-gray-800">
                    <h3 className="text-lg font-bold">{job.title}</h3>
                    <p className="text-sm">{job.location}</p>
                    <p className="text-sm mt-2">{job.description}</p>
                    <Link
                        href={`/jobs/${job.id}`} // This should link to your job detail page
                        className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Apply Now
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default JobList;