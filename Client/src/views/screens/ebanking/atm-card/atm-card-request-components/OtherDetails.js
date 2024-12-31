import React from "react";
import Header from "../../../../../components/others/Header/Header";
// import CustomTable from "../../../teller_stuff/teller-ops/components/CustomTable";
import SelectField from "../../../../../components/others/Fields/SelectField";
import InputField from "../../../../../components/others/Fields/InputField";
import ListOfValue from "../../../../../components/others/Fields/ListOfValue";

function OtherDetails() {
  return (
    <div>
      <div style={{ flex: 1, display: "flex" }}>
        <div style={{ flex: 0.5 }} className="py-4 space-y-4">
          <InputField label={"Title"} labelWidth={"20%"} inputWidth={"68%"} />
          <InputField
            label={"Salutation"}
            labelWidth={"20%"}
            inputWidth={"68%"}
          />
          <InputField
            label={"First Name"}
            required
            labelWidth={"20%"}
            inputWidth={"68%"}
          />
          <InputField
            label={"Middle Name"}
            labelWidth={"20%"}
            inputWidth={"68%"}
          />
          <InputField
            label={"Surname"}
            required
            labelWidth={"20%"}
            inputWidth={"68%"}
          />

          <div style={{ display: "flex", width: "100%" }}>
            <div style={{ width: "50%" }}>
              <InputField
                label={"Date Of Birth"}
                labelWidth={"40%"}
                inputWidth={"50%"}
                required
              />
            </div>

            <div style={{ width: "50%" }}>
              <InputField
                label={"Gender"}
                labelWidth={"25%"}
                inputWidth={"50%"}
                required
              />
            </div>
          </div>

          <div style={{ display: "flex", width: "100%" }}>
            <div style={{ width: "50%" }}>
              <InputField
                label={"Primary Mobile No."}
                labelWidth={"40%"}
                inputWidth={"50%"}
                required
              />
            </div>

            <div style={{ width: "50%" }}>
              <InputField label={"Tin"} labelWidth={"25%"} inputWidth={"50%"} />
            </div>
          </div>

          <InputField label={"Email"} labelWidth={"20%"} inputWidth={"40%"} />
        </div>
        <div style={{ flex: 0.5 }} className=" space-y-4">
          <InputField label={"ID Type"} labelWidth={"20%"} inputWidth={"68%"} />

          <div style={{ display: "flex", width: "100%" }}>
            <div style={{ width: "50%" }}>
              <InputField
                label={"ID No"}
                labelWidth={"40%"}
                inputWidth={"50%"}
              />
            </div>

            <div style={{ width: "50%" }}>
              <InputField
                label={"Issuing Auth."}
                labelWidth={"25%"}
                inputWidth={"50%"}
              />
            </div>
          </div>

          <div style={{ display: "flex", width: "100%" }}>
            <div style={{ width: "50%" }}>
              <InputField
                label={"Issuing Date"}
                labelWidth={"40%"}
                inputWidth={"50%"}
              />
            </div>

            <div style={{ width: "50%" }}>
              <InputField
                label={"ID Expiry Date"}
                labelWidth={"25%"}
                inputWidth={"50%"}
              />
            </div>
          </div>

          <InputField
            label={"Issuing Place"}
            labelWidth={"20%"}
            inputWidth={"68%"}
          />

          <InputField
            label={"Flat/Villa/House No"}
            labelWidth={"20%"}
            inputWidth={"68%"}
          />

          <InputField
            label={"Street Name"}
            labelWidth={"20%"}
            inputWidth={"68%"}
          />

          <InputField
            label={"Location/GPRS"}
            labelWidth={"20%"}
            inputWidth={"68%"}
          />

          <InputField label={"City"} labelWidth={"20%"} inputWidth={"68%"} />

          <InputField label={"Country"} labelWidth={"20%"} inputWidth={"68%"} />
        </div>
      </div>
    </div>
  );
}

export default OtherDetails;
