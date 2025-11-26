//src/components/tables/GenericTable.jsx 

import React, { useState, useEffect } from 'react';
import Button from '../ui/Button';
import "./tables.css";

const GenericTable = ({
    columns = [],
    data = [],
    onEdit,
    onDelete,
    onView,
    pageSize = 10,
    searchable = true,
}) => {
    const [search, setSearch] = React.useState('');
    const [sortBy, setSortBy] = React.useState(null);
    const [sortDir, setSortDir] = React.useState('asc');
    const [page, setPage] = React.useState(1);

    React.useEffect(() => {
        setPage(1);
    }, [search, pageSize, data]);

    const textForCell = (row, col) => {
        if (typeof col.render === 'function') return col.render(row);
        const accessor = col.accessor || col.key;
        const value = accessor && accessor.includes('.')
            ? accessor.split('.').reduce((acc, k) => (acc ? acc[k] : undefined), row)
            : row[accessor];
        return value === null || value === undefined ? '' : String(value);
    };

    const matchesSearch = (row) => {
        if (!search) return true;
        const q = search.toLowerCase();
        return columns.some((col) => {
            const txt = String(textForCell(row, col)).toLowerCase();
            return txt.includes(q);
        });
    };

    const filtered = data.filter(matchesSearch);

    const sorted = React.useMemo(() => {
        if (!sortBy) return filtered;
        const col = columns.find((c) => c.accessor === sortBy || c.key === sortBy);
        if (!col) return filtered;
        const copy = [...filtered];
        copy.sort((a, b) => {
            const A = textForCell(a, col);
            const B = textForCell(b, col);
            if (A === B) return 0;
            if (sortDir === 'asc') return A > B ? 1 : -1;
            return A < B ? 1 : -1;
        });
        return copy;
    }, [filtered, sortBy, sortDir, columns]);

    const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
    const paged = sorted.slice((page - 1) * pageSize, page * pageSize);

    const toggleSort = (accessor) => {
        if (sortBy === accessor) {
            setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortBy(accessor);
            setSortDir('asc');
        }
        setPage(1);
    };

    const hasActions = onEdit || onDelete || onView;

    return (
        <div className="generic-table">
            <div className="table-header">
                {searchable && (
                    <input
                        className="table-search"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                )}
            </div>

            <table className="table">
                <thead>
                    <tr>
                        {columns.map((col) => {
                            const accessor = col.accessor || col.key;
                            return (
                                <th
                                    key={accessor}
                                    onClick={() => (col.sortable !== false ? toggleSort(accessor) : null)}
                                    className={col.sortable === false ? '' : 'sortable'}
                                >
                                    {col.header || accessor}
                                    {sortBy === accessor && <span className="sort-indicator">{sortDir === 'asc' ? ' ▲' : ' ▼'}</span>}
                                </th>
                            );
                        })}
                        {hasActions && <th>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {paged.length === 0 && (
                        <tr>
                            <td colSpan={columns.length + (hasActions ? 1 : 0)} className="no-data">
                                No records found.
                            </td>
                        </tr>
                    )}
                    {paged.map((row, idx) => (
                        <tr key={row.id ?? idx}>
                            {columns.map((col) => (
                                <td key={(col.accessor || col.key) + '-' + idx}>{textForCell(row, col)}</td>
                            ))}
                            {hasActions && (
                                <td className="actions">
                                    {onView && (
                                        <Button onClick={() => onView(row)} className="btn-small">
                                            View
                                        </Button>
                                    )}
                                    {onEdit && (
                                        <Button onClick={() => onEdit(row)} className="btn-small">
                                            Edit
                                        </Button>
                                    )}
                                    {onDelete && (
                                        <Button onClick={() => onDelete(row)} className="btn-danger btn-small">
                                            Delete
                                        </Button>
                                    )}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="table-footer">
                <div className="pagination">
                    <Button onClick={() => setPage(1)} disabled={page === 1}>
                        « First
                    </Button>
                    <Button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
                        ‹ Prev
                    </Button>
                    <span className="page-info">
                        Page {page} of {totalPages}
                    </span>
                    <Button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
                        Next ›
                    </Button>
                    <Button onClick={() => setPage(totalPages)} disabled={page === totalPages}>
                        Last »
                    </Button>
                </div>
                <div className="page-size">
                    <label>
                        Rows:
                        <select
                            value={pageSize}
                            onChange={(e) => {
                                const newSize = Number(e.target.value) || 10;
                                setPage(1);
                                // Note: parent prop pageSize won't update here; if you want dynamic pageSize control lift state up.
                            }}
                            disabled
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                        </select>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default GenericTable;
