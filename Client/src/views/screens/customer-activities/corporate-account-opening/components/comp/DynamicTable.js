import React, { useState } from "react";
import InputField from "./InputField";

const DynamicTable = () => {
  const [rows, setRows] = useState([{ associateCompany: "", address: "" }]);

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedRows = [...rows];
    updatedRows[index][name] = value;
    setRows(updatedRows);
  };

  const handleAddRow = () => {
    setRows([...rows, { associateCompany: "", address: "" }]);
  };

  const handleRemoveRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  return (
    <div className="px-4 py-8">
      <div className="w-full bg-white p-1 rounded-lg">
        <div className="text-lg">Associate Company</div>
        <hr className="mb-3" />

        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm text-gray-600 dark:text-gray-300">
          <thead className="bg-blue-500 dark:bg-blue-900 text-white text-xs uppercase font-medium">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">
                Associate Company
              </th>
              <th className="px-6 py-3 text-left font-semibold">Address</th>
              <th className="px-6 py-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {rows.map((row, index) => (
              <tr key={index} className="border-t border-gray-200">
                <td className="px-6 py-4">
                  <InputField
                    label=""
                    inputWidth="250px"
                    type="text"
                    name="associateCompany"
                    value={row.associateCompany}
                    onChange={(e) => handleInputChange(index, e)}
                    placeholder="Associate Company"
                  />
                </td>
                <td className="px-6 py-4">
                  <InputField
                    label=""
                    inputWidth="250px"
                    type="text"
                    name="address"
                    value={row.address}
                    onChange={(e) => handleInputChange(index, e)}
                    placeholder="Address"
                  />
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleRemoveRow(index)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end mt-4">
          <button
            onClick={handleAddRow}
            className="w-1/6 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            Add Row
          </button>
        </div>
      </div>
    </div>
  );
};

export default DynamicTable;
