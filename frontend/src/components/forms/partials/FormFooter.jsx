//src/components/forms/partials/FormFooter.jsx 

import React from 'react';
import Button from '../../ui/Button';

const FormFooter = ({ 
    onCancel,
    cancelLabel = 'Cancel',
    submitLabel = 'Save',
    isSubmitting = false,
    disabled = false,
    className = "",
    align = "right", // "left", "center", "right"
}) => {

    const alignmentClasses = {
        left: 'justify-start',
        center: 'justify-center',
        right: 'justify-end'
    } [align];

    return (
        <div 
            className={`form-footer flex ${alignmentClasses} space-x-2 mt-4 ${className}`}
            role="group"
        >
            
        {onCancel && (
            <Button 
                type="button"
                variant="secondary"
                onClick={onCancel}
                disabled={isSubmitting}
                aria-label="CancelLabel"
            >
                {cancelLabel}
            </Button>
        )}
        <Button 
            type="submit"
            variant="primary"
            disabled={disabled || isSubmitting}
            isLoading={isSubmitting}    
            aria-label="SubmitLabel"
        >
            {submitLabel}
        </Button>
    </div>
    );
}
export default FormFooter;









