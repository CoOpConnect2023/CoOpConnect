import {  Head } from "@inertiajs/react";
import LandingLayout from "@/Layouts/LandingLayout";

export default function About({ auth }) {
    return (
        <>
            <Head title="About" />
            <div className="">
                <LandingLayout auth={auth}/>
                <div className="min-h-[70vh] text-center flex justify-center items-center flex-col gap-5">
                    <div className="font-bold text-center flex flex-col justify-center items-center w-[50%]">
                        <div className="font-poppins font-extrabold text-3xl text-purple-700">
                            <h1>About CO-OP CONNECT</h1>
                        </div>
                        <div className="mt-4 text-2xl">
                            <p className="text-center leading-relaxed text-gray-700">
                                <strong>Who We Are:</strong> CO-OP CONNECT is a
                                leading platform dedicated to bridging the gap
                                between students, educators, and employers. Our
                                mission is to empower the next generation with
                                the tools and opportunities they need to thrive
                                in their careers.
                            </p>
                            <p className="mt-6 text-center leading-relaxed text-gray-700">
                                <strong>Our Mission:</strong> At CO-OP CONNECT,
                                our mission is to provide a collaborative
                                environment where students can gain real-world
                                experience, educators can enhance their
                                curriculum, and employers can find top talent.
                                We believe in the power of community and
                                collaboration to drive success.
                            </p>
                            <p className="mt-6 text-center leading-relaxed text-gray-700">
                                <strong>Our Journey:</strong> Founded in [Year],
                                CO-OP CONNECT started with a vision to transform
                                the educational landscape. Over the years, we
                                have grown into a trusted platform that has
                                helped thousands of students and professionals
                                achieve their goals.
                            </p>
                            <p className="mt-6 text-center leading-relaxed text-gray-700">
                                <strong>What We Do:</strong> We offer a variety
                                of services including internships, job
                                placements, and networking opportunities. Our
                                team is committed to supporting each user on
                                their unique journey to success.
                            </p>
                            <p className="mt-6 text-center leading-relaxed text-gray-700">
                                <strong>Why Choose Us:</strong> Choosing CO-OP
                                CONNECT means joining a community that values
                                innovation, integrity, and excellence. We are
                                dedicated to helping our users succeed and
                                thrive in their careers.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
