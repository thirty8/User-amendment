import React, { useState } from "react";

const Table = ({
  headers,
  data,
  renderAction,
  className = "",
  striped = false,
}) => {
  // Track expanded rows
  const [expandedRowIndex, setExpandedRowIndex] = useState(null);

  // Toggle expanded row when clicked
  const handleRowClick = (rowIndex) => {
    if (expandedRowIndex === rowIndex) {
      setExpandedRowIndex(null); // Collapse if it's already expanded
    } else {
      setExpandedRowIndex(rowIndex); // Expand the selected row
    }
  };

  return (
    <table
      className={`min-w-full border-collapse border border-gray-300 table-fixed ${className}`}
      style={{zoom: '0.70'}}
    >
      <thead className="bg-blue-500 dark:bg-blue-900">
        <tr>
          {headers.map((header, index) => (
            <th
              key={index}
              className="border border-gray-300 p-1 text-left text-white"
            >
              {header}
            </th>
          ))}
          {renderAction && (
            <th className="border border-gray-300 px-4 py-1 text-center text-white">
              Actions
            </th>
          )}
        </tr>
      </thead>
      <tbody className="border-2 border-gray-300 overflow-scroll">
        {data && data.length > 0 ? (
          data.map((row, rowIndex) => (
            <React.Fragment key={rowIndex}>
              {/* Display subset of the row initially */}
              <tr
                onClick={() => handleRowClick(rowIndex)}
                className={`cursor-pointer ${
                  striped && rowIndex % 2 === 0 ? "bg-gray-50" : ""
                }`}
              >
                {/* Display only a few key fields */}
                {/* <td className="border border-gray-300 p-1">
                  {row.RELATION_NO}
                </td> */}
                <td className="border border-gray-300 p-1">
                  {row.CUSTOMER_NUMBER}
                </td>
                <td className="border border-gray-300 p-1">
                  {row.FIRST_NAME}
                </td>
                <td className="border border-gray-300 p-1">
                  {row.SURNAME}
                </td>
                <td className="border border-gray-300 p-1">
                  {row.TYPE_OF_CUSTOMER == "ID" ? "INDIVIDUAL ACCOUNT" : "JOINT ACCOUNT"}
                </td>
                {renderAction && (
                  <td className="border border-gray-300 p-1 text-center">
                    {renderAction(row)}
                  </td>
                )}
              </tr>
            </React.Fragment>
          ))
        ) : (
          <tr>
            <td
              colSpan={headers.length + (renderAction ? 1 : 0)}
              className="border border-gray-300 px-4 py-2 text-center"
            >
              No data found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
