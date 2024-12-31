import React, { useState, useEffect } from "react";
import InputField from "../../../../../components/others/Fields/InputField";
import ListOfValue from "../../../../../components/others/Fields/ListOfValue";
import SelectField from "../fields/SelectField";
import ButtonComponent from "../button/ButtonComponent";
import CustomTable from "../data-table/CustomTable";
import ButtonType from "../button/ButtonType";
import Label from "../label/Label";
import TextAreaField from "../fields/TextArea";
import HeaderComponent from "../header/HeaderComponent";
import axios from "axios";
import { API_SERVER } from "../../../../../config/constant";

const DocumentVer = () => {
  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );

  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  var documentArr = [
    [
      <div>
        <InputField
          inputWidth={"100%"}
          disabled
          value={"1"}
          textAlign={"center"}
        />
      </div>,
      <div>
        <InputField inputWidth={"100%"} disabled value={"PROOF OF AGE"} />
      </div>,
      <div>
        <ListOfValue inputWidth={"100%"} />
      </div>,
      <div style={{ display: "flex", gap: "5px" }}>
        {/* <div style={{ marginTop: "13px" }}>
          <ButtonComponent
            label={"Scan"}
            // buttonBackgroundColor={"black"}
            background={
              `url(` +
              window.location.origin +
              `/assets/images/headerBackground/` +
              getTheme.theme.headerImage +
              `)`
            }
            buttonHeight={"27px"}
            buttonWidth={"60px"}
            buttonColor={"white"}
          />
        </div> */}
        <div>
          <InputField
            inputWidth={"100%"}
            // value={ageProof}
            // onChange={(e) => setAgeProof(e.target.value)}
            textAlign={"center"}
          />
        </div>
        <div style={{ marginTop: "" }}>
          <ButtonComponent
            label={"View"}
            // buttonBackgroundColor={"black"}
            background={
              `url(` +
              window.location.origin +
              `/assets/images/headerBackground/` +
              getTheme.theme.headerImage +
              `)`
            }
            buttonHeight={"27px"}
            buttonWidth={"60px"}
            buttonColor={"white"}
            // onClick={() => {
            //   setSweetAlertConfirmed(true);
            // }}
          />
        </div>
      </div>,
      <div>
        <InputField type={"date"} inputWidth={"100%"} />
      </div>,
      <div>
        <InputField type={"date"} inputWidth={"100%"} />
      </div>,
      <div>
        <InputField inputWidth={"100%"} disabled />
      </div>,
      <div>
        <InputField inputWidth={"100%"} disabled />
      </div>,
      <div>
        <ButtonType label={"Received"} type={"checkbox"} />
      </div>,
    ],
    [
      <div>
        <InputField
          inputWidth={"100%"}
          disabled
          value={"2"}
          textAlign={"center"}
        />
      </div>,
      <div>
        <InputField inputWidth={"100%"} disabled value={"PROOF OF ADDRESS"} />
      </div>,
      <div>
        <ListOfValue inputWidth={"100%"} />
      </div>,
      <div style={{ display: "flex", gap: "5px" }}>
        {/* <div style={{ marginTop: "13px" }}>
          <ButtonComponent
            label={"Scan"}
            // buttonBackgroundColor={"black"}
            background={"#0580c0"}
            buttonHeight={"27px"}
            buttonWidth={"60px"}
            buttonColor={"white"}
          />
        </div> */}
        <div>
          <InputField inputWidth={"100%"} />
        </div>
        <div style={{ marginTop: "" }}>
          <ButtonComponent
            label={"View"}
            // buttonBackgroundColor={"black"}
            background={"#0580c0"}
            buttonHeight={"27px"}
            buttonWidth={"60px"}
            buttonColor={"white"}
          />
        </div>
      </div>,
      <div>
        <InputField type={"date"} inputWidth={"100%"} />
      </div>,
      <div>
        <InputField type={"date"} inputWidth={"100%"} />
      </div>,
      <div>
        <InputField inputWidth={"100%"} disabled />
      </div>,
      <div>
        <InputField inputWidth={"100%"} disabled />
      </div>,
      <div>
        <ButtonType label={"Received"} type={"checkbox"} />
      </div>,
    ],
    [
      <div>
        <InputField
          inputWidth={"100%"}
          disabled
          value={"3"}
          textAlign={"center"}
        />
      </div>,
      <div>
        <InputField
          inputWidth={"100%"}
          disabled
          value={"PROOF OF EMPLOYMENT"}
        />
      </div>,
      <div>
        <ListOfValue inputWidth={"100%"} />
      </div>,
      <div style={{ display: "flex", gap: "5px" }}>
        {/* <div style={{ marginTop: "13px" }}>
          <ButtonComponent
            label={"Scan"}
            // buttonBackgroundColor={"black"}
            background={
              `url(` +
              window.location.origin +
              `/assets/images/headerBackground/` +
              getTheme.theme.headerImage +
              `)`
            }
            buttonHeight={"27px"}
            buttonWidth={"60px"}
            buttonColor={"white"}
          />
        </div> */}
        <div>
          <InputField inputWidth={"100%"} />
        </div>
        <div style={{ marginTop: "" }}>
          <ButtonComponent
            label={"View"}
            // buttonBackgroundColor={"black"}
            background={
              `url(` +
              window.location.origin +
              `/assets/images/headerBackground/` +
              getTheme.theme.headerImage +
              `)`
            }
            buttonHeight={"27px"}
            buttonWidth={"60px"}
            buttonColor={"white"}
          />
        </div>
      </div>,
      <div>
        <InputField type={"date"} inputWidth={"100%"} />
      </div>,
      <div>
        <InputField type={"date"} inputWidth={"100%"} />
      </div>,
      <div>
        <InputField inputWidth={"100%"} disabled />
      </div>,
      <div>
        <InputField inputWidth={"100%"} disabled />
      </div>,
      <div>
        <ButtonType label={"Received"} type={"checkbox"} />
      </div>,
    ],
    [
      <div>
        <InputField
          inputWidth={"100%"}
          disabled
          value={"4"}
          textAlign={"center"}
        />
      </div>,
      <div>
        <InputField inputWidth={"100%"} disabled value={"PROOF OF VALUATION"} />
      </div>,
      <div>
        <ListOfValue inputWidth={"100%"} />
      </div>,
      <div style={{ display: "flex", gap: "5px" }}>
        {/* <div style={{ marginTop: "13px" }}>
          <ButtonComponent
            label={"Scan"}
            // buttonBackgroundColor={"black"}
            background={
              `url(` +
              window.location.origin +
              `/assets/images/headerBackground/` +
              getTheme.theme.headerImage +
              `)`
            }
            buttonHeight={"27px"}
            buttonWidth={"60px"}
            buttonColor={"white"}
          />
        </div> */}
        <div>
          <InputField inputWidth={"100%"} />
        </div>
        <div style={{ marginTop: "" }}>
          <ButtonComponent
            label={"View"}
            // buttonBackgroundColor={"black"}
            background={
              `url(` +
              window.location.origin +
              `/assets/images/headerBackground/` +
              getTheme.theme.headerImage +
              `)`
            }
            buttonHeight={"27px"}
            buttonWidth={"60px"}
            buttonColor={"white"}
          />
        </div>
      </div>,
      <div>
        <InputField type={"date"} inputWidth={"100%"} />
      </div>,
      <div>
        <InputField type={"date"} inputWidth={"100%"} />
      </div>,
      <div>
        <InputField inputWidth={"100%"} disabled />
      </div>,
      <div>
        <InputField inputWidth={"100%"} disabled />
      </div>,
      <div>
        <ButtonType label={"Received"} type={"checkbox"} />
      </div>,
    ],
    [
      <div>
        <InputField
          inputWidth={"100%"}
          disabled
          value={"5"}
          textAlign={"center"}
        />
      </div>,
      <div>
        <InputField inputWidth={"100%"} disabled value={"PROOF OF ADDRESS"} />
      </div>,
      <div>
        <ListOfValue inputWidth={"100%"} />
      </div>,
      <div style={{ display: "flex", gap: "5px" }}>
        {/* <div style={{ marginTop: "13px" }}>
          <ButtonComponent
            label={"Scan"}
            // buttonBackgroundColor={"black"}
            background={
              `url(` +
              window.location.origin +
              `/assets/images/headerBackground/` +
              getTheme.theme.headerImage +
              `)`
            }
            buttonHeight={"27px"}
            buttonWidth={"60px"}
            buttonColor={"white"}
          />
        </div> */}
        <div>
          <InputField inputWidth={"100%"} />
        </div>
        <div style={{ marginTop: "" }}>
          <ButtonComponent
            label={"View"}
            // buttonBackgroundColor={"black"}
            background={
              `url(` +
              window.location.origin +
              `/assets/images/headerBackground/` +
              getTheme.theme.headerImage +
              `)`
            }
            buttonHeight={"27px"}
            buttonWidth={"60px"}
            buttonColor={"white"}
          />
        </div>
      </div>,
      <div>
        <InputField type={"date"} inputWidth={"100%"} />
      </div>,
      <div>
        <InputField type={"date"} inputWidth={"100%"} />
      </div>,
      <div>
        <InputField inputWidth={"100%"} disabled />
      </div>,
      <div>
        <InputField inputWidth={"100%"} disabled />
      </div>,
      <div>
        <ButtonType label={"Received"} type={"checkbox"} />
      </div>,
    ],
    [
      <div>
        <InputField
          inputWidth={"100%"}
          disabled
          value={"6"}
          textAlign={"center"}
        />
      </div>,
      <div>
        <InputField
          inputWidth={"100%"}
          disabled
          value={"PROOF OF PREFERENCE"}
        />
      </div>,
      <div>
        <ListOfValue inputWidth={"100%"} />
      </div>,
      <div style={{ display: "flex", gap: "5px" }}>
        {/* <div style={{ marginTop: "13px" }}>
          <ButtonComponent
            label={"Scan"}
            // buttonBackgroundColor={"black"}
            background={
              `url(` +
              window.location.origin +
              `/assets/images/headerBackground/` +
              getTheme.theme.headerImage +
              `)`
            }
            buttonHeight={"27px"}
            buttonWidth={"60px"}
            buttonColor={"white"}
          />
        </div> */}
        <div>
          <InputField inputWidth={"100%"} />
        </div>
        <div style={{ marginTop: "" }}>
          <ButtonComponent
            label={"View"}
            // buttonBackgroundColor={"black"}
            background={
              `url(` +
              window.location.origin +
              `/assets/images/headerBackground/` +
              getTheme.theme.headerImage +
              `)`
            }
            buttonHeight={"27px"}
            buttonWidth={"60px"}
            buttonColor={"white"}
          />
        </div>
      </div>,
      <div>
        <InputField type={"date"} inputWidth={"100%"} />
      </div>,
      <div>
        <InputField type={"date"} inputWidth={"100%"} />
      </div>,
      <div>
        <InputField inputWidth={"100%"} disabled />
      </div>,
      <div>
        <InputField inputWidth={"100%"} disabled />
      </div>,
      <div>
        <ButtonType label={"Received"} type={"checkbox"} />
      </div>,
    ],
    [
      <div>
        <InputField
          inputWidth={"100%"}
          disabled
          value={"7"}
          textAlign={"center"}
        />
      </div>,
      <div>
        <InputField
          inputWidth={"100%"}
          disabled
          value={"PROOF OF CERTIFICATE"}
        />
      </div>,
      <div>
        <ListOfValue inputWidth={"100%"} />
      </div>,
      <div style={{ display: "flex", gap: "5px" }}>
        {/* <div style={{ marginTop: "13px" }}>
          <ButtonComponent
            label={"Scan"}
            // buttonBackgroundColor={"black"}
            background={
              `url(` +
              window.location.origin +
              `/assets/images/headerBackground/` +
              getTheme.theme.headerImage +
              `)`
            }
            buttonHeight={"27px"}
            buttonWidth={"60px"}
            buttonColor={"white"}
          />
        </div> */}
        <div>
          <InputField inputWidth={"100%"} />
        </div>
        <div style={{ marginTop: "" }}>
          <ButtonComponent
            label={"View"}
            // buttonBackgroundColor={"black"}
            background={
              `url(` +
              window.location.origin +
              `/assets/images/headerBackground/` +
              getTheme.theme.headerImage +
              `)`
            }
            buttonHeight={"27px"}
            buttonWidth={"60px"}
            buttonColor={"white"}
            // onClick={() => {
            //   setSweetAlertConfirmed(true);
            // }}
          />
        </div>
      </div>,
      <div>
        <InputField type={"date"} inputWidth={"100%"} />
      </div>,
      <div>
        <InputField type={"date"} inputWidth={"100%"} />
      </div>,
      <div>
        <InputField inputWidth={"100%"} disabled />
      </div>,
      <div>
        <InputField inputWidth={"100%"} disabled />
      </div>,
      <div>
        <ButtonType label={"Received"} type={"checkbox"} />
      </div>,
    ],
  ];
  return (
    <div>
      <div>
        {/* <DataTable
              columns={[
                "Seq Number",
                "Document Type",
                "Presented Document",
                "Scan Document Number",
                "Scan Date",
                "Document Expiry Date",
                "Mand",
                "Received Date",
              ]}
            /> */}
        <CustomTable
          headers={[
            "Seq Number",
            "Document Type",
            "Presented Document",
            "Scan Document Number",
            "Scan Date",
            "Expiry Date",
            "Mand",
            "Received Date",
            "",
          ]}
          data={documentArr}
        />
      </div>
      <br />
      <div style={{ display: "flex" }}>
        <div style={{ flex: 0.2 }}></div>
        <div
          style={{
            display: "flex",
            flex: 0.6,
            gap: "40px",
            justifyContent: "center",
            alignItems: "center",
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
              label={"Add Other Documents"}
              // buttonBackgroundColor={"black"}
              background={"#c4549c"}
              buttonHeight={"33px"}
              buttonWidth={"180px"}
              buttonColor={"white"}
            />
          </div>
          <div>
            <ButtonComponent
              label={"Account Creation Document Details"}
              // buttonBackgroundColor={"black"}
              background={
                `url(` +
                window.location.origin +
                `/assets/images/headerBackground/` +
                getTheme.theme.headerImage +
                `)`
              }
              buttonHeight={"33px"}
              buttonWidth={"290px"}
              buttonColor={"white"}
            />
          </div>
        </div>
        <div style={{ flex: 0.2 }}></div>
      </div>
    </div>
  );
};

export default DocumentVer;
