import React, { useState } from "react";
import axios from "axios";

// RoleSelection Component
function RoleSelection({ roles, selectedRoles, directorStatus, inputValues, error, success, loading, relationNo, custNo, handleCheckboxChangeStakeholder, handleDirectorStatusChange, handleInputChangeStakeholder, handleSubmitStakeholder}) {
  
  return (
    <div className="p-4">
      <h3 className="text-lg font-bold mb-4">Select Stakeholder</h3>
      <div className="grid grid-cols-5 gap-4">
        {roles.map((role) => (
          <div
            key={role.name}
            className="border p-4 rounded shadow-sm bg-white"
          >
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name={role.name}
                checked={!!selectedRoles[role.name]}
                onChange={handleCheckboxChangeStakeholder}
                className="form-checkbox text-blue-600"
              />
              <span>{role.label}</span>
            </label>

            {/* Conditional Rendering Based on Role Configurations */}
            {role.name === "Director" && selectedRoles[role.name] && (
              <div className="mt-2">
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="director_status"
                      value="active"
                      checked={directorStatus === "active"}
                      onChange={handleDirectorStatusChange}
                      className="form-radio text-blue-600"
                    />
                    <span>Active</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="directorStatus"
                      value="nonActive"
                      checked={directorStatus === "nonActive"}
                      onChange={handleDirectorStatusChange}
                      className="form-radio text-blue-600"
                    />
                    <span>Non-Active</span>
                  </label>
                </div>
                {directorStatus === "active" && (
                  <input
                    type="text"
                    placeholder="Enter active details"
                    value={inputValues["DirectorActiveDetails"] || ""}
                    onChange={(e) =>
                      handleInputChangeStakeholder("DirectorActiveDetails", e.target.value)
                    }
                    className="mt-2 p-2 border rounded w-full"
                  />
                )}
              </div>
            )}

            {role.name === "Shareholder" && selectedRoles[role.name] && (
              <input
                type="text"
                placeholder="Enter shared amount"
                value={inputValues["ShareholderDetails"] || ""}
                onChange={(e) =>
                  handleInputChangeStakeholder("ShareholderDetails", e.target.value)
                }
                className="mt-2 p-2 border rounded w-full text-right"
              />
            )}

            {role.name === "Others" && selectedRoles[role.name] && (
              <input
                type="text"
                placeholder="Specify other role"
                value={inputValues["OthersDetails"] || ""}
                onChange={(e) =>
                  handleInputChangeStakeholder("OthersDetails", e.target.value)
                }
                className="mt-2 p-2 border rounded w-full"
              />
            )}
          </div>
        ))}
      </div>

      {/* Submit Button */}
      {/* <div className="mt-4">
        <button
          onClick={handleSubmitStakeholder}
          // disabled={loading}
          // className={`p-2 text-white rounded ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
        >
         Submit
        </button>
      </div> */}

      {/* Error and Success Messages */}
      {error && <div className="text-red-600 mt-2">{error}</div>}
      {success && <div className="text-green-600 mt-2">{success}</div>}
    </div>
  );
}

export default RoleSelection;
