import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const baseStyles = "px-6 py-3 rounded-md font-sans font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-slate";

    const variants = {
        primary: "bg-signal-orange text-white hover:bg-orange-700 focus:ring-signal-orange shadow-[0_0_15px_rgba(234,88,12,0.3)] hover:shadow-[0_0_25px_rgba(234,88,12,0.5)]",
        outline: "bg-transparent border border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white focus:ring-gray-600",
        secondary: "bg-gray-800 text-white hover:bg-gray-700 focus:ring-gray-600"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
