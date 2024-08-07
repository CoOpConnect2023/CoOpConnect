export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-violet-500 shadow-sm focus:ring-violet-500 dark:focus:ring-violet-500 dark:focus:ring-offset-gray-800 ' +
                className
            }
        />
    );
}
