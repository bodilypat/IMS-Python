// src/components/ui/Table.jsx

import React, { useCallback, memo } from "react";
import PropTypes from "prop-types";
import "./ui.css";

/**
 * Simple, accessible and extensible Table component.
 * - Supports custom cell renderers via column.cell
 * - Safe accessor resolution for nested paths ("user.name")
 * - Optional row click handler and custom row key
 * - Empty state message and className passthrough
 */

const resolveAccessor = (row, accessor) => {
    if (typeof accessor === "function") return accessor(row);
    if (!accessor) return undefined;
    // support nested paths like "user.name"
    return accessor.split?.(".".toString()) // avoid minifiers complaining; works as normal split
        ? accessor.split(".").reduce((acc, key) => (acc == null ? undefined : acc[key]), row)
        : row[accessor];
};

const Table = ({
    columns = [],
    data = [],
    className = "",
    rowKey = (row, index) => index,
    onRowClick,
    emptyMessage = "No data available",
    stickyHeader = false,
}) => {
    const renderCell = useCallback(
        (col, row, rowIndex) => {
            if (typeof col.cell === "function") {
                return col.cell({ value: resolveAccessor(row, col.accessor), row, rowIndex, column: col });
            }
            const value = resolveAccessor(row, col.accessor);
            // show empty string instead of "undefined" or "null"
            return value == null ? "" : String(value);
        },
        []
    );

    return (
        <div className={`overflow-x-auto w-full ${className}`}>
            <table className="table w-full" role="table" aria-label="Data table">
                <thead className={stickyHeader ? "sticky top-0 bg-base-100 z-10" : ""}>
                    <tr>
                        {columns.map((col) => (
                            <th key={col.accessor ?? col.header} scope="col" aria-sort={col.sort ? "none" : undefined}>
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={Math.max(1, columns.length)} className="text-center py-4">
                                {emptyMessage}
                            </td>
                        </tr>
                    ) : (
                        data.map((row, rowIndex) => {
                            const k = typeof rowKey === "function" ? rowKey(row, rowIndex) : row[rowKey] ?? rowIndex;
                            return (
                                <tr
                                    key={k}
                                    onClick={onRowClick ? () => onRowClick(row, rowIndex) : undefined}
                                    tabIndex={onRowClick ? 0 : undefined}
                                    role={onRowClick ? "button" : undefined}
                                    className={onRowClick ? "cursor-pointer" : undefined}
                                >
                                    {columns.map((col) => (
                                        <td key={col.accessor ?? col.header}>{renderCell(col, row, rowIndex)}</td>
                                    ))}
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>
        </div>
    );
};

Table.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            header: PropTypes.node.isRequired,
            accessor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
            cell: PropTypes.func, // ({ value, row, rowIndex, column }) => node
            sort: PropTypes.bool,
        })
    ),
    data: PropTypes.array,
    className: PropTypes.string,
    rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    onRowClick: PropTypes.func,
    emptyMessage: PropTypes.node,
    stickyHeader: PropTypes.bool,
};

export default memo(Table);