import React from "react";
import { useState, useEffect } from "react";

import DataTable from "../../../../../../components/others/customtable";

function CreditLimit({ bbg, CRM }) {
  return (
    <div>
      <div style={{ zoom: 0.9 }}>
        <DataTable
          data={CRM}
          headers={[
            "Limit No.",
            "Amount",
            "Expiry Date",
            "Effective Date",
            "Posted Branch",
            "Posted By",
            "Comment",
          ]}
        />
      </div>
    </div>
  );
}

export default CreditLimit;
