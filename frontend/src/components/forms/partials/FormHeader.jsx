//src/components/forms/partials/FormHeader.jsx 

/* Title */
/* Optional description */
/* Optional back button */
/* Optional action button (Save, Cancel, Custom) */
/* Perfect for all forms:Product, Supplier, PO, SO, Users */
/* Matches professional admin dashboard UI patterns */

import React from 'react';
import Button from '../../Button';
import { FaArrowLeft } from "react-icons/fa";

const FormHeader = ({
    title,
    submittle = "",
    description = "",
    icon = null,
    onBack = null, 
    align = "left", // "left", "center", "right"
    className = "",
}) => {
        const alignmentClasses = align === "center" ? "text-center items-center" : "text-left items-start";
        
    return (
        <header
            className={`form-header flex flex-col ${alignmentClasses} space-y-2 mb-6 ${className}`}
        >
            {/* Back Button */}
            {onBack && (
                <div className="self-start mb-2">
                    <Button 
                        variant="ghost"
                        type="button"
                        onClick={onBack}
                        className="flex items-center space-x-2"
                    >
                        <FaArrowLeft />
                        <span>Back</span>
                    </Button>
                </div>
            )}
            
            {/* Title Row */}
            <div className="flex items-center space-x-3 justify-center">
                {icon && 
                    <span className="text-primary-600 text-2xl">{icon}</span>}

                    <h2 className="text-2xl font-semibold">{title}</h2>
            </div>
            {/* Subtitle */}
            {submittle && (
                <p className="text-md text-gray-600">{submittle}</p>
            )}

            {/* Description */}
            {description && (
                <p className="text-sm text-gray-500">{description}</p>
            )}
        </header>
    );
}
export default FormHeader;
