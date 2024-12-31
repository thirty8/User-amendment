import React from 'react';
import { Radio, Group } from '@mantine/core';

const GenderRadioButton = ({ selectedGender, onChange, label, labelWidth, labelColor, noMarginRight, required }) => {
  return (
    <div className="flex items-center mb-2">
      {/* Label on the left */}
      <label
        className={`mr-4 text-${labelColor} text-sm`} // Use Tailwind for responsive styling
        style={{ width: labelWidth }}
      >
        {label}
        {required ? <span className="text-red-500"> *</span> : null}
      </label>

      {/* Radio buttons arranged horizontally */}
      <Radio.Group value={selectedGender} onChange={onChange} >
        <div className='flex space-x-2'>
          <Radio value="male" label="Male" />
          <Radio value="female" label="Female" />
          <Radio value="other" label="Other" />
        </div>
      </Radio.Group>
    </div>
  );
};

export default GenderRadioButton;
