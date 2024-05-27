import { Link } from "@inertiajs/react";
import logo from "@/Pages/Images/COOPCONNECTLOGO.png"

export default function LandingLayout({ auth }) {
    return (
        <>
            <div className="flex flex-row items-center justify-between text-center">
                <div>
                    <img className="" src={logo} alt="Logo" />
                </div>
                <div>
                    <div className="flex flex-row gap-10 text-purple-700">
                        <Link href="./contactus">Contact Us</Link>
                        <Link href="./about">About Us</Link>
                        <Link>Guide</Link>
                    </div>
                </div>
                <div className="p-6 text-end">
                    {auth.user ? (
                        <Link
                            href={route("dashboard")}
                            className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <div className="flex flex-row gap-3">
                                <Link
                                    href={route("register")}
                                    className="font-semibold text-white px-2 hover:opacity-80 focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500 text-xl border-2 border-white rounded-lg px px-1.5 py-1 bg-purple-700"
                                >
                                    Sign Up
                                </Link>
                                <Link
                                    href={route("login")}
                                    className="font-semibold text-purple-900 hover:opacity-80 px-2 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500 text-xl border-2 border-white rounded-lg px px-1.5 py-1 bg-purple-300"
                                >
                                    Sign In
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
