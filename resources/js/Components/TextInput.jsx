import { forwardRef, useEffect, useRef } from 'react';
import './TextInput.scss'; // Import the SCSS file

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, [isFocused]); // Add isFocused to the dependency array

    return (
        <input
            {...props}
            type={type}
            className={`text-input ${className}`} // Apply the CSS class
            ref={input}
        />
    );
});
