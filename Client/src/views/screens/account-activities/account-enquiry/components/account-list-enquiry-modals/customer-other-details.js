import React from "react";
import { useState, useEffect} from 'react';

import { Tabs } from "@mantine/core";

import DataTable from "../../../../../../components/others/customtable";




function CustomerOtherDetails({otherDetails}) {
 
  return (
    <div>
       <div style={{zoom:0.9,boxShadow:"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}}>
            <DataTable data={otherDetails} headers={["Relation Number","Relation Name","Address Line 1","Start Name","Location","Contact"]}/>
        </div>
    </div>

  );
}

export default CustomerOtherDetails;
