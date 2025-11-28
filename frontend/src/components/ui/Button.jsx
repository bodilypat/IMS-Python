// src/components/ui/Button.jsx

import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import "./ui.css";

const VARIANT_CLASSES = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
};

const cx = (...parts) => parts.filter(Boolean).join(" ");

const Button = forwardRef(function Button(
    { children, onClick, className = "", variant = "primary", disabled = false, type = "button", ...props },
    ref
) {
    const baseClasses = "px-4 py-2 rounded focus:outline-none transition duration-200";
    const variantClasses = VARIANT_CLASSES[variant] || VARIANT_CLASSES.primary;
    const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "hover:brightness-95";
    const combinedClasses = cx(baseClasses, variantClasses, disabledClasses, className);

    const handleClick = (event) => {
        if (disabled) {
            event.preventDefault();
            return;
        }
        onClick && onClick(event);
    };

    return (
        <button
            ref={ref}
            type={type}
            className={combinedClasses}
            onClick={handleClick}
            disabled={disabled}
            aria-disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
});

Button.propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
    className: PropTypes.string,
    variant: PropTypes.oneOf(["primary", "secondary", "danger"]),
    disabled: PropTypes.bool,
    type: PropTypes.oneOf(["button", "submit", "reset"]),
};

Button.defaultProps = {
    className: "",
    variant: "primary",
    disabled: false,
    type: "button",
};

Button.displayName = "Button";

export default React.memo(Button);
