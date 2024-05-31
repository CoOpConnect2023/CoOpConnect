import React from "react";
import "./PrimaryButton.scss"; // Import SCSS file

export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <button {...props} className={`button button-default text-transform-none ${className}`} disabled={disabled}>
            {children}
        </button>
    );
}
