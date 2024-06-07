import { Link, Head } from "@inertiajs/react";
import background from "./Images/Landing.png";
import LandingLayout from "@/Layouts/LandingLayout";

export default function Landing({ auth, laravelVersion, phpVersion }) {
    const backgroundStyle = {
        backgroundImage: `url(${background})`,
        height: "100vh",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom",
    };

    return (
        <div style={backgroundStyle}>
            <Head title="Welcome" />
            <div className="">
                <LandingLayout auth={auth} />
                <div className="min-h-[70vh] text-center flex justify-center items-center flex-col gap-5">
                    <div className="font-bold text-center flex flex-col justify-center items-center w-[50%]">
                        <div className="font-poppins font-extrabold text-3xl text-purple-700">
                            <h1>CO-OP CONNECT</h1>
                        </div>
                        <div className="mt-3 text-5xl">
                            <h2 className="text-center font-extrabold">
                                Where Students, Educators and Employers{" "}
                                <span className="text-purple-400">
                                    Thrive Together
                                </span>
                            </h2>
                        </div>
                        <div className="mt-4">
                            <Link
                                href={route("register")}
                                className="ms-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                <button className="bg-purple-600 rounded-lg text-white px-2 py-2 text-lg hover:opacity-80 opacity-100">
                                    Get Started
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
