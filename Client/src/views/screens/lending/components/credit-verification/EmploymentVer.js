import React, { useState, useEffect } from "react";
import InputField from "../fields/InputField";
import ListOfValue from "../fields/ListOfValue";
import SelectField from "../fields/SelectField";
import ButtonComponent from "../button/ButtonComponent";
import CustomTable from "../data-table/CustomTable";
import ButtonType from "../button/ButtonType";
import Label from "../label/Label";
import TextAreaField from "../fields/TextArea";
import HeaderComponent from "../header/HeaderComponent";
import axios from "axios";
import { API_SERVER } from "../../../../../config/constant";
import RadioButtons from "../../../../../components/others/Fields/RadioButtons";

const EmploymentVer = () => {
  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );

  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };
  return (
    <div>
      <div>
        <HeaderComponent
          title={"Employment Details"}
          height={"35px"}
          color={"white"}
        />
      </div>
      <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
        <div
          style={{
            flex: 0.6,
            padding: "10px",
            borderRadius: "5px",
            border: "1.5px solid #d6d7d9",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
            backgroundColor: "white",
          }}
        >
          <div>
            <SelectField
              label={"Employment Category"}
              labelWidth={"30%"}
              inputWidth={"50%"}
              required
            />
          </div>
          <div>
            <ListOfValue
              label={"Employment Type"}
              labelWidth={"30%"}
              inputWidth={"50%"}
              required
            />
          </div>
          <div>
            <InputField
              label={"Employer"}
              labelWidth={"30%"}
              inputWidth={"50%"}
            />
          </div>
          <div>
            <InputField
              label={"Others"}
              labelWidth={"30%"}
              inputWidth={"50%"}
            />
          </div>
          <div>
            <InputField
              label={"Position Held"}
              labelWidth={"30%"}
              inputWidth={"50%"}
              required
            />
          </div>
          <div>
            <InputField
              type={"date"}
              label={"Employed Since"}
              labelWidth={"30%"}
              inputWidth={"25%"}
              required
            />
          </div>
          <div>
            <InputField
              type={"date"}
              label={"Date of Commencement"}
              labelWidth={"30%"}
              inputWidth={"25%"}
            />
          </div>
          <div>
            <InputField
              type={"date"}
              label={"Date of Exited"}
              labelWidth={"30%"}
              inputWidth={"25%"}
            />
          </div>
          <div>
            <InputField
              label={"Address 1"}
              labelWidth={"30%"}
              inputWidth={"50%"}
              required
            />
          </div>
          <div>
            <InputField
              label={"Address 2"}
              labelWidth={"30%"}
              inputWidth={"50%"}
            />
          </div>
          <div>
            <InputField
              label={"Email Address"}
              labelWidth={"30%"}
              inputWidth={"50%"}
            />
          </div>
        </div>
        <div
          style={{
            flex: 0.4,
            padding: "10px",
            borderRadius: "5px",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
            backgroundColor: "white",
            border: "1.5px solid #d6d7d9",
          }}
        >
          <div>
            <InputField
              label={"Phone 1"}
              labelWidth={"35%"}
              inputWidth={"50%"}
              required
            />
          </div>
          <div>
            <InputField
              label={"Phone 2"}
              labelWidth={"35%"}
              inputWidth={"55%"}
            />
          </div>
          <div>
            <InputField
              label={"Location"}
              labelWidth={"35%"}
              inputWidth={"55%"}
            />
          </div>
          <div>
            <ListOfValue
              label={"City"}
              labelWidth={"35%"}
              inputWidth={"55%"}
              required
            />
          </div>
          {/* <div style={{ display: "flex" }}>
                <div style={{ marginTop: "-5px" }}>
                  <Label label={"Fixed Term Contract"} />
                </div>
                <div style={{ marginLeft: "30px", marginTop: "-15px" }}>
                  <Radio.Group>
                    <Group mt="xs">
                      <Radio value="yes" label="Yes" color={"orange"} />
                      <Radio value="no" label="No" color={"orange"} />
                    </Group>
                  </Radio.Group>
                </div>
              </div> */}
          <div
            style={{
              display: "flex",
              // marginTop: "-15px",
              // marginBottom: "-15px",
            }}
          >
            <RadioButtons
              label={"Fixed Contract Something"}
              labelWidth={"36%"}
              display={true}
              display2={true}
              name={"anyname"}
              value={"Y"}
              value2={"N"}
              radioLabel={"Yes"}
              radioLabel2={"No"}
              radioButtonsWidth={"23%"}
            />
          </div>
          <div>
            <InputField
              label={"Employment Number"}
              labelWidth={"35%"}
              inputWidth={"25%"}
            />
          </div>
          <div>
            <InputField
              label={"Department"}
              labelWidth={"35%"}
              inputWidth={"55%"}
            />
          </div>
          <div>
            <InputField
              label={"Salary Day"}
              labelWidth={"35%"}
              inputWidth={"25%"}
            />
          </div>
          <div>
            <InputField
              label={"Fax Number"}
              labelWidth={"35%"}
              inputWidth={"55%"}
            />
          </div>
          <div>
            <InputField
              label={"Landmark"}
              labelWidth={"35%"}
              inputWidth={"55%"}
            />
          </div>
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div></div>
            <div>
              <ButtonComponent
                label={"Save"}
                // buttonBackgroundColor={"black"}
                background={"#6faf5e"}
                buttonHeight={"40px"}
                buttonWidth={"100px"}
                buttonColor={"white"}
              />
            </div>
          </div>
        </div>
      </div>
      <br />
      <CustomTable
        headers={[
          "Employment Category",
          "Customer Number",
          "Address",
          "Position Held",
          "Employed Since",
          "City",
          "Phone",
          "",
        ]}
      />
    </div>
  );
};

export default EmploymentVer;
