import React from "react";
import { useState, useEffect } from "react";

import DataTable from "../../../../../../components/others/customtable";


function AccountHolders({ bbg, NoH }) {
  return (
    <div>
      <div style={{ zoom: 0.9 }}>
        <DataTable
          data={NoH}
          headers={[
            "Relation No.",
            "Customer Name",
            "Date Of Birth",
            "Mobile",
            "E-mail Address",
            "Gender",
          ]}
        />
      </div>
    </div>
  );
}

export default AccountHolders;
