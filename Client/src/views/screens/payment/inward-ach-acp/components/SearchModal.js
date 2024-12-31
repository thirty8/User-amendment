import React, { useState } from "react";
import InputField from "../../../../../../components/others/Fields/InputField";
import DataTable from "../../../../../../components/others/Datatable/DataTable";
function SearchModal({ header, description1, description2 }) {
  // height should be in percentages and width should be in pixels
  const [getModalHeaderColor, setModalHeaderColor] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );
  // console.log(getButtonColor, "themes");
  return (
    <div className="" style={{ padding: "", background: "" }}>
      {/* header */}
      <div
        style={{
          display: "flex",
          // fontWeight: "bold",
          backgroundColor: "#ffffea",
          justifyContent: "flex-start",
          paddingLeft: "10px",
          color: "white",
          // borderRadius:"20px",
          borderTopLeftRadius: "5px",
          borderTopRightRadius: "5px",
          background:
            `url(` +
            window.location.origin +
            `/assets/images/headerBackground/` +
            getModalHeaderColor.theme.headerImage +
            `)`,
        }}
      >
        {header}
      </div>

      {/* first description */}
      <div style={{ marginTop: "10px", fontSize: "90%", paddingLeft: "10px" }}>
        {description1}
      </div>

      {/* second description */}
      <div style={{ marginTop: "10px", fontSize: "90%", paddingLeft: "10px" }}>
        {description2}
      </div>

      {/* inputfield */}
      <div style={{ paddingLeft: "10px", margin: "20px 0px" }}>
        <InputField
          label={"Find"}
          labelWidth={"5%"}
          inputWidth={"60%"}
          type={"text"}
        />
      </div>

      {/* datatable */}
      <div>
        <DataTable />
      </div>
    </div>
  );
}

export default SearchModal;
