import React, { useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

function Accordion({ title, children, isInitiallyExpanded = false }) {
  const [isExpanded, setIsExpanded] = useState(isInitiallyExpanded);

  // const handleToggle = () => {
  //   setIsExpanded(!isExpanded);
  // };

  const handleToggle = () => {
    if(isExpanded === false){
      setIsExpanded(true)
    }else{
      setIsExpanded(false)
    }
  };
  
const getTheme = JSON.parse(localStorage.getItem("theme"));


  return (
    <div className="w-full">
      <div className="border rounded-md shadow-sm">
        <div
          className="flex justify-between items-center bg-sky-700 pl-2 border-b rounded cursor-pointer select-none transition-all duration-200"
          onClick={handleToggle}
          // style={{backgroundColor:getTheme.theme.navBarColor}}
        >
          <h2 className="text-sm font-medium text-white">{title}</h2>
          <div className={`transform transition-transform duration-200 text-white ${isExpanded ? 'rotate-180' : 'rotate-0'} pr-2`}>
            {isExpanded ? <MdKeyboardArrowUp size={24} /> : <MdKeyboardArrowDown size={24} />}
          </div>
        </div>
        <div className={`overflow-scroll transition-all duration-200 ${isExpanded ? 'max-h-screen' : 'max-h-0'}`}>
          <div className="bg-gray-100 p-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Accordion;
