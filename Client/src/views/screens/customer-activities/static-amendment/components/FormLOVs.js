import React from 'react';
import { Select } from '@mantine/core';

const FormLOVs = ({
  label,
  options,
  value,
  onChange,
  labelWidth,
  inputWidth,   // New prop for input width
  inputHeight,  // New prop for input height
  required,
}) => {
  return (
    <div className="flex items-center mb-4">
      <label
        className={`mr-4 text-sm font-medium text-right`}
        style={{ width: labelWidth }} // Dynamically set the label width
      >
        {label}
        {required ? <span className="text-red-500"> *</span> : null}
      </label>
      <Select
        value={value}
        onChange={onChange}
        placeholder="Select an option"
        data={options}
        style={{ 
          flexGrow: 1, // Makes the select field take remaining space
          width: inputWidth,   // Set input width
          height: inputHeight, // Set input height
        }}
      />
    </div>
  );
};

export default FormLOVs;
