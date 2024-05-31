import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import "./GuestLayout.scss";

export default function Guest({ children, className }) {
    return (
        <div className={`min-h-screen flex flex-col sm:justify-center items-center py-6 sm:pt-0 bg-purple-50 dark:bg-gray-900 ${className}`}>
            <div></div>

            <div className="bg-purple-200 dark:bg-gray-800 custom-shadow custom-size overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
