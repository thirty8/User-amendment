import React, { useState, useEffect } from "react";

import { API_SERVER } from "../../../../../config/constant";

import ActionButtons from "../../../../../components/others/action-buttons/ActionButtons";
import TabsComponent from "../../../../../components/others/tab-component/tab-component";
import axios from "axios";
import "../../index.css"
import SwapDetails from "./components/details";
import SwapSwift from "./components/swift";
import { Zoom } from "@mui/material";

function RtgsSwap(){
    const [accDescription, setAccDescription] = useState('')

    console.log(accDescription, "stoff ankasa")
    const [getTheme, setTheme] = useState(
        JSON.parse(localStorage.getItem("theme"))
      );
      const [activeStep, setActiveStep] = useState(0);
      const headers = {
        'x-api-key': "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        'Content-Type': 'application/json'
      };
const TabsData = [
    {
        value: 'Details', label: "Details", component: <SwapDetails accDes={setAccDescription}/>
    },
    {
        value: 'Swift', label: "Swift", component: <SwapSwift accDetails={accDescription}/>
    },

];
const [activeTab, setActiveTab] = useState(TabsData[0].value);
return (
    <div className="">
        <ActionButtons />
        <TabsComponent 
        tabsData={TabsData}
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        /> 
    </div>
);
}
export default RtgsSwap;