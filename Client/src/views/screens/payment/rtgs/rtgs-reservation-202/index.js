import React, { useState,useEffect } from "react";
import "../../index.css";
import ActionButtons from "../../../../../components/others/action-buttons/ActionButtons";

import TabsComponent from "../../../../../components/others/tab-component/tab-component";
import axios from "axios";
import RTGSRDetails from "./components/details";
import RTGSRSWIFT from "./components/swift";


function RTGSR(){
  const [accDescription, setAccDescription] = useState('')

  console.log(accDescription, "stoff ankasa")
  const [getTheme, setTheme] = useState(
      JSON.parse(localStorage.getItem("theme"))
    );
    const [activeStep, setActiveStep] = useState(0);
    const headers = {
      'x-api-key': process.env.REACT_APP_API_KEY,
      'Content-Type': 'application/json'
    };
    const tabsData =[
      {
        value: 'Details', label: "Details", component:<RTGSRDetails accDes={setAccDescription} />
      },
      {
        value: "Swift", label: "Swift", component: <RTGSRSWIFT  accDetails={accDescription}/>
      },
    ]
    const [activeTab, setActiveTab] = useState(tabsData[0].value);
    return (
      <div className="" style={{}}>
          <ActionButtons />
          <TabsComponent 
          tabsData={tabsData}
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          /> 
      </div>
  );
  // const [getTheme, setTheme] = useState(
  //   JSON.parse(localStorage.getItem("theme"))
  // );
  //   const [activeStep, setActiveStep] = useState(0);

  //   const handleNext = () => {
  //       setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //     };
    
  //     const handleBack = () => {
  //       setActiveStep((prevActiveStep) => prevActiveStep - 1);
  //     };
    
  //     const handleClick = (index) => {
  //       setActiveStep(index);
  //     };
  //     const steps = [
  //       {
  //         count: 1,
  //         number: "Details",
  //         content: (
  //           <div>
  //             <RTGSRDetails />
  //           </div>
  //         ),
  //       },
  //       {
  //         count: 2,
  //         number: "Swift Details",
  //         content: (
  //           <div>
  //             <RTGSRSWIFT />
  //           </div>
  //         ),
  //       },
        
       
  //     ];
  //     const custom = `url(` +
  //     window.location.origin +
  //     `/assets/images/headerBackground/` +
  //     getTheme.theme.headerImage +
  //   `)`;
  //     return (
  //       <div className="" style={{zoom: "0.8"}}>
  //             <div className="bg-gray-100 p-2">
  //       <ul className="stepper rounded mb-4">
  //         {steps.map((step, index) => (
  //           <li
  //             key={step.number}
  //             className={`stepper__item cursor-pointer flex h-10 items-center justify-center `}
  //             style={{
  //               background: index === activeStep ? custom : "",
  //               color: index === activeStep ? "white" : "",
  //               border: index < activeStep ? "1px" : "",
  //               borderRadius: index < activeStep ? "10%" : "",
  //             }}

  //             onClick={() => handleClick(index)}
  //           >
  //             <div className="flex space-x-5 items-center justify-center">
  //               <div className="border-2 rounded-full flex justify-center items-center w-7 h-7 p-1 bg-black text-white">
  //                 {step.count}
  //               </div>
  //               <div>{step.number}</div>
  //             </div>
  //           </li>
  //         ))}
  //       </ul>
  //       {steps[activeStep].content}
  //       <div className="flex justify-between mt-4">
  //         <button
  //           className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l ${
  //             activeStep === 0 ? "cursor-not-allowed opacity-50" : ""
  //           }`}
  //           onClick={handleBack}
  //           disabled={activeStep === 0}
  //         >
  //           Back
  //         </button>
  //         <button
  //           className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r ${
  //             activeStep === steps.length - 1
  //               ? "cursor-not-allowed opacity-50"
  //               : ""
  //           }`}
  //           onClick={handleNext}
  //           disabled={activeStep === steps.length - 1}
  //         >
  //           Next
  //         </button>
  //       </div>
  //     </div>
  //       </div>
  //   );

}
export default RTGSR;