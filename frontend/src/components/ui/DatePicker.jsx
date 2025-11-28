// src/components/ui/DatePicker.jsx

import React, { forwardRef, useId } from "react";
import PropTypes from "prop-types";
import "./ui.css";

const formatDate = (d) => {
    if (d === null || d === undefined || d === "") return "";
    if (d instanceof Date && !Number.isNaN(d.getTime())) {
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");
        return `${yyyy}-${mm}-${dd}`;
    }
    return String(d);
};

const DatePicker = forwardRef(({
    label,
    selectedDate,
    onDateChange,
    error,
    id,
    className = "",
    inputClassName = "",
    ...props
}, ref) => {
    const uid = typeof useId === "function" ? useId() : `date-${Math.random().toString(36).slice(2, 9)}`;
    const inputId = id || uid;
    const describedBy = error ? `${inputId}-error` : undefined;

    const handleChange = (e) => {
        const val = e.target.value;
        // Normalize empty string to null for consumers that expect no date
        if (onDateChange) onDateChange(val === "" ? null : val);
    };

    return (
        <div className={`form-control w-full max-w-xs ${className}`}>
            {label && (
                <label className="label" htmlFor={inputId}>
                    <span className="label-text">{label}</span>
                </label>
            )}
            <input
                ref={ref}
                id={inputId}
                type="date"
                className={`input input-bordered w-full max-w-xs ${error ? "input-error" : ""} ${inputClassName}`}
                value={formatDate(selectedDate)}
                onChange={handleChange}
                aria-invalid={!!error}
                aria-describedby={describedBy}
                {...props}
            />
            {error && (
                <label className="label" id={`${inputId}-error`}>
                    <span className="label-text-alt text-error">{error}</span>
                </label>
            )}
        </div>
    );
});

DatePicker.displayName = "DatePicker";

DatePicker.propTypes = {
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    selectedDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    onDateChange: PropTypes.func,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    id: PropTypes.string,
    className: PropTypes.string,
    inputClassName: PropTypes.string
};

DatePicker.defaultProps = {
    label: "",
    selectedDate: "",
    onDateChange: undefined,
    error: null,
    id: undefined,
    className: "",
    inputClassName: ""
};

export default DatePicker;
