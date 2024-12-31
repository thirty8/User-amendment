import React from 'react';
import { DatePickerInput } from '@mantine/dates';
import { Text } from '@mantine/core';

const DateOfBirthInput = ({ label, value, onChange, labelWidth, required, inputWidth, inputHeight }) => {
  return (
    <div className="flex items-center mb-4">
      <Text 
        style={{ width: labelWidth }} 
        className="mr-4 text-sm font-medium text-right"
      >
        {label}
        {required && <span className="text-red-500"> *</span>}
      </Text>
      <DatePickerInput
        value={value}
        onChange={onChange}
        placeholder="Select date"
        classNames={{
          input: 'border rounded-md p-2', // Custom styles
        }}
        style={{ flexGrow: 1, width: inputWidth, height: inputHeight }} // Set input width and height
      />
    </div>
  );
};

export default DateOfBirthInput;
