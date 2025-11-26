//src/components/ui/DatePicker.jsx

import React from 'react';
import "./ui.css";

const DatePicker = ({ labe, selectedDate, onDateChange, error, ...props }) => {
    return (
        <div className="form-control w-full max-w-xs">
            <label className="label">
                <span className="label-text">{labe}</span>
            </label>
            <input
                type="date"
                className={`input input-bordered w-full max-w-xs ${error ? 'input-error' : ''}`}
                value={selectedDate}
                onChange={(e) => onDateChange(e.target.value)}
                {...props}
            />
            {error && <label className="label"><span className="label-text-alt text-error">{error}</span></label>}
        </div>
    );
}
export default DatePicker;
