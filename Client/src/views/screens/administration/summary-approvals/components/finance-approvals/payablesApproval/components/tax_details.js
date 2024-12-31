import React, { useEffect, useState } from "react";
import CustomTable from "../../../../../../teller-ops/components/CustomTable";
import InputField from "../../../../../../../../components/others/Fields/InputField";

function TaxDetails({ taxTableData, taxAmount }) {
  function formatNumber(num) {
    const number = parseFloat(num);

    if (isNaN(number)) {
      return ""; // Return an empty string for invalid input
    }

    const formatted = number.toLocaleString("en-US", {
      minimumFractionDigits: 2,
    });

    return formatted;
  }

  return (
    <div className="w-full">
      <CustomTable
        headers={[
          "Tax Code",
          "Tax Description",
          "Tax Account",
          "Currency",
          "T.Type",
          "Tax Rate(%)",
          "Tax Amount",
        ]}
        style={{ columnAlignRight: [6, 7], columnFormat: [6, 7] }}
        data={taxTableData}
      />
      <div className="flex justify-end mt-1">
        <InputField
          textAlign={"right"}
          label={"Total Tax Amount"}
          inputWidth={"10%"}
          labelWidth={"80%"}
          disabled={true}
          value={formatNumber(taxAmount)}
        />
      </div>
    </div>
  );
}

export default TaxDetails;
