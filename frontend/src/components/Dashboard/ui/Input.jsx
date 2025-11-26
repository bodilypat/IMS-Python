//src/components/ui/Input.jsx 

import React from 'react';
import "./ui.css";

const Input = ({ label, type = "text", placeholder = "", value, onChange, error, ...props }) => {
    return (
        <div className="form-control w-full max-w-xs">
            {label && <label className="label">
                <span className="label-text">{label}</span>
            </label>}
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`input input-bordered w-full max-w-xs ${error ? 'input-error' : ''}`}
                {...props}
            />
            {error && <label className="label">
                <span className="label-text-alt text-error">{error}</span>
            </label>}
        </div>
    );
};
export default Input;

