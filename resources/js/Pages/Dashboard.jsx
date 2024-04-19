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
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Job Postings</h2>}
        >
            <Head title="Dashboard" />

            <div className="bg-purple-50 py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="w-full py-5 flex items-center justify-center" >
                        <div className="bg-white rounded-lg px-2 py-5">
                            <h2 className="text-purple-900 font-bold text-center text-2xl">Search for Job Postings</h2>
                            <p className="text-center">Get amazing through jobs at CO-OP Connect!</p>
                            <br></br>
                            <div className="pt-5 px-2">
                                <p className="text-center">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it t</p>
                            </div>
                            <div className="pt-5 w-full justify-center items-center flex">
                                <button className="px-3 py-2 bg-purple-800 text-white rounded-lg">View Jobs</button>
                            </div>
                        </div>
                    </div>
                    <div className="mb-6 flex flex-wrap gap-4">
                        <input type="text" placeholder="Location" value={searchLocation} onChange={(e) => setSearchLocation(e.target.value)} className="border border-gray-400 rounded-md p-2 w-full sm:w-auto" />
                        <input type="text" placeholder="Job Titles, Keywords" value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} className="border border-gray-400 rounded-md p-2 w-full sm:w-auto" />
                        <button className="px-4 py-2 bg-purple-800 text-white rounded rounded-md" onClick={() => search()}>Search</button>
                        <button className="px-4 py-2 bg-fuchsia-800 text-white rounded rounded-md" onClick={() => setShowForm(!showForm)}>Post a Job</button>
                    </div>


                    {showForm && (
                        <form onSubmit={handleJobPost} className="mb-4">
                            <input type="text" placeholder="Job Title" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} className="border p-2 w-full mb-4" />
                            <input type="text" placeholder="Location" value={jobLocation} onChange={(e) => setJobLocation(e.target.value)} className="border p-2 w-full mb-4" />
                            <textarea placeholder="Job Description" value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} className="border p-2 w-full mb-4"></textarea>
                            <button type="submit" className="px-4 py-2 bg-purple-800 text-white rounded">Submit Job</button>
                            <button type="submit" className="mx-4 px-4 py-2 bg-gray-500 text-white rounded" onClick={() => setShowForm(!showForm)}>Close</button>
                        </form>
                    )}

                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <h2 className="text-purple-900 font-bold text-2xl text-center pt-4">Recommended Jobs</h2>
                        <p className="text-center">View some of these recommended jobs!</p>
                        {noDataFound ? (
                            <p className="my-8 text-center font-bold text-black-500 text-lg mt-8">No data found</p>
                        ) : (
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {jobs.map((job) => (
                                <div key={job.id} className="bg-purple-200 border p-4 rounded-lg flex flex-col gap-2">
                                    <h3 className="text-center text-lg font-bold">{job.title}</h3>
                                    <p className="text-center text-sm">{job.location}</p>
                                    <p className="text-center text-sm mt-1">{job.description}</p>
                                   {/* <Link href={`/jobs/${job.id}`} className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded">Apply Now</Link> */}

                                    <div className="flex flex-row gap-4 items-center justify-center pt-4">
                                       <Link href={"/"} className="bg-purple text-center bg-purple-700 px-5 py-2 rounded-lg rounded text-white">View Posting</Link>
                                    </div>
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
