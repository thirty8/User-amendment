import React from "react";
import CustomTable from "../../../../../../teller-ops/components/CustomTable";
import InputField from "../../../../../../../../components/others/Fields/InputField";
function Schedule({ scheduleData }) {
  return (
    <div>
      <CustomTable
        headers={[
          "#",
          "AP Account",
          "Expense Account",
          "Due Amount",
          "Due Date",
          "Frequency",
          "Branch",
          "Narration",
        ]}
        data={scheduleData}
        rowsPerPage={4}
        // style={columnAlignRight[5]}
        // theadBackground={"#22c55e"}
      />
      <div style={{ display: "flex", marginTop: "10px" }}>
        <div style={{ flex: 0.3 }}></div>
        <div style={{ flex: 0.3 }}>
          {/* <InputField
            label={"Total Amount"}
            labelWidth={"30%"}
            inputWidth={"48%"}
            disabled={true}
          /> */}
        </div>
      </div>
    </div>
  );
}

export default Schedule;
