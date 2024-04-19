import { Link, Head } from '@inertiajs/react';
import logo from './Images/COOPCONNECTLOGO.png';

export default function Landing({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="">
                <div className="flex flex-row items-center justify-between text-center">
                    <div>
                        <img className="" src={logo} alt="Logo"/>
                    </div>
                    <div>
                        <div className="flex flex-row gap-10 text-purple-700">
                            <Link href='./contactus'>Contact Us</Link>
                            <Link>About Us</Link>
                            <Link>Guide</Link>
                        </div>
                    </div>
                    <div className="p-6 text-end">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <div className="flex flex-row gap-3">
                                    <Link
                                        href={route('register')}
                                        className="font-semibold text-white px-2 hover:opacity-80 focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500 text-xl border-2 border-white rounded-lg px px-1.5 py-1 bg-purple-700"
                                    >
                                        Sign Up
                                    </Link>
                                    <Link
                                        href={route('login')}
                                        className="font-semibold text-purple-900 hover:opacity-80 px-2 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500 text-xl border-2 border-white rounded-lg px px-1.5 py-1 bg-purple-300"
                                    >
                                        Sign In
                                    </Link>
                                </div>

                            </>
                        )}
                    </div>
                </div>
                <div className="min-h-[70vh] text-center flex justify-center items-center flex-col gap-5">
                    <div className = "font-bold text-center flex flex-col justify-center items-center w-[50%]">
                        <div className = "font-poppins font-extrabold text-3xl text-purple-700">
                            <h1>
                                CO-OP CONNECT
                            </h1>
                        </div>
                        <div className = "mt-3 text-5xl">
                            <h2 className="text-center font-extrabold">
                                Where Students, Educators and Employers <span className="text-purple-400">Thrive Together</span>
                            </h2>
                        </div>
                        <div className= "mt-4">
                            <Link
                                href={route('register')}
                                className="ms-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"

                            >
                                <button className='bg-purple-600 rounded-lg text-white px-2 py-2 text-lg hover:opacity-80 opacity-100'>
                                    Get Started
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
