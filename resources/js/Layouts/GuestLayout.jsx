import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center py-6 sm:pt-0 bg-purple-50 dark:bg-gray-900">

            <div>
            </div>

            <div className="text-black w-full sm:max-w-md mt-6 px-6 py-4 bg-purple-200 dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
