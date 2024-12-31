import React from "react";
import { useState, useEffect } from "react";

import DataTable from "../../../../../../components/others/customtable";
// import ButtonComponent from "../../../others/Button/ButtonComponent";
// import InputField from "../../../others/Fields/InputField";

function BlockedAmount({ bbg, BA }) {
  return (
    <div>
      <div style={{ zoom: 0.9 }}>
        <DataTable
          data={BA}
          headers={["Posted By", "Source Branch", "Narration", "Amount"]}
        />
      </div>
    </div>
  );
}

export default BlockedAmount;
