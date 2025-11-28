// src/components/ui/Select.jsx

import React, { forwardRef, useMemo } from "react";
import PropTypes from "prop-types";
import "./ui.css";

const normalizeOptions = (options) =>
    options.map((opt) =>
        typeof opt === "string" || typeof opt === "number"
            ? { label: String(opt), value: opt }
            : { label: opt.label ?? String(opt.value), value: opt.value }
    );

const Select = forwardRef(function Select(
    {
        label,
        options = [],
        value = "",
        onChange,
        onValueChange,
        placeholder,
        error,
        className = "",
        required = false,
        disabled = false,
        name,
        id,
        ...props
    },
    ref
) {
    const normOptions = useMemo(() => normalizeOptions(options), [options]);

    const handleChange = (e) => {
        if (onChange) onChange(e);
        if (onValueChange) onValueChange(e.target.value);
    };

    return (
        <div className={`w-full ${className}`}>
            {label && (
                <label className="label" htmlFor={id}>
                    <span className="label-text">{label}</span>
                </label>
            )}

            <select
                id={id}
                name={name}
                ref={ref}
                className={`select select-bordered w-full ${error ? "select-error" : ""}`}
                value={value ?? ""}
                onChange={handleChange}
                aria-invalid={!!error}
                aria-describedby={error ? `${id ?? name}-error` : undefined}
                required={required}
                disabled={disabled}
                {...props}
            >
                {placeholder != null && (
                    <option value="" disabled={required || placeholder !== ""}>
                        {placeholder}
                    </option>
                )}

                {normOptions.length === 0 ? (
                    <option value="" disabled>
                        No options
                    </option>
                ) : (
                    normOptions.map((option) => (
                        <option key={String(option.value)} value={option.value}>
                            {option.label}
                        </option>
                    ))
                )}
            </select>

            {error && (
                <label className="label" id={`${id ?? name}-error`}>
                    <span className="label-text-alt text-red-500">{error}</span>
                </label>
            )}
        </div>
    );
});

Select.propTypes = {
    label: PropTypes.node,
    options: PropTypes.array,
    value: PropTypes.any,
    onChange: PropTypes.func,
    onValueChange: PropTypes.func,
    placeholder: PropTypes.string,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    className: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    name: PropTypes.string,
    id: PropTypes.string,
};

Select.defaultProps = {
    options: [],
    value: "",
    placeholder: null,
    error: null,
    className: "",
    required: false,
    disabled: false,
};

export default React.memo(Select);
