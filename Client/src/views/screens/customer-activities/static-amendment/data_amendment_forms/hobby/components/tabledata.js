import React from 'react';
import { MdDelete } from "react-icons/md";

const Tabledata = ({ first, second, third, data, selectedItems, onCheckboxChange }) => {
  const maxdesc = 30;
  return (
    <div>
      <table className='border-2 border-double w-full'>
        <thead className=''>
          <tr className="border text-white bg-blue-800">
          <th className="">Select</th>
            <th className="px-4 py-3  w-[20%]">{first}</th>
            <th className="px-4 py-3 ">{second}</th>
            <th className="px-4 py-3  w-[30%]">{third}</th>
            
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.value} className="border hover:bg-gray-50 transition-colors">
              <td className="p-2 text-center">
                <input 
                  type="checkbox"
                  className="h-4 w-4 cursor-pointer"
                  checked={selectedItems.includes(item.value)}
                  onChange={() => onCheckboxChange(item.value)}
                />
              </td>
              <td className="text-center">{item.value}</td>
              <td className="text-center">{item.label}</td>
              <td className="text-center">
              {item.description.length > maxdesc 
                  ? item.description.substring(0, maxdesc) + "...." 
                  : item.description}
                </td>
              <td className="text-center">
                {/* Uncomment this section for delete functionality */}
                {/* <MdDelete
                  color="red"
                  size={25}
                  className="cursor-pointer inline-block hover:scale-110 transition-transform"
                  onClick={() => handleDelete(index)} // Add onClick handler if needed
                /> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Tabledata;