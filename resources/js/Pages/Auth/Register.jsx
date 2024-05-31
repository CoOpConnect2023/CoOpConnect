import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import logo from "./Images/COOPCONNECTLOGO.png";
import "./Register.scss";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("register"));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}
            <div className="flex flex-col items-center p-6">
                <Link href="/">
                    <img src={logo} alt="CO-OP CONNECT Logo" className="mb-4" />
                </Link>

                <div className="w-full max-w-md">
                    <h2 className="text-black mb-4 text-center signup-heading">
                        Sign Up
                    </h2>

                    <form onSubmit={submit}>
                        <div>
                            <InputLabel
                                htmlFor="name"
                                value="Full Name"
                                className="input-label"
                            />

                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                required
                            />

                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel
                                htmlFor="email"
                                value="Email"
                                className="input-label"
                            />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                required
                            />

                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel
                                htmlFor="password"
                                value="Password"
                                className="input-label"
                            />

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                required
                            />

                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>

                        <div className="mt-4">
                            <InputLabel
                                htmlFor="password_confirmation"
                                value="Confirm Password"
                                className="input-label"
                            />

                            <TextInput
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                                required
                            />

                            <InputError
                                message={errors.password_confirmation}
                                className="mt-2"
                            />
                        </div>

                        <div className="mx-auto max-w-sm text-center flex flex-wrap justify-center">
                            <div className="mx-auto max-w-sm text-center flex flex-wrap justify-center mt-4">
                                <div className="flex flex-col items-center mb-4">
                                    {" "}
                                    {/* Reduced margin */}
                                    <input
                                        id="radio1"
                                        type="radio"
                                        name="radio"
                                        className="hidden"
                                    />
                                    <label
                                        htmlFor="radio1"
                                        className="flex flex-col items-center cursor-pointer"
                                    >
                                        <span className="w-4 inline-block mb-1"></span>
                                        Teacher
                                    </label>
                                </div>

                                <div className="flex flex-col items-center mb-4">
                                    {" "}
                                    {/* Reduced margin */}
                                    <input
                                        id="radio2"
                                        type="radio"
                                        name="radio"
                                        className="hidden"
                                    />
                                    <label
                                        htmlFor="radio2"
                                        className="flex flex-col items-center cursor-pointer"
                                    >
                                        <span className="w-4 inline-block mb-1"></span>
                                        Employer
                                    </label>
                                </div>

                                <div className="flex flex-col items-center mb-4">
                                    {" "}
                                    {/* Reduced margin */}
                                    <input
                                        id="radio3"
                                        type="radio"
                                        name="radio"
                                        className="hidden"
                                    />
                                    <label
                                        htmlFor="radio3"
                                        className="flex flex-col items-center cursor-pointer"
                                    >
                                        <span className="w-4 inline-block mb-1"></span>
                                        Student
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-center">
                            <PrimaryButton disabled={processing} className="">
                                Sign Up
                            </PrimaryButton>
                        </div>

                        <div className="mt-8 w-full text-center">
                            Already a member?{" "}
                            <Link
                                href={route("login")}
                                className="underline text-m text-gray-600 hover:text-gray-900"
                            >
                                Log in
                            </Link>
                            {/* Empty div to maintain space between the link and the button */}
                            <div></div>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
