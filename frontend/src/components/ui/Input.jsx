// src/components/ui/Input.jsx
import React, { forwardRef, useId } from "react";
import PropTypes from "prop-types";
import "./ui.css";

const Input = forwardRef(function Input(
    {
        id,
        label,
        type = "text",
        placeholder = "",
        value,
        defaultValue,
        onChange,
        error,
        help,
        className = "",
        wrapperClassName = "",
        ...props
    },
    ref
) {
    const autoId = useId();
    const inputId = id || `input-${autoId}`;
    const errorId = `${inputId}-error`;
    const inputClasses = `input input-bordered w-full max-w-xs ${error ? "input-error" : ""} ${className}`.trim();

    return (
        <div className={`form-control w-full max-w-xs ${wrapperClassName}`.trim()}>
            {label && (
                <label className="label" htmlFor={inputId}>
                    <span className="label-text">{label}</span>
                </label>
            )}

            <input
                id={inputId}
                ref={ref}
                type={type}
                placeholder={placeholder}
                value={value}
                defaultValue={defaultValue}
                onChange={onChange}
                className={inputClasses}
                aria-invalid={!!error}
                aria-describedby={error ? errorId : undefined}
                {...props}
            />

            {(error || help) && (
                <label className="label" id={errorId}>
                    <span className={`label-text-alt ${error ? "text-error" : ""}`}>
                        {error || help}
                    </span>
                </label>
            )}
        </div>
    );
});

Input.displayName = "Input";

Input.propTypes = {
    id: PropTypes.string,
    label: PropTypes.node,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    help: PropTypes.node,
    className: PropTypes.string,
    wrapperClassName: PropTypes.string,
};

export default React.memo(Input);
