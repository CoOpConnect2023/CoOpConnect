import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia'; // Import Inertia
import axios from "axios";
import { useState } from 'react';

export default function Dashboard({ auth, jobs: initialJobs }) {
    const [showForm, setShowForm] = useState(false);
    const [jobTitle, setJobTitle] = useState('');
    const [jobLocation, setJobLocation] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [searchLocation, setSearchLocation] = useState('');
    const [searchKeyword, setSearchKeyword] = useState('');
    const [jobs, setJobs] = useState(initialJobs);
    const [noDataFound, setNoDataFound] = useState(false);
    
    const handleJobPost = (e) => {
        e.preventDefault();
        if(jobTitle == "" || jobLocation == "" || jobDescription == ""){
            return;
        }

        const newJob = {
            title: jobTitle,
            location: jobLocation,
            description: jobDescription,
        };
        setJobs([...jobs, newJob]);
        Inertia.post('/jobs', newJob);
        setJobTitle('');
        setJobLocation('');
        setJobDescription('');
        setShowForm(false);
    };

    const search = async () => {
        setNoDataFound(false);

        // try{
        const response = await axios.get('/api/filterjobs', {
            params: {
                location_filter: searchLocation,
                keyword_filter: searchKeyword
            }
        });

        // console.log(response.data);

        if (response.data.length === 0) {
            setNoDataFound(true);
            setJobs([]);
            return;
        }

        const filteredJobs = response.data.map(job => ({
            title: job.title,
            location: job.location,
            description: job.description,
        }));

        setJobs(filteredJobs);
        // console.log(filteredJobs);
    // }
    // catch (error) {
    //     console.error('Error:', error.response.data);
    // }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Job Page</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-6 flex flex-wrap gap-4">
                        <input type="text" placeholder="Location" value={searchLocation} onChange={(e) => setSearchLocation(e.target.value)} className="border p-2 w-full sm:w-auto" />
                        <input type="text" placeholder="Job Titles, Keywords" value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} className="border p-2 w-full sm:w-auto" />
                        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => search()}>Search</button>
                        <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={() => setShowForm(!showForm)}>Post a Job</button>
                    </div>

                    {showForm && (
                        <form onSubmit={handleJobPost} className="mb-4">
                            <input type="text" placeholder="Job Title" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} className="border p-2 w-full mb-4" />
                            <input type="text" placeholder="Location" value={jobLocation} onChange={(e) => setJobLocation(e.target.value)} className="border p-2 w-full mb-4" />
                            <textarea placeholder="Job Description" value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} className="border p-2 w-full mb-4"></textarea>
                            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Submit Job</button>
                            <button type="submit" className="mx-4 px-4 py-2 bg-gray-500 text-white rounded" onClick={() => setShowForm(!showForm)}>Close</button>
                        </form>
                    )}

                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        {noDataFound ? (
                            <p className="my-8 text-center font-bold text-black-500 text-lg mt-8">No data found</p>
                        ) : (
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {jobs.map((job) => (
                                <div key={job.id} className="border p-4 rounded-lg">
                                    <h3 className="text-lg font-bold">{job.title}</h3>
                                    <p className="text-sm">{job.location}</p>
                                    <p className="text-sm mt-2">{job.description}</p>
                                   {/* <Link href={`/jobs/${job.id}`} className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded">Apply Now</Link> */} 
                                </div>
                            ))}
                        </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
