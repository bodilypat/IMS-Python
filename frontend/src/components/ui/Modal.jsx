// src/components/ui/Modal.jsx
import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import "./ui.css";

const FOCUSABLE_SELECTORS =
    'a[href], area[href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    closeOnOverlayClick = true,
    ariaLabel,
    className = "",
}) => {
    const modalRef = useRef(null);
    const lastActiveElementRef = useRef(null);

    useEffect(() => {
        if (!isOpen) return;

        // save previously focused element
        lastActiveElementRef.current = document.activeElement;

        // prevent background scroll
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        // focus modal (or first focusable inside)
        const focusable = modalRef.current?.querySelectorAll(FOCUSABLE_SELECTORS);
        if (focusable && focusable.length) {
            focusable[0].focus();
        } else if (modalRef.current) {
            modalRef.current.focus();
        }

        const onKeyDown = (e) => {
            if (e.key === "Escape") {
                e.preventDefault();
                onClose?.();
            } else if (e.key === "Tab") {
                // basic focus trap
                const elements = modalRef.current?.querySelectorAll(FOCUSABLE_SELECTORS);
                if (!elements || elements.length === 0) {
                    e.preventDefault();
                    return;
                }
                const first = elements[0];
                const last = elements[elements.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };

        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = previousOverflow;
            // restore focus
            lastActiveElementRef.current?.focus?.();
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const overlayClick = (e) => {
        if (!closeOnOverlayClick) return;
        if (e.target === e.currentTarget) onClose?.();
    };

    const modalNode = (
        <div
            className={`modal-overlay ${className}`}
            onMouseDown={overlayClick}
            aria-hidden={!isOpen}
        >
            <div
                className="modal-content"
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? "modal-title" : undefined}
                aria-label={ariaLabel}
                ref={modalRef}
                tabIndex={-1}
                onMouseDown={(e) => e.stopPropagation()}
            >
                <div className="modal-header">
                    {title && (
                        <h2 id="modal-title" className="modal-title">
                            {title}
                        </h2>
                    )}
                    <button
                        className="modal-close-button"
                        onClick={onClose}
                        aria-label="Close dialog"
                    >
                        &times;
                    </button>
                </div>

                <div className="modal-body">{children}</div>
            </div>
        </div>
    );

    // render into document.body to avoid stacking/context issues
    if (typeof document !== "undefined") {
        return ReactDOM.createPortal(modalNode, document.body);
    }
    return modalNode;
};

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.node,
    children: PropTypes.node,
    closeOnOverlayClick: PropTypes.bool,
    ariaLabel: PropTypes.string,
    className: PropTypes.string,
};

export default Modal;
