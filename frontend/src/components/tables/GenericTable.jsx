// src/components/tables/GenericTable.jsx

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import Button from '../ui/Button';
import "./tables.css";

const getCellValue = (row, accessor) => {
    if (!accessor) return undefined;
    // accessor can be a function
    if (typeof accessor === 'function') {
        try {
            return accessor(row);
        } catch {
            return undefined;
        }
    }
    // string accessor supports dot paths: "user.name"
    if (typeof accessor === 'string' && accessor.includes('.')) {
        return accessor.split('.').reduce((acc, k) => (acc ? acc[k] : undefined), row);
    }
    return row[accessor];
};

const normalizeForSearch = (v) => {
    if (v === null || v === undefined) return '';
    if (v instanceof Date) return v.toISOString();
    if (typeof v === 'object') return JSON.stringify(v);
    return String(v);
};

const compareValues = (aRaw, bRaw, dir = 'asc') => {
    const a = aRaw;
    const b = bRaw;
    // handle undefined/null
    if (a === undefined || a === null) return b === undefined || b === null ? 0 : 1;
    if (b === undefined || b === null) return -1;

    // numbers
    if (typeof a === 'number' && typeof b === 'number') {
        return dir === 'asc' ? a - b : b - a;
    }

    // Dates
    if (a instanceof Date && b instanceof Date) {
        return dir === 'asc' ? a - b : b - a;
    }

    // booleans
    if (typeof a === 'boolean' && typeof b === 'boolean') {
        return dir === 'asc' ? (a === b ? 0 : a ? -1 : 1) : (a === b ? 0 : a ? 1 : -1);
    }

    // fallback to localeCompare on strings
    const sa = normalizeForSearch(a).toString();
    const sb = normalizeForSearch(b).toString();
    return dir === 'asc' ? sa.localeCompare(sb, undefined, { sensitivity: 'base', numeric: true }) : sb.localeCompare(sa, undefined, { sensitivity: 'base', numeric: true });
};

const GenericTable = ({
    columns = [],
    data = [],
    onEdit,
    onDelete,
    onView,
    pageSize = 10,
    searchable = true,
}) => {
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [sortBy, setSortBy] = useState(null);
    const [sortDir, setSortDir] = useState('asc');
    const [page, setPage] = useState(1);
    const [localPageSize, setLocalPageSize] = useState(pageSize);

    // sync incoming pageSize prop
    useEffect(() => setLocalPageSize(pageSize), [pageSize]);

    // debounce search to avoid expensive recalculation on every keystroke
    useEffect(() => {
        const t = setTimeout(() => setDebouncedSearch(search.trim().toLowerCase()), 250);
        return () => clearTimeout(t);
    }, [search]);

    // reset page when dependencies change
    useEffect(() => setPage(1), [debouncedSearch, localPageSize, data, sortBy, sortDir]);

    const textForCell = useCallback((row, col) => {
        if (typeof col.render === 'function') return col.render(row);
        const accessor = col.accessor || col.key;
        const value = getCellValue(row, accessor);
        return value === null || value === undefined ? '' : value;
    }, []);

    const matchesSearch = useCallback((row) => {
        if (!searchable || !debouncedSearch) return true;
        const q = debouncedSearch;
        return columns.some((col) => {
            const v = textForCell(row, col);
            return normalizeForSearch(v).toLowerCase().includes(q);
        });
    }, [debouncedSearch, columns, searchable, textForCell]);

    const filtered = useMemo(() => data.filter(matchesSearch), [data, matchesSearch]);

    const sorted = useMemo(() => {
        if (!sortBy) return filtered;
        const col = columns.find((c) => {
            const id = c.sortKey || c.accessor || c.key || c.header;
            return id === sortBy;
        });
        if (!col) return filtered;
        // stable sort: include original index
        const withIndex = filtered.map((r, i) => ({ r, i }));
        withIndex.sort((x, y) => {
            const a = textForCell(x.r, col);
            const b = textForCell(y.r, col);
            const cmp = compareValues(a, b, sortDir);
            return cmp !== 0 ? cmp : x.i - y.i;
        });
        return withIndex.map((w) => w.r);
    }, [filtered, sortBy, sortDir, columns, textForCell]);

    const totalPages = Math.max(1, Math.ceil(sorted.length / localPageSize));
    const paged = useMemo(() => sorted.slice((page - 1) * localPageSize, page * localPageSize), [sorted, page, localPageSize]);

    const toggleSort = useCallback((col) => {
        const id = col.sortKey || col.accessor || col.key || col.header;
        if (!id || col.sortable === false) return;
        if (sortBy === id) {
            setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortBy(id);
            setSortDir('asc');
        }
        setPage(1);
    }, [sortBy]);

    const hasActions = !!(onEdit || onDelete || onView);

    return (
        <div className="generic-table">
            <div className="table-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {searchable && (
                    <input
                        className="table-search"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        aria-label="Search table"
                    />
                )}
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <label>
                        Rows:
                        <select
                            value={localPageSize}
                            onChange={(e) => {
                                const newSize = Number(e.target.value) || 10;
                                setLocalPageSize(newSize);
                                setPage(1);
                            }}
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                        </select>
                    </label>
                </div>
            </div>

            <table className="table" role="table">
                <thead>
                    <tr>
                        {columns.map((col, ci) => {
                            const headerId = col.sortKey || col.accessor || col.key || `col-${ci}`;
                            const sortable = col.sortable !== false;
                            return (
                                <th
                                    key={headerId}
                                    onClick={() => (sortable ? toggleSort(col) : null)}
                                    className={sortable ? 'sortable' : ''}
                                    role={sortable ? 'button' : undefined}
                                    aria-sort={sortBy === headerId ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}
                                    tabIndex={sortable ? 0 : undefined}
                                    onKeyDown={(e) => {
                                        if (!sortable) return;
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            toggleSort(col);
                                        }
                                    }}
                                >
                                    {col.header || headerId}
                                    {sortBy === headerId && <span className="sort-indicator">{sortDir === 'asc' ? ' ▲' : ' ▼'}</span>}
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
                    {paged.map((row, idx) => {
                        const rowKey = row.id ?? row._id ?? `row-${idx}`;
                        return (
                            <tr key={rowKey}>
                                {columns.map((col, cidx) => {
                                    const cellKey = (col.sortKey || col.accessor || col.key || `c-${cidx}`) + '-' + rowKey;
                                    const rendered = textForCell(row, col);
                                    return <td key={cellKey}>{rendered}</td>;
                                })}
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
                        );
                    })}
                </tbody>
            </table>

            <div className="table-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
            </div>
        </div>
    );
};

GenericTable.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.object),
    data: PropTypes.array,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    onView: PropTypes.func,
    pageSize: PropTypes.number,
    searchable: PropTypes.bool,
};

export default GenericTable;
