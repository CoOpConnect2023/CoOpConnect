import { Link, Head } from '@inertiajs/react';
import logo from './Images/COOPCONNECTLOGO.png';

export default function About({ auth }) {
    return (
        <>
            <Head title="About" />
            <div className="">
                <div className="flex flex-row items-center justify-between text-center">
                    <div>
                        <img className="" src={logo} alt="Logo"/>
                    </div>
                    <div>
                        <div className="flex flex-row gap-10 text-purple-700">
                            <Link href='./contactus'>Contact Us</Link>
                            <Link href='./about'>About Us</Link>
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
                    <div className="font-bold text-center flex flex-col justify-center items-center w-[50%]">
                        <div className="font-poppins font-extrabold text-3xl text-purple-700">
                            <h1>
                                About CO-OP CONNECT
                            </h1>
                        </div>
                        <div className="mt-4 text-2xl">
                            <p className="text-center leading-relaxed text-gray-700">
                                <strong>Who We Are:</strong> CO-OP CONNECT is a leading platform dedicated to bridging the gap between students, educators, and employers. Our mission is to empower the next generation with the tools and opportunities they need to thrive in their careers.
                            </p>
                            <p className="mt-6 text-center leading-relaxed text-gray-700">
                                <strong>Our Mission:</strong> At CO-OP CONNECT, our mission is to provide a collaborative environment where students can gain real-world experience, educators can enhance their curriculum, and employers can find top talent. We believe in the power of community and collaboration to drive success.
                            </p>
                            <p className="mt-6 text-center leading-relaxed text-gray-700">
                                <strong>Our Journey:</strong> Founded in [Year], CO-OP CONNECT started with a vision to transform the educational landscape. Over the years, we have grown into a trusted platform that has helped thousands of students and professionals achieve their goals.
                            </p>
                            <p className="mt-6 text-center leading-relaxed text-gray-700">
                                <strong>What We Do:</strong> We offer a variety of services including internships, job placements, and networking opportunities. Our team is committed to supporting each user on their unique journey to success.
                            </p>
                            <p className="mt-6 text-center leading-relaxed text-gray-700">
                                <strong>Why Choose Us:</strong> Choosing CO-OP CONNECT means joining a community that values innovation, integrity, and excellence. We are dedicated to helping our users succeed and thrive in their careers.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
