//src/components/forms/partials/FormFooter.jsx 

import React from 'react';
import Button from '../../ui/Button';

const FormFooter = ({ 
    onCancel,
    cancelLabel = 'Cancel',
    submitLabel = 'Save',
    isSubmitting = false,
    disable = false,
    className = "",

}) => {
    return (
        <div 
            className={`form-footer flex justify-end space-x-2 mt-4 ${className}`}
        >
        {onCancel && (
            <Button 
                type=
                variant="secondary"
                onClick={onCancel}
                disabled={isSubmitting}
            >
                {cancelLabel}
            </Button>
        )}
        <Button 
            type="submit"
            variant="primary"
            disabled={disable || isSubmitting}
            isLoading={isSubmitting}    
        >
            {submitLabel}
        </Button>
    </div>
    );
}








