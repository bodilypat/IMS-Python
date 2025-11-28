//src/components/forms/partials/Attachments.jsx;

/* Uploading multiple files */
/* Preview list with filenames */
/* Remove individual attachment */
/* Restrict file types / size (optional) */
/* Reusable for: Purchase orders, Sales Orders, Products, Users */

import React, { useState, useEffect } from 'react';
import Input from '../../ui/Input';

const DEFAULT_MAX_SIZE_MB = 5; // 5 MB
const DEFAULT_ALLOWED_TYPES = [
    'image/jpeg',
    'image/png',
    'application/pdf'
];

const Attachments = ({ 
    attachments = [],
    onChange,
    maxSizeMB = DEFAULT_MAX_SIZE_MB,
    allowedTypes = DEFAULT_ALLOWED_TYPES
 }) => {

    const [fileList, setFileList] = useState(attachments);
    const [error, setError] = useState(null);

    useEffect(() => {
        setFileList(attachments);
    }, [attachments]);

    const isValidFile = (file) => {
        if (file.size > maxSizeMB * 1024 * 1024) {
            setError(`File size exceeds the limit of ${maxSizeMB} MB.`);
            return false;
        }
        if (!allowedTypes.includes(file.type)) {
            setError('File type is not allowed.');
            return false;
        }
        setError(null);
        return true;
    };
    
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        let validFiles = [];
        let validationError = null;

        files.forEach((file) => {
            const err = isValidFile(file);
            if (err) validationError = err;
            else validFiles.push(file);
        });

        if (validationError) {
            setError(validationError);
            return;
        }
        
        /* Remove duplicates by file name + size */
        const uniqueFiles = [
            ...fileList,
            ...validFiles.filter(newFile => 
                !fileList.some(existingFile => 
                    existingFile.name === newFile.name && existingFile.size === newFile.size
                )
            )
        ];
        setFileList(uniqueFiles);
        onChange(uniqueFiles);  
    };

    const handleRemoveFile = (index) => {
        const updatedList = fileList.filter((_, i) => i !== index);
        setFileList(updatedList);
        onChange(updatedList);
    };

    return (
        <div className="attachments-section space-y-3"> 
            <label htmlFor="file-upload" className="block font-medium">Attachments</label>
            <Input
                id="file-upload"
                type="file"
                multiple
                onChange={handleFileChange}
                className="border rounded p-2 w-full cursor-pointer"
            />
            {error && (
                <p className="text-red-500 text-sm">{error}</p>
            )}

            {fileList.length > 0 && (
                <ul className="attachment-list">
                    {fileList.map((file, index) => (
                        <li 
                            key={index} 
                            className="flex items-center justify-between mb-2"
                        >
                            <div>
                                <p className="text-sm">{file.name}</p>
                                <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => handleRemoveFile(index)}
                                className="text-red-500 hover:underline"
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>   
            )}
            <p className="text-xs text-gray-500">
                Allowed types: {allowedTypes.join(', ')}
                <br/>
                Max size per file: {maxSizeMB} MB.
            </p>
        </div>
    );
};
export default Attachments;
