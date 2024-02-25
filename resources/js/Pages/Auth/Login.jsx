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

export default function Login({ status, canResetPassword }) {
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

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}


            <div className="flex flex-col items-center p-6">
                <Link href="/">
                    <img src={logo} alt="CO-OP CONNECT Logo" className="mb-8" />
                </Link>
                
                <div className="w-full max-w-md">
                    <h2 className="font-semibold text-xl text-black mb-4 text-center">Sign in to CO-OP CONNECT</h2>


                    
                    <form onSubmit={submit}>
                        <div>
                            <InputLabel htmlFor="email" value="Email" className="text-left" />
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="Password" className="text-left" />
                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="block mt-4">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                />
                                <span className="ml-2 text-sm text-gray-600">Remember me</span>
                            </label>
                        </div>

                        <div className="flex flex-col items-center mt-4">
                            <PrimaryButton disabled={processing}>
                                Sign In
                            </PrimaryButton>
                        </div>

                        {canResetPassword && (
                            <div className="mt-4 text-left">
                                <Link
                                    href={route('password.request')}
                                    className="underline text-sm text-gray-600 hover:text-gray-900"
                                >
                                    Forgot your password?
                                </Link>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
