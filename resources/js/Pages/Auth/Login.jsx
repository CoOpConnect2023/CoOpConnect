import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
//import './Login.css';
import logo from './Images/COOPCONNECTLOGO.png';
import './Login.scss';

export default function Login({ status, canResetPassword, error }) {  // Add the `error` prop
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    const handleGoogleLogin = () => {
        window.location.href = '/auth/google/redirect';
    };

    const handleLinkedInLogin = () => {
        window.location.href = '/auth/linkedin/redirect';
    };

    return (
        <GuestLayout className="login-layout">
            <Head title="Log in" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            {error && (  // Display the error message if it exists
                <div className="mb-4 font-medium text-sm text-red-600">
                    {error}
                </div>
            )}

            <div className="flex flex-col items-center p-6">
                <Link href="/">
                    <img src={logo} alt="CO-OP CONNECT Logo" className="mb-8" />
                </Link>

                <div className="w-full max-w-md">
                    <h2 className="text-black mb-4 text-center signin-heading">
                        Sign In
                    </h2>

                    <form onSubmit={submit}>
                        <div>
                            <InputLabel
                                htmlFor="email"
                                value="Email"
                                className="input-label"
                            />
                            <TextInput
                                id="email"
                                data-testid="email-input"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
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
                                data-testid="password-input"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>

                        <div className="block mt-4">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData("remember", e.target.checked)
                                    }
                                />
                                <span className="ml-2 text-sm text-gray-600">
                                    Remember me
                                </span>
                            </label>
                        </div>

                        {canResetPassword && (
                            <div className="mt-4 text-left">
                                <Link
                                    href={route("password.request")}
                                    className="underline text-sm text-gray-600 hover:text-gray-900"
                                >
                                    Forgot your password?
                                </Link>
                            </div>
                        )}

                        <div className="flex flex-col items-center mt-4">
                            <PrimaryButton disabled={processing}>
                                Sign In
                            </PrimaryButton>
                        </div>

                        <div className="mt-4 text-center">
                            Don't have an account?{" "}
                            <Link
                                href={route("register")}
                                className="underline text-m text-gray-600 hover:text-gray-900"
                            >
                                Sign Up
                            </Link>
                        </div>

                        <div style={{ textAlign: "center", margin: "20px 0" }}>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <div
                                    style={{
                                        borderBottom: "1px solid black",
                                        width: "35%",
                                    }}
                                ></div>
                                <div className="text-center">Or continue with</div>
                                <div
                                    style={{
                                        borderBottom: "1px solid black",
                                        width: "35%",
                                    }}
                                ></div>
                            </div>
                        </div>

                        <div style={{ textAlign: 'center', margin: '20px 0' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div style={{ border: '1px solid black', padding: '10px', margin: '5px', width: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Link onClick={handleGoogleLogin} className="button-link">
                                        <button style={{ display: 'flex', alignItems: 'center', border: 'none', background: 'none', cursor: 'pointer' }}>
                                            <img src="/images/google-icon.png" alt="Google" style={{ width: '30px', marginRight: '10px' }} />
                                            <span>Log in with Google</span>
                                        </button>
                                    </Link>
                                </div>
                                <div style={{ border: '1px solid black', padding: '10px', margin: '5px', width: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Link onClick={handleLinkedInLogin} className="button-link">
                                        <button style={{ display: 'flex', alignItems: 'center', border: 'none', background: 'none', cursor: 'pointer' }}>
                                            <img src="/images/linkedin-icon.png" alt="LinkedIn" style={{ width: '30px', marginRight: '10px' }} />
                                            <span>Log in with LinkedIn</span>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
