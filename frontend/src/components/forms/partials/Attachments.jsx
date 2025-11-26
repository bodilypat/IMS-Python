//src/components/forms/partials/Attachments.jsx;

/* Uploading multiple files */
/* Preview list with filenames */
/* Remove individual attachment */
/* Restrict file types / size (optional) */
/* Reusable for: Purchase orders, Sales Orders, Products, Users */

import React, { useState } from 'react';

const Attachments = ({ attachments, onChange }) => {
    const [fileList, setFileList] = useState(attachments || []);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const updatedList = [...fileList, ...files];
        setFileList(updatedList);
        onChange(updatedList);
    };
    const handleRemoveFile = (index) => {
        const updatedList = fileList.filter((_, i) => i !== index);
        setFileList(updatedList);
        onChange(updatedList);
    };

    return (
        <div className="attachments-section">
            <label htmlFor="file-upload" className="block mb-2 font-medium">Attachments</label>
            <input
                id="file-upload"
                type="file"
                multiple
                onChange={handleFileChange}
                className="mb-4"
            />
            <ul className="attachment-list">
                {fileList.map((file, index) => (
                    <li key={index} className="flex items-center justify-between mb-2">
                        <span>{file.name}</span>
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
        </div>
    );
};
export default Attachments;
