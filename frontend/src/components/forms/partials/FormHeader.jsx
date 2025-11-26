//src/components/forms/partials/FormHeader.jsx 

/* Title */
/* Optional description */
/* Optional back button */
/* Optional action button (Save, Cancel, Custom) */
/* Perfect for all forms:Product, Supplier, PO, SO, Users */
/* Matches professional admin dashboard UI patterns */

import React from 'react';
import { Form } from '../../ui/ui.css';
import { Button } from '../../ui/Button';
import { Icon } from '../../ui/Icon';   
import { Link } from 'react-router-dom';

interface FormHeaderProps {
    title: string;
    description?: string;
    backLink?: string;
    actionButton?: {
        label: string;
        onClick: () => void;
        type?: 'primary' | 'secondary' | 'danger';
    };
}
export const FormHeader: React.FC<FormHeaderProps> = ({ title, description, backLink, actionButton }) => {
    return (
        <Form.Header>
            <div className="form-header-left">
                {backLink && (
                    <Link to={backLink} className="form-header-back">   
                        <Icon name="arrow-left" /> Back
                    </Link>
                )}
                <div className="form-header-titles">
                    <h1 className="form-header-title">{title}</h1>
                    {description && <p className="form-header-description">{description}</p>}
                </div>
            </div>
            {actionButton && (
                <Button
                    type={actionButton.type || 'primary'}
                    onClick={actionButton.onClick}
                    className="form-header-action-button"
                >
                    {actionButton.label}
                </Button>
            )}
        </Form.Header>
    );
};



