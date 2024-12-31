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

const GuarantorsApp = () => {
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
        <HeaderComponent title={"Guarantors"} height={"35px"} color={"white"} />
      </div>
      <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
        <div
          style={{
            flex: 0.5,
            padding: "10px",
            borderRadius: "5px",
            border: "1.5px solid #d6d7d9",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
            backgroundColor: "white",
          }}
        >
          <div>
            <SelectField
              label={"Guarantor Type"}
              labelWidth={"35%"}
              inputWidth={"50%"}
              required
            />
          </div>
          <div>
            <InputField
              label={"Guarantor's Account with Bank"}
              labelWidth={"35%"}
              inputWidth={"50%"}
            />
          </div>
          <div>
            <InputField
              label={"Guarantor's Name"}
              labelWidth={"35%"}
              inputWidth={"50%"}
              required
            />
          </div>
          <div>
            <ListOfValue
              label={"Guarantor's ID Type"}
              labelWidth={"35%"}
              inputWidth={"50%"}
            />
          </div>
          <div>
            <InputField
              label={"ID Number"}
              labelWidth={"35%"}
              inputWidth={"25%"}
            />
          </div>
          <div>
            <InputField
              type={"date"}
              label={"ID Issue Date"}
              labelWidth={"35%"}
              inputWidth={"25%"}
            />
          </div>
          <div>
            <InputField
              type={"date"}
              label={"ID Expiry Date"}
              labelWidth={"35%"}
              inputWidth={"25%"}
            />
          </div>
          <div>
            <ListOfValue
              label={"Relation to Borrower"}
              labelWidth={"35%"}
              inputWidth={"50%"}
            />
          </div>
          <div>
            <InputField
              type={"date"}
              label={"Date of Incorperation/Birth"}
              labelWidth={"35%"}
              inputWidth={"25%"}
            />
          </div>
          <div>
            <InputField
              label={"Place of Birth"}
              labelWidth={"35%"}
              inputWidth={"50%"}
            />
          </div>
        </div>
        <div
          style={{
            flex: 0.5,
            padding: "10px",
            borderRadius: "5px",
            border: "1.5px solid #d6d7d9",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
            backgroundColor: "white",
          }}
        >
          <div>
            <InputField
              label={"Residential Address / Business Location"}
              labelWidth={"45%"}
              inputWidth={"50%"}
              required
            />
          </div>
          <div>
            <InputField
              label={"Postal / Digital Address"}
              labelWidth={"45%"}
              inputWidth={"50%"}
              required
            />
          </div>
          <div>
            <InputField
              type={"date"}
              label={"Residence Since"}
              labelWidth={"45%"}
              inputWidth={"25%"}
            />
          </div>
          <div>
            <InputField
              label={"Guarantor's Phone Number"}
              labelWidth={"45%"}
              inputWidth={"50%"}
              required
            />
          </div>
          <div>
            <InputField
              label={"Guarantor's Occupation / Employer"}
              labelWidth={"45%"}
              inputWidth={"50%"}
            />
          </div>
          <div>
            <InputField
              label={"Residential Address / Business Location"}
              labelWidth={"45%"}
              inputWidth={"50%"}
            />
          </div>
          <div>
            <InputField
              type={"date"}
              label={"Employed Since"}
              labelWidth={"45%"}
              inputWidth={"25%"}
            />
          </div>
          <div>
            <InputField
              label={"Guarantor's Position"}
              labelWidth={"45%"}
              inputWidth={"25%"}
            />
          </div>
          <div>
            <InputField
              label={"End of Service Benefit"}
              labelWidth={"45%"}
              inputWidth={"50%"}
            />
          </div>
          <div>
            <InputField
              label={"Guarantor's Net Monthly Income"}
              labelWidth={"45%"}
              inputWidth={"25%"}
            />
          </div>
          <div>
            <InputField label={"Email"} labelWidth={"45%"} inputWidth={"50%"} />
          </div>
        </div>
      </div>
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "30px",
        }}
      >
        <div>
          <ButtonComponent
            label={"Add Comments"}
            // buttonBackgroundColor={"black"}
            background={"#c4549c"}
            buttonHeight={"33px"}
            buttonWidth={"140px"}
            buttonColor={"white"}
          />
        </div>
        <div>
          <ButtonComponent
            label={"Clear"}
            // buttonBackgroundColor={"black"}
            background={"#c4549c"}
            buttonHeight={"33px"}
            buttonWidth={"140px"}
            buttonColor={"white"}
          />
        </div>
        <div>
          <ButtonComponent
            label={"Save"}
            // buttonBackgroundColor={"black"}
            background={"#6faf5e"}
            buttonHeight={"33px"}
            buttonWidth={"140px"}
            buttonColor={"white"}
          />
        </div>
        <div>
          <ButtonComponent
            label={"Send Email"}
            // buttonBackgroundColor={"black"}
            background={"#0580c0"}
            buttonHeight={"33px"}
            buttonWidth={"140px"}
            buttonColor={"white"}
          />
        </div>
        <div>
          <ButtonComponent
            label={"Send SMS"}
            // buttonBackgroundColor={"black"}
            background={"#0580c0"}
            buttonHeight={"33px"}
            buttonWidth={"140px"}
            buttonColor={"white"}
          />
        </div>
      </div>
      <br />
      <div>
        {/* <DataTable
              columns={[
                "Guarantor's ID Applicant Number",
                "Guarantor's Name",
                "Postal Address",
                "Guarantor Contact",
              ]}
            /> */}
        <CustomTable
          headers={[
            "",
            "Guarantors ID Applicant No",
            "Guarantors Name",
            "Postal Address",
            "Guarantor Contact",
            "",
          ]}
        />
      </div>
    </div>
  );
};

export default GuarantorsApp;
