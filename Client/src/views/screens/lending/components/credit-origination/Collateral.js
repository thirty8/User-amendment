import React, { useState, useEffect } from "react";
import InputField from "../fields/InputField.jsx";
import ListOfValue from "../fields/ListOfValue.jsx";
import SelectField from "../fields/SelectField";
import ButtonComponent from "../button/ButtonComponent";
import CustomTable from "../data-table/CustomTable";
import ButtonType from "../button/ButtonType";
import Label from "../label/Label";
import TextAreaField from "../fields/TextArea";
import HeaderComponent from "../header/HeaderComponent";
import axios from "axios";
import { API_SERVER } from "../../../../../config/constant";
import swal from "sweetalert";
import Swal from "sweetalert2";
import { HiSave } from "react-icons/hi";

const Collateral = ({ loanAmount, burTab, docTab }) => {
  const [getTheme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );
  const [collateralNo, setCollateralNo] = useState();
  const [collateralNoLov, setCollateralNoLov] = useState();

  const [coverage, setCoverage] = useState("100.00");
  const [amountUtil, setAmountUtil] = useState(loanAmount);

  const headers = {
    "x-api-key":
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "Content-Type": "application/json",
  };

  function formatNumber(amount) {
    const formattedAmount = amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
    });

    const amountWithoutCurrency = formattedAmount.replace("$", "");
    return amountWithoutCurrency;
  }

  var collateralArr = [
    [
      <div>
        <ButtonComponent
          label={"x"}
          // buttonBackgroundColor={"black"}
          background={
            `url(` +
            window.location.origin +
            `/assets/images/headerBackground/` +
            getTheme.theme.headerImage +
            `)`
          }
          buttonHeight={"27px"}
          buttonWidth={"30px"}
          buttonColor={"red"}
        />
      </div>,
      <div>
        <InputField inputWidth={"100%"} disabled />
      </div>,
      <div>
        <InputField inputWidth={"100%"} disabled />
      </div>,
      <div>
        <InputField inputWidth={"100%"} disabled />
      </div>,
      <div>
        <InputField inputWidth={"100%"} disabled />
      </div>,
      <div>
        <InputField inputWidth={"100%"} disabled />
      </div>,
      <div>
        <InputField inputWidth={"100%"} disabled />
      </div>,
      <div>
        <InputField inputWidth={"100%"} disabled />
      </div>,
      <div>
        <ButtonComponent
          label={"..."}
          // buttonBackgroundColor={"black"}
          background={
            `url(` +
            window.location.origin +
            `/assets/images/headerBackground/` +
            getTheme.theme.headerImage +
            `)`
          }
          buttonHeight={"27px"}
          buttonWidth={"30px"}
          buttonColor={"white"}
        />
      </div>,
    ],
  ];
  return (
    <div className="h-[495px] overflow-y-scroll">
      <div style={{ marginBottom: "5px" }}>
        <HeaderComponent title={"Collateral"} height={"35px"} />
      </div>
      <div
        style={{
          display: "flex",
        }}
      >
        <div style={{ flex: 0.5 }}>
          <div>
            <ListOfValue
              label={"Collateral Number"}
              // labelWidth={"25%"}
              inputWidth={"100%"}
              value={collateralNo}
              onChange={(value) => {
                setCollateralNo(value);
              }}
              onClick={() => {
                Swal.fire({
                  title: "Customer has no Collateral",
                  text: "",
                  icon: "warning",
                });
              }}
              // onClick={() => {
              //   Swal.fire({
              //     title: "Customer has no Collateral Set up",
              //     text: "",
              //     icon: "warning",
              //   });
              //   // .then(() => {
              //   //   setCollateralNo("");
              //   // });
              // }}
            />
          </div>
          <div>
            <InputField
              label={"Total Amount"}
              // labelWidth={"25%"}
              inputWidth={"100%"}
              disabled
              // value={coverage}
            />
          </div>

          <div>
            <InputField
              label={"Amount Available to Use"}
              // labelWidth={"25%"}
              inputWidth={"100%"}
              disabled
            />
          </div>
          <div>
            <InputField
              label={"Amount Utilized"}
              // labelWidth={"25%"}
              inputWidth={"100%"}
              disabled
            />
          </div>
        </div>
        <div
          style={{
            flex: 0.5,
          }}
        >
          <div>
            <InputField
              label={"Coverage %"}
              // labelWidth={"35%"}
              inputWidth={"100%"}
              value={coverage}
              textAlign={"right"}
              className={"font-bold"}
              disabled
            />
          </div>
          <div>
            <InputField
              label={"Loan Amount"}
              // labelWidth={"35%"}
              inputWidth={"100%"}
              value={formatNumber(+loanAmount)}
              textAlign={"right"}
              className={"font-bold"}
              disabled
            />
          </div>
          <div>
            <InputField
              label={"Collateral Amount"}
              // labelWidth={"25%"}
              inputWidth={"100%"}
              disabled
            />
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          padding: "10px",
          border: "1px solid #d6d7d9",
          marginTop: "15px",
        }}
      >
        <div style={{ flex: 0.34 }}>
          <InputField
            label={"Loan Percentage Coverage"}
            // labelWidth={"50%"}
            inputWidth={"100%"}
            disabled
            required
            value={coverage}
            className={"font-bold"}
            textAlign={"right"}
          />
        </div>
        <div style={{ flex: 0.33 }}>
          <InputField
            label={"Amount to be Utilized"}
            // labelWidth={"40%"}
            inputWidth={"100%"}
            required
            id={"util"}
            value={amountUtil}
            onChange={(e) => setAmountUtil(e.target.value)}
            textAlign={"right"}
            className={"font-bold"}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                setAmountUtil(formatNumber(parseFloat(e.target.value)));
              }
            }}
          />
        </div>
        <div style={{ flex: 0.33 }}>
          <InputField
            label={"Amount Available"}
            // labelWidth={"40%"}
            inputWidth={"100%"}
            disabled
            className={"font-bold"}
            required
          />
        </div>
      </div>
      <br />
      <div style={{}}>
        <div
          style={{
            flex: 0.6,
            display: "flex",
            gap: "10px",
            justifyContent: "flex-end",
            // alignItems: "center",
          }}
        >
          <div>
            <ButtonComponent
              label={"Add Comments"}
              buttonBackgroundColor={"black"}
              background={"#c4549c"}
              buttonHeight={"33px"}
              buttonWidth={"140px"}
              buttonColor={"white"}
            />
          </div>
          <div>
            <ButtonComponent
              label={"Add Other Comments"}
              buttonBackgroundColor={"black"}
              background={"#c4549c"}
              buttonHeight={"33px"}
              buttonWidth={"180px"}
              buttonColor={"white"}
            />
          </div>
          <div>
            <ButtonComponent
              label={"Save"}
              buttonIcon={<HiSave size={20} />}
              buttonBackgroundColor={"#42ba2c"}
              buttonHeight={"33px"}
              buttonWidth={"100px"}
              buttonColor={"white"}
            />
          </div>
          <div>
            <ButtonComponent
              label={"Clear Record"}
              buttonBackgroundColor={"#ffcfca"}
              background={"black"}
              buttonHeight={"33px"}
              buttonWidth={"130px"}
              buttonColor={"red"}
            />
          </div>
        </div>
      </div>
      <br />
      <div>
        {/* <DataTable
              columns={[
                "Sr. Number",
                "Collateral Number",
                "Collateral Type",
                "Collateral Amount",
                "Loan Amount",
                "Loan % Covered",
                "Amount Utilized",
              ]}
            /> */}
        <CustomTable
          headers={[
            "",
            "Sr No",
            "Collateral Number",
            "Collateral Type",
            "Collateral Amount",
            "Loan Amount",
            "Loan % Covered",
            "Amount Utilized",
            "",
          ]}
          // data={collateralArr}
        />
      </div>
      <br />
      <br />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <ButtonComponent
            label={"Previous"}
            buttonBackgroundColor={"#d4e2ff"}
            buttonColor={"blue"}
            buttonHeight={"40px"}
            buttonWidth={"100px"}
            onClick={docTab}
          />
        </div>
        <div>
          <ButtonComponent
            label={"Next"}
            buttonBackgroundColor={"#0063d1"}
            buttonColor={"white"}
            buttonHeight={"40px"}
            buttonWidth={"100px"}
            onClick={burTab}
          />
        </div>
      </div>
    </div>
  );
};

export default Collateral;
