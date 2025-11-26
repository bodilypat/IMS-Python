//src/components/ui/Table.jsx

import React from 'react';
import "./ui.css";

const Table = ({ columns = [], data = [] }) => {
    return (
        <div className="overflow-x-auto w-full">
            <table className="table w-full">
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th key={col.accessor}>{col.header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((col) => (
                                <td key={col.accessor}>{row[col.accessor]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;