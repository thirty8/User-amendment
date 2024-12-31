import React from "react";
import { useState, useEffect } from "react";

import DataTable from "../../../../../../components/others/customtable";

function DebitLimit({ bbg, DBM }) {
  return (
    <div>
      <div style={{ zoom: 0.9 }}>
        <DataTable
          data={DBM}
          headers={[
            "Overdraft Type",
            "Utilized Amount",
            "Facility Amount",
            "Interest Rate",
            "Effective Date",
            "Expiry Date",
            "Utilization Expiry",
            "Penalty Rate",
            "Posted By",
          ]}
        />
      </div>
    </div>
  );
}

export default DebitLimit;
