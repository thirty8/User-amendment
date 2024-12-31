import React from "react";
import Header from "../../../../../components/others/Header/Header";
import CustomTable from "../../../control-setups/components/CustomTable";

function DPD() {
  const collectorList = [
    <div style={{ textAlign: "left" }}>Principal A/C</div>,
    <div style={{ textAlign: "left" }}>Customer Name</div>,
    <div style={{ textAlign: "left" }}>Branch Name</div>,
    <div>Arr. Days</div>,
    <div style={{ textAlign: "right" }}>Principal in Arrears</div>,
    <div style={{ textAlign: "right" }}>Interest in Arrears</div>,
    <div style={{ textAlign: "right" }}>Total Amount </div>,
    <div>Action</div>,
  ];
  return (
    <div>
      <Header headerShade title="Days Past Due" />
      <CustomTable
        headers={collectorList}
        data={[]}
        load={true}
        // rowsPerPage={11}
      />
    </div>
  );
}

export default DPD;
