import React from "react";
import CustomTable from "../../../../../../teller-ops/components/CustomTable";

function Schedule({ scheduleData }) {
  return (
    // <div>
    <div
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
        borderRadius: "3px",
        backgroundColor: "#ffffff",
        padding: "5px",
      }}
    >
      {/* <DataTable  columns={["Prepay Account .CR","Expense Account .DB","Debit Amount","Due Date","Debit Branch","Narration"]} /> */}
      <CustomTable
        headers={[
          "#",
          "Prepay Account .CR",
          "Expense Account .DB",
          "Due Amount",
          "Due Date",
          "Frequency",
          "Branch",
          "Narration",
        ]}
        data={scheduleData}
        rowsPerPage={5}
        style={{ columnAlignRight: [4] }}
      />
      {/* <div style={{ marginTop: "10px", width: "70%", display: "flex" }}>
        <div style={{ flex: 0.4 }}>
        </div>
        <div style={{ flex: 0.2 }}></div>
        <div style={{ flex: 0.3, marginLeft: "50px" }}>
          <InputField
            label={"Total Amount"}
            labelWidth={"35%"}
            inputWidth={"45%"}
            disabled={true}
          />
        </div>
      </div> */}
    </div>
  );
}

export default Schedule;
