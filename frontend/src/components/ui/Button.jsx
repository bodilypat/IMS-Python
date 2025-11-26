//src/components/ui/Button.jsx 

import React from 'react';
import "./ui.css";

const Button = ({ children, onClick, className = "", variant = "primary", disabled = false, ...props }) => {
    const baseClasses = "px-4 py-2 rounded focus:outline-none transition duration-200";
    const variantClasses = {
        primary: "bg-blue-500 text-white hover:bg-blue-600",
        secondary: "bg-gray-500 text-white hover:bg-gray-600",
        danger: "bg-red-500 text-white hover:bg-red-600",
    };
    const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";
    const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${disabledClasses} ${className}`;

    return (
        <button
            className={combinedClasses}
            onClick={disabled ? null : onClick}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};
export default Button;
