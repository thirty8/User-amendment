import React from "react";
import Address from "./Address";

const Current_Address = ({
  setTableDataAddress,
  tableDataAddress,
  usedAddressTypes,
  setUsedAddressTypes,
  refinedData,
  setRefinedData,
  setAddNewRelation
}) => {
  return (
    <div className="mt-10">
      <Address
        setTableDataAddress={setTableDataAddress}
        tableDataAddress={tableDataAddress}
        usedAddressTypes={usedAddressTypes}
        setUsedAddressTypes={setUsedAddressTypes}
        refinedData={refinedData}
        setRefinedData={setRefinedData}
        setAddNewRelation={setAddNewRelation}
      />
    </div>
  );
};

export default Current_Address;