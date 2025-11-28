// src/components/ui/Badge.jsx

import React, { forwardRef, useMemo } from 'react';
import PropTypes from 'prop-types';

import "./ui.css";

const typeStyles = {
    info: {
        solid: 'bg-blue-100 text-blue-800',
        outline: 'bg-transparent ring-1 ring-blue-500 text-blue-600',
    },
    success: {
        solid: 'bg-green-100 text-green-800',
        outline: 'bg-transparent ring-1 ring-green-500 text-green-600',
    },
    warning: {
        solid: 'bg-yellow-100 text-yellow-800',
        outline: 'bg-transparent ring-1 ring-yellow-500 text-yellow-600',
    },
    error: {
        solid: 'bg-red-100 text-red-800',
        outline: 'bg-transparent ring-1 ring-red-500 text-red-600',
    },
};

const sizeClasses = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-3 py-2 text-base',
};

const Badge = forwardRef(function Badge(
    { children, type = 'info', size = 'sm', className = '', rounded = true, outline = false, ...rest },
    ref
) {
    const computed = useMemo(() => {
        const styles = typeStyles[type] || typeStyles.info;
        const styleVariant = outline ? styles.outline : styles.solid;
        const sizeClass = sizeClasses[size] || sizeClasses.sm;
        const roundedClass = rounded ? 'rounded-full' : 'rounded-md';
        return `${sizeClass} ${roundedClass} ${styleVariant}`.trim();
    }, [type, size, rounded, outline]);

    return (
        <span
            ref={ref}
            className={`inline-flex items-center font-medium ${computed} ${className}`.trim()}
            role={rest.role || 'status'}
            {...rest}
        >
            {children}
        </span>
    );
});

Badge.displayName = 'Badge';

Badge.propTypes = {
    children: PropTypes.node,
    type: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    className: PropTypes.string,
    rounded: PropTypes.bool,
    outline: PropTypes.bool,
};

Badge.defaultProps = {
    type: 'info',
    size: 'sm',
    className: '',
    rounded: true,
    outline: false,
};

export default Badge;
