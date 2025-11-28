// src/components/ui/TextArea.jsx
import React, { forwardRef, useId, useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./ui.css";

const TextArea = forwardRef(function TextArea(
    {
        label,
        id,
        placeholder = "Enter text here...",
        rows = 4,
        className = "",
        error = "",
        resize = "vertical", // "none" | "both" | "horizontal" | "vertical"
        showCount = false,
        maxLength,
        ...rest
    },
    ref
) {
    const autoId = useId();
    const textareaId = id || `textarea-${autoId}`;

    // Support controlled and uncontrolled usage
    const [internalValue, setInternalValue] = useState(
        rest.value ?? rest.defaultValue ?? ""
    );
    useEffect(() => {
        if (rest.value !== undefined) {
            setInternalValue(rest.value);
        }
    }, [rest.value]);

    const handleChange = (e) => {
        if (rest.onChange) rest.onChange(e);
        // update internal state only for uncontrolled usage
        if (rest.value === undefined) setInternalValue(e.target.value);
    };

    const baseTextAreaClass =
        "p-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors";
    const normalState = "border-gray-300 focus:ring-blue-500";
    const errorState = "border-red-500 focus:ring-red-500";
    const textareaClass = `${baseTextAreaClass} ${
        error ? errorState : normalState
    } ${className}`;

    const ariaDescribedBy = error
        ? `${textareaId}-error`
        : showCount && maxLength
        ? `${textareaId}-count`
        : undefined;

    return (
        <div className={`flex flex-col mb-4 ${className}`}>
            {label && (
                <label htmlFor={textareaId} className="mb-2 font-semibold text-gray-700">
                    {label}
                </label>
            )}
            <textarea
                id={textareaId}
                ref={ref}
                placeholder={placeholder}
                rows={rows}
                className={textareaClass}
                style={{ resize }}
                aria-invalid={!!error}
                aria-describedby={ariaDescribedBy}
                maxLength={maxLength}
                value={rest.value !== undefined ? rest.value : internalValue}
                onChange={handleChange}
                {...rest}
            />
            <div className="mt-1 flex items-center justify-between text-sm">
                {error ? (
                    <span id={`${textareaId}-error`} className="text-red-600">
                        {error}
                    </span>
                ) : (
                    <span />
                )}
                {showCount && maxLength ? (
                    <span id={`${textareaId}-count`} className="text-gray-500">
                        {(rest.value !== undefined ? rest.value : internalValue).length}/{maxLength}
                    </span>
                ) : null}
            </div>
        </div>
    );
});

TextArea.propTypes = {
    label: PropTypes.node,
    id: PropTypes.string,
    placeholder: PropTypes.string,
    rows: PropTypes.number,
    className: PropTypes.string,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    resize: PropTypes.oneOf(["none", "both", "horizontal", "vertical"]),
    showCount: PropTypes.bool,
    maxLength: PropTypes.number,
    // value, defaultValue, onChange are standard textarea props and are accepted via ...rest
};

TextArea.defaultProps = {
    placeholder: "Enter text here...",
    rows: 4,
    className: "",
    error: "",
    resize: "vertical",
    showCount: false,
};

export default React.memo(TextArea);

