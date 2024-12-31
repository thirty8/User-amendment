import React from "react";
import { useState, useEffect} from 'react';

import DataTable from "../../../../../../components/others/Datatable/DataTable";
// import ButtonComponent from "../../../others/Button/ButtonComponent";
// import InputField from "../../../others/Fields/InputField";

function AccountBlockageList({bbg,BlockedAccounts}) {
 
  return(
    <div>
              <div style={{zoom:0.9}}>
                <DataTable data={BlockedAccounts} columns={[
                  "Reason",
                  "Date Altered",
                  "Account Status",
                  "Branch",
                  "Posted By"
                ]}/>
                </div>
    </div>
  );
}

export default AccountBlockageList;
