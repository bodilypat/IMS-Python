//src/components/ui/Badge.jsx 

import React from 'react';

import "./ui.css"

const Badge = ({ children, type = 'info' }) => {
    const typeClasses = {
        info: 'bg-blue-100 text-blue-800',
        success: 'bg-green-100 text-green-800',
        warning: 'bg-yellow-100 text-yellow-800',
        error: 'bg-red-100 text-red-800',
    };
    const classes = `px-2 py-1 rounded-full text-sm font-medium ${typeClasses[type] || typeClasses.info}`;

    return <span className={classes}>{children}</span>;
};
