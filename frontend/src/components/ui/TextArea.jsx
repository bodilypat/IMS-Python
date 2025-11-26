//src/components/ui/TextArea.jsx 

import React from 'react';
import "./ui.css";

const TextArea = ({ label, placeholder = "Enter text here...", rows = 4, cols = 50, className = "", ...props }) => {
    return (
        <div className={`flex flex-col mb-4 ${className}`}>
            {label && <label className="mb-2 font-semibold text-gray-700">{label}</label>}
            <textarea
                placeholder={placeholder}
                rows={rows}
                cols={cols}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...props}
            ></textarea>
        </div>
    );
}
export default TextArea;

