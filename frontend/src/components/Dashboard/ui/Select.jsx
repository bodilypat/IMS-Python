//src/components/ui/Select.jsx 

import React from 'react';
import "./ui.css";

const Select = ({ label, options = [], value, onChange, error, ...props }) => {
    return (
        <div className="w-full">
            {label && <label className="label">
                <span className="label-text">{label}</span>
            </label>}
            <select
                className={`select select-bordered w-full ${error ? 'select-error' : ''}`}
                value={value}
                onChange={onChange}
                {...props}
            >
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <label className="label">
                <span className="label-text-alt text-red-500">{error}</span>
            </label>}
        </div>
    );
}

export default Select;
