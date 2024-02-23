import { Link, Head } from '@inertiajs/react';
import './Welcome.css';
import { Container } from 'postcss';
import logo from './Images/COOPCONNECTLOGO.png';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (



        <>
            <Head title="Welcome" />

            <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
                <div className="sm:fixed sm:top-0 sm:right-0 p-6 text-end">
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500 text-xl border-2 border-white rounded-md px px-1.5 py-1 "
                            >
                                Log in
                            </Link>

                        </>
                    )}
                </div>






               <div className="sm:fixed sm:top-0 sm:right-20 p-6 text-end font-semibold text-xl text-white">

                    <h2>Already have an account?</h2>
               </div>

               <img className="sm:fixed sm:top-2 sm:left-2" src={logo} alt="Logo"/>

                <div className = "Container_row">

                    <div className = "Title">
                        <h1>
                            CO-OPCONNECT

                        </h1>
                    </div>

                    <div className = "Subtitle">
                        <h2>
                            Where Students, Educators and Employers Thrive Together

                        </h2>



                    </div>

                    <div className = "Subtitle">

                         <h2>
                            Dont Have an Account?

                        </h2>

                    </div>



                    <div className= "GetStarted">
                    <Link
                                href={route('register')}
                                className="ms-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"

                            >

                        <button className='border-2 border-white rounded-md px px-2 py-1 bg-grey'>
                                Get Started
                        </button>

                    </Link>

                    </div>

                    <div class="job-listing">
                    <div class="job-card">
                        <h3>Website Designer</h3>
                        <p>Toronto, ON</p>
                        <button>APPLY NOW</button>
                        <p>info info info info info info info info info info info info info info info</p>
                    </div>
                    <div class="job-card">
                        <h3>Website Designer</h3>
                        <p>Toronto, ON</p>
                        <button>APPLY NOW</button>
                        <p>info info info info info info info info info info info info info info info</p>
                    </div>
                    <div class="job-card">
                        <h3>Website Designer</h3>
                        <p>Toronto, ON</p>
                        <button>APPLY NOW</button>
                        <p>info info info info info info info info info info info info info info info</p>
                    </div>
                    </div>



            <div class="Box">
              <a href="#co-op-info" class="CO-OP">What is CO-OP?</a>
              <a href="#contact-us" class="Contact">Contact us</a>
              <a href="#more-info" class="Info">More Info about us</a>
            </div>



            </div>




            </div>





        </>
    );
}
